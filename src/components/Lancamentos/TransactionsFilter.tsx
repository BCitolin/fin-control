import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function TransactionsFilter() {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center gap-6">
            {/* Filtros de data */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">De:</label>
                <Input type="date" className="w-40" />
            </div>

            <div className="flex flex-row gap-1.5 items-center">
                <label className="text-sm font-medium text-gray-500">Até:</label>
                <Input type="date" className="w-40" />
            </div>

            {/* Select de tipo */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Tipo:</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        <SelectItem value="Receitas">Receitas</SelectItem>
                        <SelectItem value="Despesas">Despesas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Select Categoria */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Categoria:</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Feature -> tem que ser dinâmico: Pode ter varias categorias */}
                        <SelectItem value="Todos">Todos</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Vendas">Vendas</SelectItem>
                        <SelectItem value="Consultoria">Consultoria</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Select Departamento */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Departamento:</label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Feature -> tem que ser dinâmico: Pode ter varias categorias */}
                        <SelectItem value="Todos">Todos</SelectItem>
                        <SelectItem value="TI">TI</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Input Busca */}
            <div className="flex flex-row gap-1.5 flex-1 min-w-[200px]">
                <label className="text-sm text-gray-500 font-medium">Busca:</label>
                <div className="flex flex-row">
                    <input type="text" placeholder="Buscar" className="pl-3 border border-gray-200 text-sm rounded-full" />
                    <Search className="h-5 w-5 text-gray-400 ml-2" />
                </div>
            </div>
        </div>)
}