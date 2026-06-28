import { NavLink } from "react-router-dom"
import { LayoutDashboard, ListSortDescending, BanknoteArrowUp, Landmark } from "lucide-react"

export function Sidebar() {

    const getNavStyle = ({ isActive }: { isActive: boolean }) => `p-2 hover:bg-gray-200 rounded duration-300 flex flex-row items-center ${isActive ? 'bg-gray-400/80 text-gray-900 font-medium' : 'text gray-600'}`

    return (
        <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col p-4 flex-shrink-0 items-center">
            {/* //Cabeçalho Sidebar */}
            <a href="/" className="font-bold text-xl mb-6 text-blue-600">FinControl</a>
            {/* //Navegação Sidebar */}
            <nav className="flex flex-col gap-2 mt-10">
                <NavLink to="/dashboard" className={getNavStyle}><LayoutDashboard size={20} color="blue" strokeWidth={2} className="mr-2" />Dashboard</NavLink>
                <NavLink to="/lancamentos" className={getNavStyle}><BanknoteArrowUp size={20} color="blue" strokeWidth={2} className="mr-2" />Lançamentos</NavLink>
                <NavLink to="/departamentos" className={getNavStyle}><Landmark size={20} color="blue" strokeWidth={2} className="mr-2" />Departamentos</NavLink>
                <NavLink to="/categorias" className={getNavStyle}><ListSortDescending size={20} color="blue" strokeWidth={2} className="mr-2" />Categorias</NavLink>
            </nav>
        </aside>
    )
}