import TransactionsTable from "./TransactionsTable";
import TransactionsFilter from "./TransactionsFilter";
import TransactionHeader from "./TransactionsHeader";
import ZeroTransactionsCard from "./ZeroTransactionsCard";
import { useTransaction } from "@/data/context/TransactionContext";

export default function TransactionsContainer() {
    const { realTransactions } = useTransaction()
    if (realTransactions.length === 0) {
        return (
            <ZeroTransactionsCard />
        )
    } else {
        return (
            <div className="w-full space-y-6">
                {/* Header */}
                <TransactionHeader />

                {/* Barra de filtros */}
                <TransactionsFilter />

                {/* Tabela */}
                <TransactionsTable />
            </div>
        )
    }

}