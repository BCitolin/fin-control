import { useDepartments, type Department } from "@/data/context/DepartmentsContext"
import { formatDate } from "@/utils/Formater"
import Button from "../Button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import DeleteDepartmentsDialog from "./DeleteDepartmentDialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useTransaction } from "@/data/context/TransactionContext"
import { usePagination } from "@/hooks/usePagination"
import DataTable, { type ColumnDef } from "../DataTable"

export default function DepartmentsTable() {
    const columns: ColumnDef<Department>[] = [
        { id: "name", header: "Nome", cell: (row) => row.name },
        { id: "creadetAt", header: "Criado em", cell: (row) => formatDate(row.createdAt) },
        {
            id: "actions",
            header: "Ações",
            cell: (row) => {
                const departmentInUse = (!!realTransactions.find((t) => t.department === row.name))
                return (
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <span className="inline-block w-fit">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                        onClick={() => handleModalOpenDeleting(row, departmentInUse)}
                                        disabled={departmentInUse}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </span>
                            }
                        />
                        {departmentInUse &&
                            <TooltipContent side="left">
                                <p>Este departamento possui lançamentos associados e não pode ser excluído.</p>
                            </TooltipContent>
                        }
                    </Tooltip>
                )
            }
        }
    ]

    const { departments } = useDepartments()
    const { realTransactions } = useTransaction()
    const {
        currentItems,
        handleNextPage,
        handlePreviousPage,
        currentPage,
        totalPages,
        totalItems,
        startItem,
        endItem
    } = usePagination(departments)

    const [deletingDepartment, setDeletingDepartment] = useState<Department | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleModalOpenDeleting = (item: Department, departmentInUse: boolean) => {
        if (departmentInUse) return
        setDeletingDepartment(item)
        setIsOpen(true)
    }

    const handleModalCloseDeleting = () => {
        setDeletingDepartment(null)
        setIsOpen(false)
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <DataTable
                columns={columns}
                label="departamentos"
                data={currentItems}
                getRowId={(row) => row.id}
                currentPage={currentPage}
                endItem={endItem}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
            />
            {
                deletingDepartment && (
                    <DeleteDepartmentsDialog
                        department={deletingDepartment}
                        open={isOpen}
                        handleModalClose={handleModalCloseDeleting}
                    />
                )
            }
        </div >
    )
}