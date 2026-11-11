import { createContext, useContext, useState } from "react";

export interface Category {
    id: string,
    name: string,
    type: "INCOME" | "EXPENSE",
    createdAt: Date
}

interface CategoryContentType {
    categories: Category[],
    addCategory: (payload: Category) => void
    editCategory: (payload: Category) => void
    deleteCategory: (payload: Category) => void
}

const CategoryContext = createContext<CategoryContentType | undefined>(undefined)

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([])

    function addCategory(payload: Category) {
        
    }

    function editCategory(payload: Category){

    }

    function deleteCategory(payload: Category) {
    
    }

    return (
        <CategoryContext.Provider value={{ categories, addCategory, editCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategories = () => {
    const context = useContext(CategoryContext)
    if (!context) throw new Error("useCategories deve ser usado dentro de uma Transaction.Provider");
    return context
}