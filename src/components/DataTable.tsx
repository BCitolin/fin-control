import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import Pagination from "./Pagination";

export type ColumnDef<T> = {
    id: string
    header: string
    cell: (row: T) => React.ReactNode
}
interface DataTableProps<T> { //<T> tipo generico
    columns: ColumnDef<T>[]
    data: T[]
    getRowId: (row: T) => string
    emptyMessage?: string
    label: string
    currentPage: number
    totalPages: number
    totalItems: number
    startItem: number
    endItem: number
    handleNextPage: () => void
    handlePreviousPage: () => void
}

export default function DataTable<T>({
    columns,
    data,
    label,
    currentPage,
    endItem,
    startItem,
    totalItems,
    totalPages,
    emptyMessage,
    handleNextPage,
    handlePreviousPage,
    getRowId
}: DataTableProps<T>) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={column.id} className={index === 0 ? "text-left" : "text-center"}>{column.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((row) => (
                            <TableRow key={getRowId(row)}>
                                {columns.map((column, index) => (
                                    <TableCell key={column.id} className={index === 0 ? "text-left" : "text-center"}>
                                        {column.cell(row)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="h-30 text-center text-muted-foreground" colSpan={columns.length}>
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Paginacao */}
            <Pagination
                label={label}
                currentPage={currentPage}
                endItem={endItem}
                startItem={startItem}
                totalItems={totalItems}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
            />
        </div>
    )
}