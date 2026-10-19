import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "../ui/card";
import CreateTransactionDialog from "./CreateTransactionDialog";

export default function ZeroTransactionsCard(){
    return (
        <div className="flex h-full items-center justify-center">
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
        </div>
    )
}