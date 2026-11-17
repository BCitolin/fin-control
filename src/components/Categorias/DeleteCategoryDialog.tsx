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
import { useState } from "react";
import { toast } from "sonner";
import React from "react";
import { useCategories, type Category } from "@/data/context/CategoriesContext";

interface DeleteCategoryDialogProps {
    category: Category
    categoryInUse: boolean
    open: boolean;
    handleModalClose: () => void;
}

export default function DeleteCategoryDialog({ category, open, categoryInUse, handleModalClose }: DeleteCategoryDialogProps) {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { deleteCategory } = useCategories()

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        

        try {
            setIsSubmitting(true)
            await new Promise((resolve) => setTimeout(resolve, 3000))
            if (categoryInUse) throw new Error
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
    return (
        <Dialog onOpenChange={handleModalClose} open={open}>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                        </div>
                        <DialogHeader className="p-2 mb-3">
                            <DialogTitle>Excluir Categoria</DialogTitle>
                            <DialogDescription>
                                Você tem certeza que deseja excluir esta categoria? Essa ação não poderá ser desfeita.
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