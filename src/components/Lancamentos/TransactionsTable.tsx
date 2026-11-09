import { TableRow, TableCell } from "../ui/table";
import { formatCurrency, formatDate } from "@/utils/Formater";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTransaction, type Transaction } from "@/data/context/TransactionContext";
import { useState } from "react";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import { usePagination } from "@/hooks/usePagination";
import DataTable from "../DataTable";

export default function TransactionsTable() {
    const label = "lançamentos"
    const columns = ["Data", "Descrição", "Categoria", "Departamento", "Tipo", "Valor", "Ações"]

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
                label={label}
                currentPage={currentPage}
                endItem={endItem}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
            >
                {currentItems.length > 0 ? (currentItems.map((item) => {
                        const isIncome = item.type === 'INCOME'
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{formatDate(item.date)}</TableCell>
                                <TableCell className="text-center">{item.description}</TableCell>
                                <TableCell className="text-center">{item.category}</TableCell>
                                <TableCell className="text-center">{item.department}</TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant="outline"
                                        className={isIncome ?
                                            "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                                        }
                                    >
                                        {isIncome ? "Receita" : "Despesa"}
                                    </Badge>
                                </TableCell>
                                <TableCell
                                    className={`text-center ${item.type == "EXPENSE" ?
                                        "text-red-800"
                                        : "text-green-800"}`}
                                >
                                    {formatCurrency(item.amount as number, item.type)}
                                </TableCell>
                                <TableCell className="text-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-800 hover:bg-blue-50 cursor-pointer"
                                        onClick={() => handleModalOpenEditting(item)}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                        onClick={() => handleModalOpenDeletting(item)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>)
                    }))
                        :
                        (
                            <TableRow>
                                <TableCell colSpan={7} className="h-30 text-center text-muted-foreground">
                                    Nenhum lançamento encontrado.
                                </TableCell>
                            </TableRow>
                        )
                    }
            </DataTable>

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