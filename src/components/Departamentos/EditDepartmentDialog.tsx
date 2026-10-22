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
import { Field, FieldGroup } from "../ui/field"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDepartmentsForm } from "@/hooks/useDepartmentsForm";
import type { Department } from "@/data/context/DepartmentsContext";
import { useEffect } from "react";

interface EditDepartmentDialogProps{
    department: Department
    open: boolean;
    handleModalClose: () => void;    
}

export default function EditDepartmentDialog({department, open, handleModalClose}: EditDepartmentDialogProps) {
    const {
        errors,
        formFields,
        setFormFields,
        isSubmitting,
        validateOnBlur,
        handleNameChange,
        handleEditSubmit
    } = useDepartmentsForm(department, handleModalClose)

    useEffect(()=>{
        if(department){
            setFormFields({
                name: department.name
            })
        }   
    }, [department])
    
    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent className="sm:max-w-200">
                <form onSubmit={handleEditSubmit}>
                    <DialogHeader>
                        <DialogTitle>Novo departamento</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo. Campos marcados com <span className="text-red-800">*</span> são obrigatórios.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="pt-5 pb-5">
                        <Field>
                            <Label htmlFor="nome">Nome:<span className="text-red-800">*</span></Label>
                            <span className="text-xs text-muted-foreground">{formFields.name.length}/50</span>
                            <Input 
                                id="nome"
                                placeholder="Ex.: Recursos Humanos"
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