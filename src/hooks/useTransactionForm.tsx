import { useEffect, useState } from "react"
import { useTransaction, type TransactionFormErrors } from "@/data/context/TransactionContext"
import { maskCurrency } from "@/utils/Formater"
import { toast } from 'sonner'
import { type Transaction } from "@/data/context/TransactionContext"


interface InitialValuesType {
    date: Date | undefined,
    type: "INCOME" | "EXPENSE",
    category: string | null,
    description: string,
    amount: string,
    department: string | null
}

const initialValues: InitialValuesType = {
    date: undefined,
    type: "INCOME",
    category: "",
    description: "",
    amount: "",
    department: ""
}

const initialErrors: TransactionFormErrors = {
    type: "",
    amount: "",
    data: "",
    department: "",
    description: "",
    category: ""
}

export const useTransactionForm = (isEditing: boolean, transaction?: Transaction, handleModalClose?: () => void) => {
    const { addTransaction, editTransaction } = useTransaction()
    const [errors, setErrors] = useState<TransactionFormErrors>({})
    const [formFields, setFormFields] = useState(initialValues)
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = maskCurrency(e.target.value)
        setFormFields(prevFields => ({ ...prevFields, amount: formattedValue }))
    }

    const handleCalendarOpen = (isOpen: boolean) => {
        setIsCalendarOpen(isOpen)
    }

    const handleDateChange = (newDate: Date) => {
        setFormFields(prevFields => ({ ...prevFields, date: newDate }))
    }

    const handleCategoryChange = (newCategory: string) => {
        setFormFields(prevFields => ({ ...prevFields, category: newCategory }))
    }

    const handleDepartmentChange = (newDepartment: string) => {
        setFormFields(prevFields => ({ ...prevFields, department: newDepartment }))
    }

    const handleTypeChange = (newType: "INCOME" | "EXPENSE") => {
        setFormFields(prevFields => ({ ...prevFields, type: newType, category: "" }))
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        setFormFields(initialValues)
        setErrors(initialErrors)
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

    async function handleEditSubmit(e: React.SubmitEvent) {
        e.preventDefault() //Não deixa a tela recarregar no envio do formulário
        const isValid = validate()

        if (!isValid || !transaction || !handleModalClose) return;

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

    async function handleCreateSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        const isValid = validate()

        if (!isValid) return;

        try {
            setIsSubmitting(true)

            await new Promise((resolve) => setTimeout(resolve, 3000))
            const payload = {
                ...formFields,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                amount: Number(formFields.amount.replace(/\D/g, "")) / 100,
                date: formFields.date as Date,
                category: formFields.category as string,
                department: formFields.department as string
                //casting
            }

            await addTransaction(payload)

            toast.success("Lançamento criado com sucesso")
            setOpen(false)

        } catch (error) {
            toast.error("Falha ao criar lançamento")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (transaction && isEditing) {

            setFormFields({
                date: new Date(transaction.date),
                category: transaction.category,
                amount: maskCurrency((transaction.amount as number * 100).toString()),
                department: transaction.department,
                description: transaction.description,
                type: transaction.type
            })
        }
    }, [transaction, isEditing])

    return {
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
        handleEditSubmit,
        formFields,
        handleDateChange,
        handleCategoryChange,
        handleDepartmentChange
    }
}