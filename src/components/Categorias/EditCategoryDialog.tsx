import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import Button from "../Button";
import { Field, FieldGroup, FieldLabel, FieldContent } from "../ui/field"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCategoriesForm } from "@/hooks/useCategoriesForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import type { Category } from "@/data/context/CategoriesContext";
import { useTransaction } from "@/data/context/TransactionContext";

interface EditCategoryDialogProps {
    category: Category
    open: boolean;
    handleModalClose: () => void;
}

export default function EditCategoryDialog({ category, open, handleModalClose }: EditCategoryDialogProps) {
    const isEditing = true
    const { realTransactions } = useTransaction()
    const categoryInUse = (!!realTransactions.find((t) => t.category === category.name))

    const {
        errors,
        formFields,
        isSubmitting,
        validateOnBlur,
        handleNameChange,
        handleTypeChange,
        handleEditSubmit
    } = useCategoriesForm(isEditing, categoryInUse, category, handleModalClose)

    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent className="sm:max-w-200">
                <form onSubmit={handleEditSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar categoria</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo. Campos marcados com <span className="text-red-800">*</span> são obrigatórios.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="pt-5 pb-5">
                        <Field>
                            {/* Radio buttons - Primeira linha */}
                            <Label htmlFor="tipo">Tipo:<span className="text-red-800">*</span></Label>
                            {errors.type && <p className="text-xs text-red-500 ml-1">{errors.type}</p>}
                            <RadioGroup
                                className="grid grid-cols-2 gap-10"
                                id="tipo"
                                value={formFields.type}
                                onValueChange={(val) => handleTypeChange(val as "INCOME" | "EXPENSE")}
                                disabled={categoryInUse}
                            >
                                <FieldLabel>
                                    <Field orientation="horizontal" className="cursor-pointer">
                                        <RadioGroupItem value="INCOME" id="income" className={categoryInUse ? "peer sr-only" : ""} />
                                        <FieldContent>
                                            <FieldLabel className="cursor-pointer" htmlFor="income"><CircleArrowUp color="green" />Receita</FieldLabel>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>

                                <FieldLabel>
                                    <Field orientation="horizontal" className="cursor-pointer">
                                        <RadioGroupItem value="EXPENSE" id="expense" className={categoryInUse ? "peer sr-only" : ""} />
                                        <FieldContent>
                                            <FieldLabel className="cursor-pointer" htmlFor="expense"><CircleArrowDown color="red" />Despesa</FieldLabel>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        </Field>

                        <Field>
                            <Label htmlFor="nome">Nome:<span className="text-red-800">*</span></Label>
                            <span className="text-xs text-muted-foreground">{formFields.name.length}/50</span>
                            <Input
                                id="nome"
                                placeholder="Ex.: Vendas"
                                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                                maxLength={50}
                                onBlur={() => validateOnBlur("name")}
                                onChange={(event) => handleNameChange(event.target.value)}
                                value={formFields.name}
                            >
                            </Input>
                            {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
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