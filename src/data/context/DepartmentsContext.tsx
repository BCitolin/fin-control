import { createContext, useContext, useState } from "react";

export interface Department{
    id: string,
    label: string,
    value: string,
    createdAt: Date
}

interface DepartmentContentType{
    departments: Department[],
    addDepartment: (payload: Department) => void
    editDepartment: (payload: Department) => void
    deleteDepartment: (payload: Department) => void
}

const DepartmentContext = createContext<DepartmentContentType | undefined>(undefined)

export function DepartmentsProvider({children}: {children: React.ReactNode}){
    const [departments, setDepartments] = useState<Department[]>([
        {id: crypto.randomUUID(), label: "Recursos Humanos", value: "Recursos Humanos", createdAt: new Date() },
        {id: crypto.randomUUID(), label: "TI", value: "TI", createdAt: new Date() },
        {id: crypto.randomUUID(), label: "Marketing", value: "Marketing", createdAt: new Date()},
        {id: crypto.randomUUID(), label: "Comercial", value: "Comercial", createdAt: new Date()}
    ])

    function addDepartment(payload: Department){
        return
    }

    function editDepartment(payload: Department){
        return
    }

    function deleteDepartment(payload: Department){
        return
    }

    return (
        <DepartmentContext.Provider value={{departments, addDepartment, editDepartment, deleteDepartment}}>
            {children}
        </DepartmentContext.Provider>
    )
}

export const useDepartments = () => {
    const context = useContext(DepartmentContext)
    if (!context) throw new Error("useDepartments deve ser usado dentro de uma Transaction.Provider");
    return context
}