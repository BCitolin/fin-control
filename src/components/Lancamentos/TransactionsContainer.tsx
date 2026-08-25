import { useTransaction } from "@/data/context/TransactionContext";
import TransactionsTable from "./TransactionsTable";
import TransactionsFilter from "./TransactionsFilter";
import { useState } from "react";
import Pagination from "../Pagination";
import CreateTransactionDialog from "./CreateTransactionDialog";

export default function TransactionsContainer() {

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
        <div className="w-full space-y-6">
            <div className="flex justify-between">
                <h1 className="text-gray-800 text-lg font-semibold">Página de lançamentos</h1>
                <CreateTransactionDialog/>
            </div>
            
            {/* Barra de filtros */}
            <TransactionsFilter />

            {/* Tabela */}
            <TransactionsTable transactions={currentTransactions} />

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