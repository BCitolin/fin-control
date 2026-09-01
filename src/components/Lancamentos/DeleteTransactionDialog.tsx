import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useTransaction, type Transaction } from "@/data/context/TransactionContext";
import { AlertTriangleIcon } from "lucide-react";
import Button from "@/components/Button"
import { useState } from "react";
import { toast } from "sonner";
import React from "react";

//Responsável por definir o contrato dos parâmetros que a função DeleteTransactionDialog vai receber
interface DeleteTransactionDialogProps {
  transaction: Transaction //nome transaction do tipo Transaction da TransactionContext
  open: boolean;
  handleModalClose: () => void; //Define uma função sem retorno e sem parametros
}

export default function DeleteTransactionDialog({ transaction, open, handleModalClose }: DeleteTransactionDialogProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { deleteTransaction } = useTransaction()

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const payload = transaction
      await deleteTransaction(payload)
      toast.success("Lançamento excluido")
      handleModalClose()
    } catch (error) {
      toast.error("Não foi possível excluir o lançamento")
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
              <DialogTitle>Excluir Lançamento</DialogTitle>
              <DialogDescription>
                Você tem certeza que deseja excluir este lançamento? Essa ação não poderá ser desfeita.
              </DialogDescription>
            </DialogHeader>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancelar
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              isLoading={isSubmitting}
              loadingMessage="Excluindo..."
              disabled={isSubmitting}
            >
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}