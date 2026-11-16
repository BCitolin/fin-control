import DataTable, { type ColumnDef } from "../DataTable";
import { usePagination } from "@/hooks/usePagination";
import { useCategories, type Category } from "@/data/context/CategoriesContext";
import { formatDate } from "@/utils/Formater";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Button from "../Button";
import { Badge } from "../ui/badge";
import { Trash2 } from "lucide-react";
import { useTransaction } from "@/data/context/TransactionContext";

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
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <span className="inline-block w-fit">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                                        //onClick={() => handleModalOpenDeleting(department, categoryInUse)}
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

    return (
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
    )
}