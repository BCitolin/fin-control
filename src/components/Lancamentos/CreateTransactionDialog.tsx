import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { CATEGORIES } from "@/constants/categories"
import { DEPARTMENTS } from "@/constants/departments"
import { Textarea } from "../ui/textarea"
import { useTransactionForm } from "@/hooks/useTransactionForm"

interface DialogTriggerStyleProps{
    dialogTriggerStyle?: string
}

export default function CreateTransactionDialog({dialogTriggerStyle}: DialogTriggerStyleProps) {
    const isEditing = false
    const {
        errors,
        open,
        isSubmitting,
        isCalendarOpen,
        handleAmountChange,
        handleCalendarOpen,
        handleDescription,
        handleTypeChange,
        handleOpenChange,
        validateOnBlur,
        handleCreateSubmit,
        formFields,
        handleDateChange,
        handleCategoryChange,
        handleDepartmentChange
    } = useTransactionForm(isEditing)

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger render={<Button className={dialogTriggerStyle} variant="outline">Novo Lançamento</Button>} />
            <DialogContent className="sm:max-w-200">
                <form onSubmit={handleCreateSubmit}>
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
                                <Field orientation="horizontal" className="cursor-pointer">
                                    <RadioGroupItem value="INCOME" id="income" />
                                    <FieldContent>
                                        <FieldLabel className="cursor-pointer" htmlFor="income"><CircleArrowUp color="green" />Receita</FieldLabel>
                                    </FieldContent>
                                </Field>
                            </FieldLabel>

                            <FieldLabel>
                                <Field orientation="horizontal" className="cursor-pointer">
                                    <RadioGroupItem value="EXPENSE" id="expense" />
                                    <FieldContent>
                                        <FieldLabel className="cursor-pointer" htmlFor="expense"><CircleArrowDown color="red" />Despesa</FieldLabel>
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
                                <Popover open={isCalendarOpen} onOpenChange={handleCalendarOpen}>
                                    <PopoverTrigger
                                        className={errors.data ? "border-red-500 focus-visible:ring-red-500 cursor-pointer" : "cursor-pointer"}
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
                                            onSelect={(date) => {handleDateChange(date as Date)}}
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
                                    onValueChange={(category) => handleCategoryChange(category as string)}
                                >
                                    <SelectTrigger id="categoria" className={errors.category ? "border-red-500 focus-visible:ring-red-500 cursor-pointer" : "cursor-pointer"}>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {CATEGORIES[formFields.type].map((item) => (
                                            <SelectItem key={item.value} value={item.value} className="cursor-pointer">
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
                                    onValueChange={(department) => handleDepartmentChange(department as string)}
                                >
                                    <SelectTrigger className={errors.department ? "border-red-500 focus-visible:ring-red-500 cursor-pointer" : "cursor-pointer"}>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {DEPARTMENTS.map((item) => (
                                            <SelectItem className="cursor-pointer" key={item.value} value={item.value}>
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
                        <DialogClose render={<Button className="cursor-pointer" variant="outline">Cancelar</Button>} />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            loadingMessage="Salvando..."
                            className="cursor-pointer"
                        >
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}