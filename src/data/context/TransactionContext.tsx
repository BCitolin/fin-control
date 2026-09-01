import React, { createContext, useContext, useState} from "react";

// Define o que será aceito
export interface Transaction {
    id: string;
    date: Date;
    description: string;
    category: string;
    department: string;
    type: "INCOME" | "EXPENSE";
    amount: number | string;
    createdAt: Date;
}

export interface TransactionFormErrors {
    type?: string;
    amount?: string;
    data?: string;
    description?: string;
    category?: string;
    department?: string
}

// Define o que vai receber quem chamar esse contexto
interface TransactionContentType {
    transactions: Transaction[];
    addTransaction: (payload: Transaction) => void
    editTransaction: (payload: Transaction) => void
    deleteTransaction: (payload: Transaction) => void
}

const TransactionContext = createContext<TransactionContentType | undefined>(undefined)

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function addTransaction(payload: Transaction){
        setTransactions((prevTransactions)=> ([...prevTransactions, payload]))
    }

    function editTransaction(payload: Transaction){
        setTransactions((prev) =>
            prev.map((t) => t.id === payload.id ? payload : t)
        )
    }

    function deleteTransaction(payload: Transaction){
        setTransactions((prev) => 
            prev.filter(t => t.id !== payload.id)
        )
    }

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, editTransaction, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) throw new Error("useTransaction deve ser usado dentro de uma Transaction.Provider");
    return context
}
