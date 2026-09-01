import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import Button from "@/components/Button"
import { Field, FieldContent, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { FieldLabel } from "../ui/field"
import { CircleArrowUp, CircleArrowDown, CalendarDays } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { maskCurrency } from "@/utils/Formater"
import { CATEGORIES } from "@/constants/categories"
import React, { useEffect, useState } from "react"
import { DEPARTMENTS } from "@/constants/departments"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"
import { useTransaction } from "@/data/context/TransactionContext"
import type { Transaction, TransactionFormErrors } from "@/data/context/TransactionContext"


interface EditTransactionDialogProps{
    transaction: Transaction
    open: boolean;
    handleModalClose: () => void;    
}

interface formFields{
    date: Date | undefined;
    category: string;
    type: 'INCOME' | 'EXPENSE';
    amount: string;
    description: string;
    department: string;
}



export default function EditTransactionDialog({transaction, open, handleModalClose}: EditTransactionDialogProps){

    const { editTransaction } = useTransaction()

    const [formFields, setFormFields] = useState<formFields>({
        date: undefined,
        category: "",
        amount: "",
        department: "",
        description: "",
        type: "INCOME"
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [errors, setErrors] = useState<TransactionFormErrors>({})

    useEffect(()=>{
        if(transaction && open){
            setFormFields({
                date: new Date(transaction.date),
                category: transaction.category,
                amount: maskCurrency((transaction.amount as number*100).toString()),
                department: transaction.department,
                description: transaction.description,
                type: transaction.type
            })
        }
    },[transaction, open])
    // array de dependencia

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = maskCurrency(e.target.value)
        setFormFields(prevFields => ({ ...prevFields, amount: formattedValue }))
    }
    
    const handleTypeChange = (newType: "INCOME" | "EXPENSE") => {
        setFormFields(prevFields => ({ ...prevFields, type: newType, category: "" }))
    }
    
    function handleDescription(value: string) {
        setFormFields(prevFields => {
            return value.length <= 200 ? { ...prevFields, description: value } : { ...prevFields }
        })
    }

    
    function validate() {
        const newErrors: TransactionFormErrors = {}

        if (!formFields.type) {
            newErrors.type = "O tipo do lançamento é obrigatório."
        }

        const numericAmount = Number(formFields.amount.replace(/\D/g, "")) / 100
        if (!formFields.amount || numericAmount <= 0) {
            newErrors.amount = "O valor deve ser maior que 0."
        }

        if (!formFields.date) {
            newErrors.data = "A data é obrigatória"
        }

        if (!formFields.description.trim()) {
            newErrors.description = "A descrição é obrigatória"
        } else if (formFields.description.trim().length < 3) {
            newErrors.description = "A descrição deve ter pelo menos 3 caracteres"
        }

        if (!formFields.department) {
            newErrors.department = "O departamento é obrigatório"
        }

        if (!formFields.category) {
            newErrors.category = "A categoria é obrigatória"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    
    function validateOnBlur(fieldName: keyof TransactionFormErrors) {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }

            if (fieldName === "amount") {
                const numericAmount = Number(formFields.amount.replace(/\D/g, "")) / 100;
                if (!formFields.amount || numericAmount <= 0) {
                    newErrors.amount = "O valor deve ser maior que zero.";
                } else {
                    delete newErrors.amount
                }
            }

            if (fieldName === "description") {
                if (!formFields.description.trim()) {
                    newErrors.description = "A descrição é obrigatória.";
                } else if (formFields.description.trim().length < 3) {
                    newErrors.description = "A descrição deve ter no mínimo 3 caracteres.";
                } else {
                    delete newErrors.description; // Remove o erro se estiver válido
                }
            }
            return newErrors
        })
    }
    
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault() //Não deixa a tela recarregar no envio do formulário
        const isValid = validate()

        if (!isValid) return;

        try {
            setIsSubmitting(true)

            await new Promise((resolve) => setTimeout(resolve, 3000))
            const payload = {
                ...formFields,
                id: transaction.id,
                createdAt: transaction.createdAt,
                amount: Number(formFields.amount.replace(/\D/g, "")) / 100,
                date: formFields.date as Date,
                category: formFields.category as string,
                department: formFields.department as string
                //casting
            }

            await editTransaction(payload)

            toast.success("Lançamento atualizado com sucesso")
            handleModalClose()

        } catch (error) {
            toast.error("Falha ao salvar lançamento")
        } finally {
            setIsSubmitting(false)
        }
    }


    return(
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent className="sm:max-w-200">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Dados do lançamento</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo. Campos marcados com <span className="text-red-800">*</span> são obrigatórios.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="pb-5 pt-5">
                        {/* Radio buttons - Primeira linha */}
                        <Label htmlFor="tipo">Tipo:<span className="text-red-800">*</span></Label>
                        <RadioGroup
                            className="grid grid-cols-2 gap-10"
                            id="tipo"
                            value={formFields.type}
                            onValueChange={(val) => handleTypeChange(val as "INCOME" | "EXPENSE")}
                        >
                            <FieldLabel>
                                <Field orientation="horizontal">
                                    <RadioGroupItem value="INCOME" id="income" />
                                    <FieldContent>
                                        <FieldLabel htmlFor="income"><CircleArrowUp color="green" />Receita</FieldLabel>
                                    </FieldContent>
                                </Field>
                            </FieldLabel>

                            <FieldLabel>
                                <Field orientation="horizontal">
                                    <RadioGroupItem value="EXPENSE" id="expense" />
                                    <FieldContent>
                                        <FieldLabel htmlFor="expense"><CircleArrowDown color="red" />Despesa</FieldLabel>
                                    </FieldContent>
                                </Field>
                            </FieldLabel>
                        </RadioGroup>

                        {/* Segunda linha */}
                        <FieldGroup className="grid grid-cols-2">
                            <Field>
                                <Label htmlFor="valor">Valor:<span className="text-red-800">*</span></Label>
                                <Input
                                    id="valor"
                                    name="valor"
                                    className={errors.amount ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    placeholder="R$ 0,00"
                                    value={formFields.amount}
                                    onChange={handleAmountChange}
                                    onBlur={() => validateOnBlur("amount")}
                                />
                                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="data">Data:<span className="text-red-800">*</span></FieldLabel>
                                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                    <PopoverTrigger
                                        className={errors.data ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        render={<Button variant="outline" id="data">
                                            {formFields.date ?
                                                format(formFields.date, "PPP", { locale: ptBR })
                                                : <span className="flex flex-row gap-2"><CalendarDays />Selecione uma data</span>
                                            }
                                        </Button>}
                                    />
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formFields.date}
                                            onSelect={(date) => {
                                                setFormFields(prevFields => ({ ...prevFields, date: date }));
                                                setIsCalendarOpen(false)
                                            }}
                                            defaultMonth={formFields.date}
                                            locale={ptBR}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.data && <p className="text-xs text-red-500 mt-1">{errors.data}</p>}
                            </Field>
                        </FieldGroup>

                        {/* Terceira linha */}
                        {/* Textarea */}
                        <Field>
                            <Label htmlFor="descricao">Descrição:<span className="text-red-800">*</span></Label>
                            <span className="text-xs text-muted-foreground">{formFields.description.length}/200</span>
                            <Textarea
                                id="descricao"
                                className={errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}
                                placeholder="Ex.: Pagamento do fornecedor"
                                maxLength={200}
                                value={formFields.description}
                                onChange={(event) => handleDescription(event.target.value)}
                                onBlur={() => validateOnBlur("description")}
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </Field>

                        {/* Quarta linha */}
                        <FieldGroup className="grid grid-cols-2">
                            {/* Select Categoria  */}
                            <Field>
                                <Label htmlFor="categoria">Categoria:<span className="text-red-800">*</span></Label>
                                <Select
                                    value={formFields.category}
                                    onValueChange={(category) => setFormFields(prevFields => ({ ...prevFields, category: category as string }))}
                                >
                                    <SelectTrigger id="categoria" className={errors.category ? "border-red-500 focus-visible:ring-red-500" : ""}>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {CATEGORIES[formFields.type].map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                            </Field>
                            {/* Select Departamento */}
                            <Field>
                                <Label htmlFor="departamento">Departamento:<span className="text-red-800">*</span></Label>
                                <Select
                                    value={formFields.department}
                                    onValueChange={(department) => setFormFields(prevFields => ({ ...prevFields, department: department as string }))}
                                >
                                    <SelectTrigger className={errors.department ? "border-red-500 focus-visible:ring-red-500" : ""}>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {DEPARTMENTS.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                            </Field>
                        </FieldGroup>
                    </FieldGroup>

                    <DialogFooter className="sm:justify-between">
                        <DialogClose render={<Button variant="outline">Cancelar</Button>} />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            loadingMessage="Salvando..."
                        >
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}