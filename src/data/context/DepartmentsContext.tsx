import { createContext, useContext, useState } from "react";

export interface Department {
    id: string,
    name: string,
    createdAt: Date
}

interface DepartmentContentType {
    departments: Department[],
    addDepartment: (payload: Department) => void
    editDepartment: (payload: Department) => void
    deleteDepartment: (payload: Department) => void
}

const DepartmentContext = createContext<DepartmentContentType | undefined>(undefined)

export function DepartmentsProvider({ children }: { children: React.ReactNode }) {
    const [departments, setDepartments] = useState<Department[]>([
        { id: crypto.randomUUID(), name: "Recursos Humanos", createdAt: new Date() },
        { id: crypto.randomUUID(), name: "TI", createdAt: new Date() },
        { id: crypto.randomUUID(), name: "Marketing", createdAt: new Date() },
        { id: crypto.randomUUID(), name: "Comercial", createdAt: new Date() }
    ])

    function addDepartment(payload: Department) {
        setDepartments((prevTransactions) => ([...prevTransactions, payload]))
    }

    function editDepartment(payload: Department) {
        setDepartments((prev) => 
            prev.map((department) => department.id === payload.id ? payload : department)
        )
    }

    function deleteDepartment(payload: Department) {
        return
    }

    return (
        <DepartmentContext.Provider value={{ departments, addDepartment, editDepartment, deleteDepartment }}>
            {children}
        </DepartmentContext.Provider>
    )
}

export const useDepartments = () => {
    const context = useContext(DepartmentContext)
    if (!context) throw new Error("useDepartments deve ser usado dentro de uma Transaction.Provider");
    return context
}