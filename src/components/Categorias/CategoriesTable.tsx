import DataTable from "../DataTable";
import { usePagination } from "@/hooks/usePagination";
import { useCategories } from "@/data/context/CategoriesContext";
import { TableCell, TableRow } from "../ui/table"
import { formatDate } from "@/utils/Formater";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Button from "../Button";
import { Badge } from "../ui/badge";
import { Trash2 } from "lucide-react";
import { useTransaction } from "@/data/context/TransactionContext";

export default function CategoriesTable() {
    const label = "categorias"
    const columns = ["Nome", "Tipo", "Criado em", "Ações"]

    const { categories } = useCategories()
    const {realTransactions} = useTransaction()
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
            label={label}
            currentPage={currentPage}
            endItem={endItem}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            startItem={startItem}
            totalItems={totalItems}
            totalPages={totalPages}
        >
            {currentItems.map((category) => {
                const categoryInUse = (!!realTransactions.find((t) => t.department === category.name))
                return (
                    <TableRow key={category.id}>
                        <TableCell className="text-center">{category.name}</TableCell>
                        <TableCell className="text-center">
                            <Badge
                                variant="outline"
                                className={category.type === "INCOME" ?
                                    "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-50"
                                }
                            >
                                {category.type === "INCOME" ? "Receita" : "Despesa"}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">{formatDate(category.createdAt)}</TableCell>
                        <TableCell className="text-center">
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
                                        <p>Este departamento possui lançamentos associados e não pode ser excluído.</p>
                                    </TooltipContent>
                                }
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )
            })}

        </DataTable>
    )
}