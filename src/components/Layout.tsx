import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"

export function Layout() {

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
            {/* Sidebar Layout */}
            <Sidebar />

            {/* Conteúdo */}
            <div className="flex flex-col flex-1 h-full">
                {/* Header */}
                <Header />
                {/* Conteúdo Principal */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}