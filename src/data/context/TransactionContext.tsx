import React, { createContext, useContext, useMemo, useState} from "react";

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

export interface TransactionFilters {
    type: string;
    category: string;
    department: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    searchDescription: string
}

// Define o que vai receber quem chamar esse contexto
interface TransactionContentType {
    transactions: Transaction[];
    realTransactions: Transaction[];
    filters: TransactionFilters;
    addTransaction: (payload: Transaction) => void
    editTransaction: (payload: Transaction) => void
    deleteTransaction: (payload: Transaction) => void
    filterTransactions: (filters: TransactionFilters) => void
}

const TransactionContext = createContext<TransactionContentType | undefined>(undefined)

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filters, setFilters] = useState<TransactionFilters>({
        type: "",
        category: "",
        department: "",
        startDate: undefined,
        endDate: undefined,
        searchDescription: ""
    }) 
    
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

    function filterTransactions(newFilter: TransactionFilters){
        setFilters((prev) => ({...prev, ...newFilter}))
    }

    const filteredTransactions = useMemo(()=>{
        return transactions.filter((transaction)=>{
            const normalizeSearch = filters.searchDescription.trim().toLowerCase()
            const normalizeDescription = transaction.description.toLowerCase()

            const filteredType = filters.type === "" || transaction.type === filters.type;
            const filteredCategory = filters.category === "" || transaction.category === filters.category;
            const filteredDepartment = filters.department === "" || transaction.department === filters.department;
            const filteredStartDate = filters.startDate === undefined || transaction.date >= filters.startDate;
            const filteredEndDate = filters.endDate === undefined || transaction.date <= filters.endDate;
            const filteredDescription = normalizeSearch === "" || normalizeDescription.includes(normalizeSearch)

            return filteredType && filteredCategory && filteredDepartment && filteredStartDate && filteredEndDate && filteredDescription
        })
    }, [filters, transactions])

    return (
        <TransactionContext.Provider value={{ transactions: filteredTransactions, realTransactions: transactions, addTransaction, editTransaction, deleteTransaction, filterTransactions, filters }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) throw new Error("useTransaction deve ser usado dentro de uma Transaction.Provider");
    return context
}
