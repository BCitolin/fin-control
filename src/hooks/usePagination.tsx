import { useDepartments } from "@/data/context/DepartmentsContext"
import { useTransaction } from "@/data/context/TransactionContext"
import { useState, useEffect, useMemo } from "react"

export function usePagination<T>(items: T[]) {
    const { filters, deleteTransaction } = useTransaction()
    const { deleteDepartment } = useDepartments()

    const [currentPage, setCurrentPage] = useState(1)
    
    const pageSize = 2
    const totalItems = items.length
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

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const currentItems = useMemo(() => {
        return items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [items, currentPage]); // Re-calcula sempre que a página ou a lista mudaremF

    useEffect(() => {
        setCurrentPage(1)
    }, [filters, deleteTransaction, deleteDepartment])

    return {
        currentPage,
        currentItems,
        pageSize,
        totalPages,
        totalItems,
        startItem,
        endItem,
        items,
        handleNextPage,
        handlePreviousPage,
    }
}