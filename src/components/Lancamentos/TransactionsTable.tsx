import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { formatCurrency, formatDate } from "@/utils/Formater";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTransaction } from "@/data/context/TransactionContext";
import { useState } from "react";
import Pagination from "../Pagination";

export default function TransactionsTable() {
    const { transactions } = useTransaction()
        const [currentPage, setCurrentPage] = useState(1)
        const pageSize = 10
        const currentTransactions = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        const totalItems = transactions.length
        const totalPages = Math.ceil(totalItems / pageSize)
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = currentPage * pageSize
        const startItem = totalItems === 0 ? 0 : startIndex + 1
        const endItem = Math.min(endIndex, totalItems)
    
        const handleNextPage = () => {
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1)
            }
        }
    
        const handlePreviusPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        }
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-28">Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-center">Categoria</TableHead>
                        <TableHead className="text-center">Departamento</TableHead>
                        <TableHead className="text-center">Tipo</TableHead>
                        <TableHead className="text-center">Valor</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentTransactions.map((item) => {
                         const isIncome = item.type === 'INCOME'
                        return(<TableRow key={item.id}>
                            <TableCell className="text-gray-600">{formatDate(item.date)}</TableCell>
                            <TableCell className="font-medium text-gray-900">{item.description}</TableCell>
                            <TableCell className="text-center">{item.category}</TableCell>
                            <TableCell className="text-center">{item.department}</TableCell>
                            <TableCell className="text-center">
                                <Badge variant="outline" className={isIncome ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50" : "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"}>{isIncome ? "Receita" : "Despesa"}</Badge>
                            </TableCell>
                            <TableCell className={`text-center ${item.type == "EXPENSE" ? "text-red-800" : "text-green-800"}`}>{formatCurrency(item.amount, item.type)}</TableCell>
                            <TableCell className="text-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-800 hover:bg-blue-50 cursor-pointer">
                                    <Pencil size={16}/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                                    <Trash2 size={16}/>
                                </Button>
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>

            </Table>

            {/* Paginacao */}
            <Pagination
                currentPage={currentPage}
                endItem={endItem}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePreviusPage={handlePreviusPage}
            />
        </div>
    )
}