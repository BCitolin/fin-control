import React, { useState } from "react"
import { useDepartments, type Department } from "@/data/context/DepartmentsContext"
import { toast } from 'sonner'

interface InitialValuesType {
    name: string
}

interface DepartmentFormErrors {
    name?: string
}

const initialValues: InitialValuesType = {
    name: ""
}

const initialErrors: DepartmentFormErrors = {
    name: ""
}

export function useDepartmentsForm(department?: Department, handleModalClose?: () => void) {
    const { addDepartment, editDepartment, departments } = useDepartments()

    const [isOpen, setIsOpen] = useState(false)
    const [errors, setErrors] = useState<DepartmentFormErrors>({})
    const [formFields, setFormFields] = useState<InitialValuesType>(initialValues)
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleNameChange = ((newName: string) => {
        setFormFields(prevFields => {
            return newName.length <= 50 ? { ...prevFields, name: newName } : { ...prevFields }
        })
    })

    const handleOpenChange = ((isOpen: boolean) => {
        setIsOpen(isOpen)
        setFormFields(initialValues)
        setErrors(initialErrors)
    })

    function validate() {
        const newErrors: DepartmentFormErrors = {}
        
        const findDepartment = departments.find((d) => (formFields.name.toLowerCase().trim() === d.name.toLowerCase().trim()))

        if (!formFields.name) {
            newErrors.name = "O nome não pode ficar vazio"
        } else if (formFields.name.length < 2) {
            newErrors.name = "O nome deve ter pelo menos 2 caracteres"
        } else if(findDepartment){
            newErrors.name = "Esse departamento já existe"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function validateOnBlur(fieldName: keyof DepartmentFormErrors) {
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

    async function handleEditSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        const isValid = validate()
        
        if (!isValid || !department || !handleModalClose) return;
        
        try {
            setIsSubmitting(true)

            await new Promise((resolve) => setTimeout(resolve, 3000))
            const payload = {
                ...formFields,
                name: formFields.name.trim(),
                id: department.id,
                createdAt: department.createdAt
            }

            await editDepartment(payload)

            toast.success("Lançamento atualizado com sucesso")
            handleModalClose()

        } catch (error) {
            toast.error("Falha ao atualizar lançamento")
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
                name: formFields.name.trim(),
                id: crypto.randomUUID(),
                createdAt: new Date()
            }

            await addDepartment(payload)

            toast.success("Lançamento criado com sucesso")
            setIsOpen(false)

        } catch (error) {
            toast.error("Falha ao criar lançamento")
        } finally {
            setIsSubmitting(false)
        }
    }

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
        handleCreateSubmit,
        handleEditSubmit,
    })
}