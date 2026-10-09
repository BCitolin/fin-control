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

export interface TransactionFormErrors {
    type?: string;
    amount?: string;
    data?: string;
    description?: string;
    category?: string;
    department?: string
}

export interface TransactionFilters {
    type: string;
    category: string;
    department: string;
    deData: Date | undefined;
    ateData: Date | undefined;
    busca: string
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
        deData: undefined,
        ateData: undefined,
        busca: ""
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
            const buscaNormalizada = filters.busca.trim().toLowerCase()
            const descricaoNormalizada = transaction.description.toLowerCase()

            const filtrouTipo = filters.type === "" || transaction.type === filters.type;
            const filtrouCategoria = filters.category === "" || transaction.category === filters.category;
            const filtrouDepartamento = filters.department === "" || transaction.department === filters.department;
            const filtrouDeData = filters.deData === undefined || transaction.date >= filters.deData;
            const filtrouAteData = filters.ateData === undefined || transaction.date <= filters.ateData;
            const filtrouDescricao = buscaNormalizada === "" || descricaoNormalizada.includes(buscaNormalizada)

            return filtrouTipo && filtrouCategoria && filtrouDepartamento && filtrouDeData && filtrouAteData && filtrouDescricao
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
