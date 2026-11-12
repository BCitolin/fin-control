import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCategories } from "@/data/context/CategoriesContext";
import Button from "../Button";

export default function CategoriesFilter() {
    const [type, setType] = useState<"Todos" | "Receitas" | "Despesas" | undefined>("Todos")
    const {
        filterCategories,
        categoriesFilters
    } = useCategories()

    function handleTypeChange(newType: string) {
        //Código necessário para filtrar e atualizar a lista de transações no Context
        const filter = {
            ...categoriesFilters,
            type: newType === "Todos" ? "" : newType
        }
        filterCategories(filter)
        //Código para renderizar lable no select
        setType(() => {
            if (newType === "Todos") return "Todos"
            if (newType === "INCOME") return "Receitas"
            if (newType === "EXPENSE") return "Despesas"
        }
        )
    }

    function resetFilters() {
        const filter = {
            type: ""
        }

        filterCategories(filter)
        setType("Todos")
    }
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center gap-6 justify-between">
            {/* Select de tipo */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Tipo:</label>
                <Select value={type || "Todos"} onValueChange={(value) => handleTypeChange(value as string)}>
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false} >
                        <SelectItem className="cursor-pointer" value="Todos">Todos</SelectItem>
                        <SelectItem className="cursor-pointer" value="INCOME">Receitas</SelectItem>
                        <SelectItem className="cursor-pointer" value="EXPENSE">Despesas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                className="w-auto cursor-pointer bg-white border border-gray-300 text-black hover:bg-gray-100"
                onClick={resetFilters}
            >
                Limpar Filtros
            </Button>
        </div>
    )
}