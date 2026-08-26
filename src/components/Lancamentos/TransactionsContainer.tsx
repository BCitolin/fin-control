import TransactionsTable from "./TransactionsTable";
import TransactionsFilter from "./TransactionsFilter";
import CreateTransactionDialog from "./CreateTransactionDialog";

export default function TransactionsContainer() {
    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between">
                <h1 className="text-gray-800 text-lg font-semibold">Página de lançamentos</h1>
                <CreateTransactionDialog />
            </div>
            
            {/* Barra de filtros */}
            <TransactionsFilter />

            {/* Tabela */}
            <TransactionsTable/>
        </div>
    )
}