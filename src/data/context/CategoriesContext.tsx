import { createContext, useContext, useMemo, useState } from "react";

export interface Category {
    id: string,
    name: string,
    type: "INCOME" | "EXPENSE",
    createdAt: Date
}

export interface CategoriesFilter {
    type: string
}

interface CategoryContentType {
    categories: Category[],
    realCategories: Category[],
    categoriesFilters: CategoriesFilter,
    addCategory: (payload: Category) => void
    editCategory: (payload: Category) => void
    deleteCategory: (payload: Category) => void
    filterCategories: (newcategoriesFilters: CategoriesFilter) => void
}

const CategoryContext = createContext<CategoryContentType | undefined>(undefined)

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([
        {id: crypto.randomUUID(), name: "Vendas", type: "INCOME", createdAt: new Date() },
        {id: crypto.randomUUID(), name: "Consultoria", type: "INCOME", createdAt: new Date() },
        {id: crypto.randomUUID(), name: "Software / Assinaturas", type: "EXPENSE", createdAt: new Date() },
        {id: crypto.randomUUID(), name: "Marketing / Anúncios", type: "EXPENSE", createdAt: new Date() }
    ])

    const [categoriesFilters, setCategoriesFilters] = useState<CategoriesFilter>({
        type: ""
    })

    function addCategory(payload: Category) {
        
    }

    function editCategory(payload: Category){

    }

    function deleteCategory(payload: Category) {
    
    }

    function filterCategories(newFilter: CategoriesFilter){
        setCategoriesFilters((prev) => ({...prev, ...newFilter}))
    }

    const filteredCategories = useMemo(() =>{
        return categories.filter((categorie) => {
            const filteredType = categoriesFilters.type === "" || categorie.type === categoriesFilters.type;
             return filteredType
        })
    }, [categoriesFilters, categories])

    return (
        <CategoryContext.Provider value={{ categories: filteredCategories, realCategories: categories, categoriesFilters, addCategory, editCategory, deleteCategory, filterCategories }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategories = () => {
    const context = useContext(CategoryContext)
    if (!context) throw new Error("useCategories deve ser usado dentro de uma Transaction.Provider");
    return context
}