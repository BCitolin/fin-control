import React, { createContext, useContext, useState } from "react";

// Define o que será aceito
export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    department: string;
    type: "INCOME" | "EXPENSE";
    amount: number;
}

// Define o que vai receber quem chamar esse contexto
interface TransactionContentType {
    transactions: Transaction[];
}

const TransactionContext = createContext<TransactionContentType | undefined>(undefined)

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: "1", date: "2026-07-01", description: "Assinatura da AWS", category: "Software", department: "TI", type: "EXPENSE", amount: 450.00 },
        { id: "2", date: "2026-07-02", description: "Consultoria Devops", category: "Consultoria", department: "TI", type: "INCOME", amount: 3500.00 },
        { id: "3", date: "2026-07-03", description: "Campanha Black Friday", category: "Marketing", department: "Marketing", type: "EXPENSE", amount: 1200.00 },
        { id: "4", date: "2026-07-05", description: "Venda Licença App", category: "Vendas", department: "Comercial", type: "INCOME", amount: 150.00 },
        { id: "5", date: "2026-07-06", description: "Licenças Adobe CC", category: "Software", department: "Marketing", type: "EXPENSE", amount: 275.00 },
        { id: "6", date: "2026-07-07", description: "Venda Curso VIP", category: "Vendas", department: "Comercial", type: "INCOME", amount: 890.00 },
        { id: "7", date: "2026-07-09", description: "Internet Link Dedicado", category: "Software", department: "TI", type: "EXPENSE", amount: 300.00 },
        { id: "8", date: "2026-07-10", description: "Mentoria de Negócios", category: "Consultoria", department: "Comercial", type: "INCOME", amount: 1200.00 },
        { id: "9", date: "2026-07-11", description: "Anúncios Meta Ads", category: "Marketing", department: "Marketing", type: "EXPENSE", amount: 800.00 },
        { id: "10", date: "2026-07-12", description: "Renovação de Domínio", category: "Software", department: "TI", type: "EXPENSE", amount: 45.00 },
        { id: "11", date: "2026-07-13", description: "Venda de Squad Ágil", category: "Vendas", department: "TI", type: "INCOME", amount: 15000.00 },
        { id: "12", date: "2026-07-14", description: "Aluguel Coworking", category: "Infraestrutura", department: "Comercial", type: "EXPENSE", amount: 950.00 },
        { id: "13", date: "2026-07-15", description: "Ferramenta CRM Sales", category: "Software", department: "Comercial", type: "EXPENSE", amount: 400.00 },
        { id: "14", date: "2026-07-16", description: "Suporte Técnico Externo", category: "Consultoria", department: "TI", type: "INCOME", amount: 600.00 },
        { id: "15", date: "2026-07-17", description: "Criação de Identidade Visual", category: "Marketing", department: "Marketing", type: "EXPENSE", amount: 2300.00 }
    ]);

    return (
        <TransactionContext.Provider value={{ transactions }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) throw new Error("useTransaction deve ser usado dentro de uma Transaction.Provider");
    return context
}
