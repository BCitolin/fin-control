import DataTable, { type ColumnDef } from "../DataTable";
import { usePagination } from "@/hooks/usePagination";
import { useCategories, type Category } from "@/data/context/CategoriesContext";
import { formatDate } from "@/utils/Formater";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Button from "../Button";
import { Badge } from "../ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { useTransaction } from "@/data/context/TransactionContext";
import { useState } from "react";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

export default function CategoriesTable() {
    const columns: ColumnDef<Category>[] = [
        { id: "name", header: "Nome", cell: (row) => row.name },
        {
            id: "type",
            header: "Tipo",
            cell: (row) => (
                <Badge
                    variant="outline"
                    className={row.type === "INCOME" ?
                        "bg-green-50    text-green-700 border-green-200 hover:bg-green-50"
                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                    }
                >
                    {row.type === "INCOME" ? "Receita" : "Despesa"}
                </Badge>
            )
        },
        { id: "createdAt", header: "Criado em", cell: (row) => formatDate(row.createdAt) },
        {
            id: "actions",
            header: "Ações",
            cell: (row) => {
                const categoryInUse = (!!realTransactions.find((t) => t.category === row.name))
                return (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-800 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleModalOpenEditing(row)}
                        >
                            <Pencil size={16} />
                        </Button>
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <span className="inline-block w-fit">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                            onClick={() => handleModalOpenDeleting(row, categoryInUse)}
                                            disabled={categoryInUse}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </span>
                                }
                            />
                            {categoryInUse &&
                                <TooltipContent side="left">
                                    <p>Esta categoria possui lançamentos associados e não pode ser excluída.</p>
                                </TooltipContent>
                            }
                        </Tooltip>
                    </>

                )
            }
        }
    ]

    const { categories } = useCategories()
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
    } = usePagination(categories)

    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [deletingCategory, setDelettingCategory] = useState<Category | null>(null)
    const [categoryInUse, setCategoryInUse] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    function handleModalOpenEditing(category: Category) {
        setEditingCategory(category)
        setIsOpen(true)
    }

    function handleModalCloseEditting() {
        setEditingCategory(null)
        setIsOpen(false)
    }

    const handleModalOpenDeleting = (item: Category, categoryInUse: boolean) => {
        setDelettingCategory(item)
        setCategoryInUse(categoryInUse)
        setIsOpen(true)
    }

    const handleModalCloseDeleting = () => {
        setDelettingCategory(null)
        setCategoryInUse(false)
        setIsOpen(false)
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <DataTable
                columns={columns}
                label="categorias"
                data={currentItems}
                getRowId={(row) => row.id}
                emptyMessage="Nenhuma categoria encontrada"
                currentPage={currentPage}
                endItem={endItem}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
            />

            {editingCategory && (
                <EditCategoryDialog
                    category={editingCategory}
                    open={isOpen}
                    handleModalClose={handleModalCloseEditting}
                />
            )}

            {deletingCategory && (
                <DeleteCategoryDialog
                    category={deletingCategory}
                    categoryInUse={categoryInUse}
                    handleModalClose={handleModalCloseDeleting}
                    open={isOpen}
                />
            )}
        </div>
    )
}