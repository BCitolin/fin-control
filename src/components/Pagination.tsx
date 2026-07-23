import { Button } from "./ui/button";

interface PaginationProps{
    startItem: number;
    endItem: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    handlePreviusPage: () => void;
    handleNextPage: () => void;
}
export default function Pagination({startItem, endItem, totalItems, currentPage, totalPages, handleNextPage, handlePreviusPage}: PaginationProps){
    
    return(
        <div className="flex flex-row justify-between bg-white shadow-sm px-2 py-3 border border-gray-200">
                <p className="text-gray-600 text-sm">
                    Mostrando<span className="font-semibold text-gray-800 ml-2 mr-1">{startItem}</span> - <span className="font-semibold text-gray-800 ml-1 mr-1">{endItem}</span> de <span className="font-semibold text-gray-900 ml-1 mr-2">{totalItems}</span>lançamentos
                </p>

                {/* Botoes */}
                <div className="gap-2 flex items-center">
                    <Button variant="outline" size="sm" onClick={handlePreviusPage} disabled={currentPage === 1 || totalItems === 0}>Anterior</Button>
                    <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Próximo</Button>
                </div>
            </div>
    )
}