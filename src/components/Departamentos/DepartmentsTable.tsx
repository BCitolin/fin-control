import { useDepartments, type Department } from "@/data/context/DepartmentsContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { formatDate } from "@/utils/Formater"
import Button from "../Button"
import { Pencil, Trash2 } from "lucide-react"
import Pagination from "../Pagination"
import { useState } from "react"
import EditDepartmentDialog from "./EditDepartmentDialog"

export default function DepartmentsTable() {
    const { departments } = useDepartments()

    const [currentPage, setCurrentPage] = useState(1)
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const pageSize = 5
    const currentDepartments = departments.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const totalItems = departments.length
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

    const handleModalOpenEditting = (item: Department) => {
        setEditingDepartment(item)
        setIsOpen(true)
    }

    const handleModalCloseEditting = () => {
        setEditingDepartment(null)
        setIsOpen(false)
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left pl-6">Nome</TableHead>
                        <TableHead className="text-left">Criado em</TableHead>
                        <TableHead className="text-right pr-10 ">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentDepartments.map((department) => {
                        return (
                            <TableRow key={department.id}>
                                <TableCell className="text-left pl-6">{department.name}</TableCell>
                                <TableCell className="text-left">{formatDate(department.createdAt)}</TableCell>
                                <TableCell className="text-right pr-6 gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-800 hover:bg-blue-50 cursor-pointer"
                                        onClick={() => handleModalOpenEditting(department)}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                        onClick={() => console.log("DELETE")}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
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

            {editingDepartment && (
                <EditDepartmentDialog
                    department={editingDepartment}
                    open={isOpen}
                    handleModalClose={handleModalCloseEditting}
                />
            )}
        </div>
    )
}