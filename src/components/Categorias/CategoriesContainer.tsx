import { useCategories } from "@/data/context/CategoriesContext"
import ZeroCategoriesCard from "./ZeroCategoriesCard"
import CategoriesHeader from "./CategoriesHeader"
import CategoriesTable from "./CategoriesTable"
import CategoriesFilter from "./CategoriesFilter"

export default function CategoriesContainer() {
    const {realCategories} = useCategories()

    if (realCategories.length === 0) {
        return (
            <ZeroCategoriesCard />
        )
    } else {
        return (
            <div className="w-full space-y-6">
                {/* Header */}
                <CategoriesHeader />

                {/* Filtros */}
                <CategoriesFilter/>

                {/* Tabela de departamentos */}
                <CategoriesTable />
            </div>
        )
    }
}