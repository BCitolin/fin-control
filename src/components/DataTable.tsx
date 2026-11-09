import { Table, TableHeader, TableRow, TableHead, TableBody } from "./ui/table";
import Pagination from "./Pagination";

interface DataTableProps {
    columns: string[];
    label: string;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    startItem: number;
    endItem: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void
    children: React.ReactNode
}

export default function DataTable({
    columns, label, currentPage, endItem, startItem, totalItems, totalPages, handleNextPage, handlePreviousPage, children
}: DataTableProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column} className="text-center">{column}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {children}
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