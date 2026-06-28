import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
    const location = useLocation()
    const titles: Record<string, string> = {
        '/': 'Página Inicial',
        '/dashboard': 'Dashboard',
        '/lancamentos': 'Lançamentos',
        '/departamentos': 'Departamentos',
        '/categorias': 'Categorias'
    }
    const currentTitle = titles[location.pathname]

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
            {/* Lado esquerdo header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md- text-gray-500" aria-label="Abrir Menu">
                    <Menu size={22} />
                </Button>
                <h1 className="text-lg font-semibold text-gray-800 transition-all">
                    {currentTitle}
                </h1>
            </div>
            {/* Lado direito header */}
            <div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                    B
                </div>
            </div>
        </header>
    )
}