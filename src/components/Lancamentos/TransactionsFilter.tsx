import { Search, CalendarDays } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/constants/categories";
import { DEPARTMENTS } from "@/constants/departments";
import { useTransaction } from "@/data/context/TransactionContext";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Button from "@/components/Button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export default function TransactionsFilter() {
    
    const [tipo, setTipo] = useState<"Todos" | "Receitas" | "Despesas" | undefined>("Todos")
    const [categoria, setCategoria] = useState<string>("Todos")
    const [departamento, setDepartamento] = useState<string>("Todos")
    const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined)
    const [dataFim, setDataFim] = useState<Date | undefined>(undefined)
    const [busca, setBusca] = useState<string>("")
    const [isCalendarInicioOpen, setIsCalendarInicioOpen] = useState(false)
    const [isCalendarFimOpen, setIsCalendarFimOpen] = useState(false)

    const debounceValue = useDebounce(busca, 300)
    const { filterTransactions, filters } = useTransaction()

    function handleTypeChange(novoTipo: string) {
        //Código necessário para filtrar e atualizar a lista de transações no Context
        const filter = {
            ...filters, //Spread
            type: novoTipo === "Todos" ? "" : novoTipo
        }
        filterTransactions(filter)
        //Código para renderizar lable no select
        setTipo(() => {
            if (novoTipo === "Todos") return "Todos"
            if (novoTipo === "INCOME") return "Receitas"
            if (novoTipo === "EXPENSE") return "Despesas"
        }
        )
    }

    function handleCategoryChange(novaCategoria: string) {
        const filter = {
            ...filters,
            category: novaCategoria === "Todos" ? "" : novaCategoria
        }
        filterTransactions(filter)
        setCategoria(novaCategoria)
    }

    function handleDepartmentChange(novoDepartamento: string) {
        const filter = {
            ...filters,
            department: novoDepartamento === "Todos" ? "" : novoDepartamento
        }
        filterTransactions(filter)
        setDepartamento(novoDepartamento)
    }


    function handleDataInicioChange(newDate: Date | undefined) {
        const filter = {
            ...filters,
            deData: newDate
        }
        filterTransactions(filter)
        setIsCalendarInicioOpen(false)
        setDataInicio(newDate)
    }

    function handleDataFimChange(newDate: Date | undefined) {
        const filter = {
            ...filters,
            ateData: newDate
        }
        filterTransactions(filter)
        setIsCalendarFimOpen(false)
        setDataFim(newDate)
    }
    
    function handleBuscaChange(newValue: string) {
        setBusca(newValue)
    }

    function handleCalendarInicioOpen(isOpen: boolean) {
        setIsCalendarInicioOpen(isOpen)
    }

    function handleCalendarFimOpen(isOpen: boolean) {
        setIsCalendarFimOpen(isOpen)
    }

    function resetFilters() {
        const filter = {
            type: "",
            category: "",
            department: "",
            deData: undefined,
            ateData: undefined,
            busca: ""
        }
        filterTransactions(filter)
        setTipo("Todos")
        setCategoria("Todos")
        setDepartamento("Todos")
        setDataInicio(undefined)
        setDataFim(undefined)
        setBusca("")
    }

    useEffect(()=>{
        const filter = {
            ...filters,
            busca: debounceValue
        }
        filterTransactions(filter)
    }, [debounceValue])

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center gap-6">
            {/* Filtros de data */}
            <div className="flex flex-row gap-1">
                <Popover open={isCalendarInicioOpen} onOpenChange={handleCalendarInicioOpen}>
                    <Label htmlFor="deData" className="text-sm font-medium text-gray-500">De:</Label>
                    <PopoverTrigger
                        id="deData"
                        className="cursor-pointer"
                        render={<Button variant="outline" id="data">
                            {filters.deData ?
                                format(filters.deData, "PPP", { locale: ptBR })
                                : <span className="flex flex-row gap-2"><CalendarDays />Selecione uma data</span>
                            }
                        </Button>}
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dataInicio}
                            onSelect={(date) => { handleDataInicioChange(date) }}
                            defaultMonth={dataInicio}
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <Popover open={isCalendarFimOpen} onOpenChange={handleCalendarFimOpen}>
                    <label className="text-sm font-medium text-gray-500">Até:</label>
                    <PopoverTrigger
                        className="cursor-pointer"
                        render={<Button variant="outline" id="data">
                            {filters.ateData ?
                                format(filters.ateData, "PPP", { locale: ptBR })
                                : <span className="flex flex-row gap-2"><CalendarDays />Selecione uma data</span>
                            }
                        </Button>}
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dataFim}
                            onSelect={(date) => { handleDataFimChange(date) }}
                            defaultMonth={dataFim}
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Select de tipo */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Tipo:</label>
                <Select value={tipo || "Todos"} onValueChange={(value) => handleTypeChange(value as string)}>
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

            {/* Select Categoria */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Categoria:</label>
                <Select
                    defaultValue="Todos"
                    value={categoria}
                    onValueChange={(value) => (handleCategoryChange(value as string))}
                >
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent
                        className="w-auto min-w-[var(--radix-select-trigger-width)]"
                        alignItemWithTrigger={false}
                    >
                        <SelectItem className="cursor-pointer" value="Todos">Todos</SelectItem>
                        {CATEGORIES.EXPENSE.map((expense) => (
                            <SelectItem key={expense.value} value={expense.value} className="cursor-pointer">
                                {expense.label}
                            </SelectItem>
                        ))}
                        {CATEGORIES.INCOME.map((income) => (
                            <SelectItem key={income.value} className="cursor-pointer" value={income.value}>
                                {income.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Select Departamento */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Departamento:</label>
                <Select
                    defaultValue="Todos"
                    value={departamento}
                    onValueChange={(value) => handleDepartmentChange(value as string)}
                >
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent className="w-auto min-w-[var(--radix-select-trigger-width)]" alignItemWithTrigger={false}>
                        <SelectItem className="cursor-pointer" value="Todos">Todos</SelectItem>
                        {DEPARTMENTS.map((department) => (
                            <SelectItem key={department.value} className="cursor-pointer" value={department.value}>{department.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Input Busca */}
            <div className="flex flex-row gap-1.5 flex-1 min-w-[200px] items-center">
                <label className="text-sm text-gray-500 font-medium">Busca:</label>
                <div className="flex flex-row items-center">
                    <Input value={busca} onChange={(event) => (handleBuscaChange(event.target.value))} />
                    <Search className="h-5 w-5 text-gray-400 ml-2" />
                </div>
            </div>

            {/* Botao Reset Filters */}
            <Button
                className="w-auto cursor-pointer bg-white border border-gray-300 text-black hover:bg-gray-100"
                onClick={resetFilters}
            >
                Limpar Filtros
            </Button>
        </div>)
}