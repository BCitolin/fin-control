import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { AlertTriangleIcon } from "lucide-react";
import Button from "@/components/Button"
import {type Department } from "@/data/context/DepartmentsContext";
import { useDepartmentsForm } from "@/hooks/useDepartmentsForm";

interface DeleteDepartmentsDialogProps{
    department: Department
    open: boolean;
    handleModalClose: () => void;    
}

export default function DeleteDepartmentsDialog({department, open, handleModalClose}: DeleteDepartmentsDialogProps) {

    const {
        isSubmitting,
        handleDeleteSubmit,
    } = useDepartmentsForm(department, handleModalClose)

    return (
        <Dialog onOpenChange={handleModalClose} open={open}>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleDeleteSubmit}>
                    <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                        </div>
                        <DialogHeader className="p-2 mb-3">
                            <DialogTitle>Excluir Departamento</DialogTitle>
                            <DialogDescription>
                                Você tem certeza que deseja excluir este departamento? Essa ação não poderá ser desfeita.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <DialogFooter>
                        <DialogClose render={<Button className="cursor-pointer" variant="outline" />}>
                            Cancelar
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="destructive"
                            isLoading={isSubmitting}
                            loadingMessage="Excluindo..."
                            disabled={isSubmitting}
                            className="cursor-pointer"
                        >
                            Excluir
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}