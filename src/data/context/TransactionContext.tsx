import React, { createContext, useContext, useState} from "react";

// Define o que será aceito
export interface Transaction {
    id: string;
    date: Date;
    description: string;
    category: string;
    department: string;
    type: "INCOME" | "EXPENSE";
    amount: number;
    createdAt: Date;
}

// Define o que vai receber quem chamar esse contexto
interface TransactionContentType {
    transactions: Transaction[];
    addTransaction: (payload: Transaction) => void
}

const TransactionContext = createContext<TransactionContentType | undefined>(undefined)

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function addTransaction(payload: Transaction){
        setTransactions((prevTransactions)=> ([...prevTransactions, payload]))
    }

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) throw new Error("useTransaction deve ser usado dentro de uma Transaction.Provider");
    return context
}
