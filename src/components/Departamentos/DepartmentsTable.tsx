import { useDepartments, type Department } from "@/data/context/DepartmentsContext"
import { TableCell, TableRow } from "../ui/table"
import { formatDate } from "@/utils/Formater"
import Button from "../Button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import DeleteDepartmentsDialog from "./DeleteDepartmentDialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useTransaction } from "@/data/context/TransactionContext"
import { usePagination } from "@/hooks/usePagination"
import DataTable from "../DataTable"

export default function DepartmentsTable() {
    const label = "departamentos"
    const columns = ["Nome", "Criado em", "Ações"]

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
                label={label}
                currentPage={currentPage}
                endItem={endItem}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
            >
                {currentItems.map((department) => {
                    const departmentInUse = (!!realTransactions.find((t) => t.department === department.name))
                    return (
                        <TableRow key={department.id}>
                            <TableCell className="text-center">{department.name}</TableCell>
                            <TableCell className="text-center">{formatDate(department.createdAt)}</TableCell>
                            <TableCell className="text-center">
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <span className="inline-block w-fit">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                                    onClick={() => handleModalOpenDeleting(department, departmentInUse)}
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
                            </TableCell>
                        </TableRow>
                    )
                })}
            </DataTable>

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