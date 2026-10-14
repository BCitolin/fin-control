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

    const [type, setType] = useState<"Todos" | "Receitas" | "Despesas" | undefined>("Todos")
    const [category, setCategory] = useState<string>("Todos")
    const [department, setDepartment] = useState<string>("Todos")
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [searchDescription, setSearchDescription] = useState<string>("")
    const [isCalendarStartDateOpen, setIsCalendarStartDateOpen] = useState(false)
    const [isCalendarEndDateOpen, setIsCalendarEndDateOpen] = useState(false)

    const debounceValue = useDebounce(searchDescription, 300)
    const { filterTransactions, filters } = useTransaction()

    function handleTypeChange(newType: string) {
        //Código necessário para filtrar e atualizar a lista de transações no Context
        const filter = {
            ...filters, //Spread
            type: newType === "Todos" ? "" : newType
        }
        filterTransactions(filter)
        //Código para renderizar lable no select
        setType(() => {
            if (newType === "Todos") return "Todos"
            if (newType === "INCOME") return "Receitas"
            if (newType === "EXPENSE") return "Despesas"
        }
        )
    }

    function handleCategoryChange(newCategory: string) {
        const filter = {
            ...filters,
            category: newCategory === "Todos" ? "" : newCategory
        }
        filterTransactions(filter)
        setCategory(newCategory)
    }

    function handleDepartmentChange(newDepartment: string) {
        const filter = {
            ...filters,
            department: newDepartment === "Todos" ? "" : newDepartment
        }
        filterTransactions(filter)
        setDepartment(newDepartment)
    }

    function handleStartDateChange(newDate: Date | undefined) {
        const filter = {
            ...filters,
            startDate: newDate
        }
        filterTransactions(filter)
        setIsCalendarStartDateOpen(false)
        setStartDate(newDate)
    }

    function handleEndDateChange(newDate: Date | undefined) {
        const filter = {
            ...filters,
            endDate: newDate
        }
        filterTransactions(filter)
        setIsCalendarEndDateOpen(false)
        setEndDate(newDate)
    }

    function handleSearchDescriptionChange(newValue: string) {
        setSearchDescription(newValue)
    }

    function handleCalendarStartDateOpen(isOpen: boolean) {
        setIsCalendarStartDateOpen(isOpen)
    }

    function handleCalendarEndDateOpen(isOpen: boolean) {
        setIsCalendarEndDateOpen(isOpen)
    }

    function resetFilters() {
        const filter = {
            type: "",
            category: "",
            department: "",
            startDate: undefined,
            endDate: undefined,
            searchDescription: ""
        }
        filterTransactions(filter)
        setType("Todos")
        setCategory("Todos")
        setDepartment("Todos")
        setStartDate(undefined)
        setEndDate(undefined)
        setSearchDescription("")
    }

    useEffect(() => {
        const filter = {
            ...filters,
            searchDescription: debounceValue
        }
        filterTransactions(filter)
    }, [debounceValue])

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center gap-6">
            {/* Filtros de data */}
            <div className="flex flex-row gap-1">
                <Popover open={isCalendarStartDateOpen} onOpenChange={handleCalendarStartDateOpen}>
                    <Label htmlFor="deData" className="text-sm font-medium text-gray-500">De:</Label>
                    <PopoverTrigger
                        id="deData"
                        className="cursor-pointer"
                        render={<Button variant="outline" id="data">
                            {filters.startDate ?
                                format(filters.startDate, "PPP", { locale: ptBR })
                                : <span className="flex flex-row gap-2"><CalendarDays />Selecione uma data</span>
                            }
                        </Button>}
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => { handleStartDateChange(date) }}
                            defaultMonth={startDate}
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-row gap-1 items-center">
                <Popover open={isCalendarEndDateOpen} onOpenChange={handleCalendarEndDateOpen}>
                    <label className="text-sm font-medium text-gray-500">Até:</label>
                    <PopoverTrigger
                        className="cursor-pointer"
                        render={<Button variant="outline" id="data">
                            {filters.endDate ?
                                format(filters.endDate, "PPP", { locale: ptBR })
                                : <span className="flex flex-row gap-2"><CalendarDays />Selecione uma data</span>
                            }
                        </Button>}
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date) => { handleEndDateChange(date) }}
                            defaultMonth={endDate}
                            locale={ptBR}
                        />
                    </PopoverContent>
                </Popover>
            </div>

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

            {/* Select Categoria */}
            <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-gray-500">Categoria:</label>
                <Select
                    defaultValue="Todos"
                    value={category}
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
                    value={department}
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
                    <Input value={searchDescription} onChange={(event) => (handleSearchDescriptionChange(event.target.value))} />
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