import CreateTransactionDialog from "./CreateTransactionDialog"

export default function TransactionHeader() {
    return (
        <div className="flex justify-between">
            <h1 className="text-gray-800 text-lg font-semibold">Página de lançamentos</h1>
            <CreateTransactionDialog dialogTriggerStyle="cursor-pointer bg-blue-100 border-black" />
        </div>
    )
}