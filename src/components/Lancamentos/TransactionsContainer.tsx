import TransactionsTable from "./TransactionsTable";
import TransactionsFilter from "./TransactionsFilter";
import CreateTransactionDialog from "./CreateTransactionDialog";
import { useTransaction } from "@/data/context/TransactionContext";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "../ui/card";

export default function TransactionsContainer() {
    const { transactions } = useTransaction()
    if (transactions.length === 0) {
        return (<div className="flex h-full items-center justify-center">
                <Card className="mx-auto w-full max-w-120">
                    <CardHeader>
                        <CardTitle>
                            Nenhum lançamento encontrado
                        </CardTitle>
                        <CardDescription className="p-5">
                            Você ainda não cadastrou nenhuma movimentação financeira. Clique no botão abaixo para adicionar seu primeiro registro.
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="justify-center">
                        <CreateTransactionDialog dialogTriggerStyle="cursor-pointer" />
                    </CardFooter>
                </Card>
        </div>)
    } else {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between">
                    <h1 className="text-gray-800 text-lg font-semibold">Página de lançamentos</h1>
                    <CreateTransactionDialog dialogTriggerStyle="cursor-pointer"/>
                </div>

                {/* Barra de filtros */}
                <TransactionsFilter />

                {/* Tabela */}
                <TransactionsTable />
            </div>
        )
    }

}