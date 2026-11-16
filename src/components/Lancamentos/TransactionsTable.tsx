import { formatCurrency, formatDate } from "@/utils/Formater";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTransaction, type Transaction } from "@/data/context/TransactionContext";
import { useState } from "react";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import { usePagination } from "@/hooks/usePagination";
import DataTable, { type ColumnDef } from "../DataTable";

export default function TransactionsTable() {
    const columns: ColumnDef<Transaction>[] = [
        { id: "date", header: "Data", cell: (row) => formatDate(row.date) },
        { id: "description", header: "Descrição", cell: (row) => row.description },
        { id: "category", header: "Categoria", cell: (row) => row.category },
        { id: "department", header: "Departamento", cell: (row) => row.department },
        {
            id: "type",
            header: "Tipo",
            cell: (row) => {
                const isIncome = row.type === "INCOME"
                return (
                    <Badge
                        variant="outline"
                        className={isIncome ?
                            "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                        }
                    >
                        {isIncome ? "Receita" : "Despesa"}
                    </Badge>
                )
            }
        },
        {
            id: "amount",
            header: "Valor",
            cell: (row) => (
                <span
                    className={`text-center ${row.type == "EXPENSE" ?
                        "text-red-800"
                        : "text-green-800"}`}
                >
                    {formatCurrency(row.amount as number, row.type)}
                </span>
            )
        },
        {
            id: "actions",
            header: "Ações",
            cell: (row) => (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-800 hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleModalOpenEditting(row)}
                    >
                        <Pencil size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        onClick={() => handleModalOpenDeletting(row)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </>
            )
        }
    ]

    const { transactions } = useTransaction()
    const {
        currentItems,
        handleNextPage,
        handlePreviousPage,
        currentPage,
        totalPages,
        totalItems,
        startItem,
        endItem
    } = usePagination(transactions)

    const [isOpen, setIsOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
    const [deletingTransaction, setDelettingTransaction] = useState<Transaction | null>(null)

    const handleModalOpenEditting = (item: Transaction) => {
        setEditingTransaction(item)
        setIsOpen(true)
    }

    const handleModalCloseEditting = () => {
        setEditingTransaction(null)
        setIsOpen(false)
    }

    const handleModalOpenDeletting = (item: Transaction) => {
        setDelettingTransaction(item)
        setIsOpen(true)
    }

    const handleModalCloseDeletting = () => {
        setDelettingTransaction(null)
        setIsOpen(false)
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <DataTable
                columns={columns}
                data={currentItems}
                getRowId={(row) => row.id}
                emptyMessage="Nenhum lançamento encontrado"
                label="lançamentos"
                currentPage={currentPage}
                endItem={endItem}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
            />

            {editingTransaction && (
                <EditTransactionDialog
                    transaction={editingTransaction}
                    open={isOpen}
                    handleModalClose={handleModalCloseEditting}
                />
            )}

            {deletingTransaction && (
                <DeleteTransactionDialog
                    transaction={deletingTransaction}
                    open={isOpen}
                    handleModalClose={handleModalCloseDeletting}
                />
            )}
        </div>
    )
}