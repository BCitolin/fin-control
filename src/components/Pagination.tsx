import { Button } from "./ui/button";

interface PaginationProps {
    label: string;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    startItem: number;
    endItem: number;
    onNextPage: () => void;
    onPreviousPage: () => void
}

export default function Pagination({
    label, currentPage, endItem, startItem, totalItems, totalPages, onNextPage, onPreviousPage
}: PaginationProps) {
    return (
        <div className="flex flex-row justify-between bg-white shadow-sm px-2 py-3 border border-gray-200">
            <p className="text-gray-600 text-sm">
                Mostrando<span className="font-semibold text-gray-800 ml-2 mr-1">{startItem}</span> - <span className="font-semibold text-gray-800 ml-1 mr-1">{endItem}</span> de <span className="font-semibold text-gray-900 ml-1 mr-2">{totalItems}</span>{label}
            </p>

            {/* Botoes */}
            <div className="gap-2 flex items-center">
                <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={onPreviousPage}
                    disabled={currentPage === 1 || totalItems === 0}
                >
                    Anterior
                </Button>

                <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={onNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Próximo
                </Button>
            </div>
        </div>
    )
}