import { useTransaction } from "@/data/context/TransactionContext";
import { Button } from "../ui/button";

export default function TransactionPages(){

    const {transactions} = useTransaction()
    
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10
    const currentTransactions = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const totalItems = transactions.length
    const totalPages = Math.ceil(totalItems / pageSize)

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

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = currentPage * pageSize

    const startItem = totalItems === 0 ? 0 : startIndex + 1
    const endItem = Math.min(endIndex, totalItems)
    return(
        <div className="flex flex-row justify-between bg-white shadow-sm px-2 py-3 border border-gray-200">
                <p className="text-gray-600 text-sm">
                    Mostrando<span className="font-semibold text-gray-800 ml-2 mr-1">{startItem}</span> - <span className="font-semibold text-gray-800 ml-1 mr-1">{endItem}</span> de <span className="font-semibold text-gray-900 ml-1">{totalItems}</span>
                </p>

                {/* Botoes */}
                <div className="gap-2 flex items-center">
                    <Button variant="outline" size="sm" onClick={handlePreviusPage} disabled={currentPage === 1 || totalItems === 0}>Anterior</Button>
                    <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Próximo</Button>
                </div>
            </div>

    )
}