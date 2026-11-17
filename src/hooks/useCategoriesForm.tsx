import React, { useEffect, useState } from "react"
import { toast } from 'sonner'
import { useCategories, type Category } from "@/data/context/CategoriesContext"
import { useTransaction, type UpdateTransactionsCategoryProps } from "@/data/context/TransactionContext"

interface InitialValuesType {
    name: string
    type: "INCOME" | "EXPENSE"
}

interface CategoriesFormErrors {
    name?: string
    type?: string
}

const initialValues: InitialValuesType = {
    name: "",
    type: "INCOME"
}

const initialErrors: CategoriesFormErrors = {
    name: "",
    type: ""
}

export function useCategoriesForm(isEditing: boolean, categoryInUse?: boolean, category?: Category,  handleModalClose?: () => void) {
    const { addCategory, deleteCategory, editCategory, realCategories } = useCategories()
    const {updateTransactionsCategory} = useTransaction()

    const [isOpen, setIsOpen] = useState(false)
    const [errors, setErrors] = useState<CategoriesFormErrors>({})
    const [formFields, setFormFields] = useState<InitialValuesType>(initialValues)
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleNameChange = ((newName: string) => {
        setFormFields(prevFields => {
            return newName.length <= 50 ? { ...prevFields, name: newName } : { ...prevFields }
        })
    })

    const handleTypeChange = ((newType: "INCOME" | "EXPENSE") => {
        setFormFields((prevFields) => ({...prevFields, type: newType}))
    })

    const handleOpenChange = ((isOpen: boolean) => {
        setIsOpen(isOpen)
        setFormFields(initialValues)
        setErrors(initialErrors)
    })

    function validate() {
        const newErrors: CategoriesFormErrors = {}
        
        const findCategory = realCategories.find((c) => (formFields.name.toLowerCase().trim() === c.name.toLowerCase().trim()))

        if (!formFields.name) {
            newErrors.name = "O nome não pode ficar vazio"
        } else if (formFields.name.length < 2) {
            newErrors.name = "O nome deve ter pelo menos 2 caracteres"
        } else if(findCategory ? findCategory.id !== category?.id : findCategory){
            newErrors.name = "Essa categoria já existe"
            console.log(findCategory)
        }

        if(!formFields.type) {
            newErrors.type = "Escolha um tipo"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function validateOnBlur(fieldName: keyof CategoriesFormErrors) {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }

            if (fieldName === "name") {
                if (!formFields.name) {
                    newErrors.name = "O nome não pode ficar vazio";
                } else if (formFields.name.length < 2) {
                    newErrors.name = "O nome deve ter pelo menos 2 caracteres"
                } else {
                    delete newErrors.name
                }
            }

            return newErrors
        })
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
                name: formFields.name.trim(),
                id: crypto.randomUUID(),
                createdAt: new Date()
            }

            await addCategory(payload)

            toast.success("Categoria criada com sucesso")
            setIsOpen(false)

        } catch (error) {
            toast.error("Falha ao criar categoria")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleEditSubmit(e: React.SubmitEvent){
        e.preventDefault()
        const isValid = validate()

        if(!category || !handleModalClose || !isValid) return

        try {
            setIsSubmitting(true)

            await new Promise((resolve) => setTimeout(resolve, 3000))
            const payload = {
                ...formFields,
                name: formFields.name.trim(),
                type: categoryInUse ? category.type : formFields.type,
                id: category.id,
                createdAt: category.createdAt
            }

            const updateTransactionsPayload: UpdateTransactionsCategoryProps = {
                newName: formFields.name,
                prevName: category.name
            }

            await editCategory(payload)
            await updateTransactionsCategory(updateTransactionsPayload)

            toast.success("Categoria editada com sucesso")
            handleModalClose()

        } catch (error) {
            toast.error("Falha ao editar categoria")
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleDeleteSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        
        if(!category || !handleModalClose) return

        try {
          setIsSubmitting(true)
          await new Promise((resolve) => setTimeout(resolve, 3000))
          const payload = category
          await deleteCategory(payload)
          toast.success("Categoria excluida")
          handleModalClose()
        } catch (error) {
          toast.error("Não foi possível excluir a categoria")
        } finally {
          setIsSubmitting(false)
        }
      }

      useEffect(() => {
        if(category && isEditing){
            setFormFields({
                name: category.name,
                type: category.type
            })
        }
      }, [category, isEditing])

    return ({
        isOpen,
        errors,
        formFields,
        isSubmitting,
        setFormFields,
        validate,
        validateOnBlur,
        handleOpenChange,
        handleNameChange,
        handleTypeChange,
        handleCreateSubmit,
        handleEditSubmit,
        handleDeleteSubmit
    })
}