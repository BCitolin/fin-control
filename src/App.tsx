import { Layout } from "@/components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Dashboard = () => <div>Tela Dashboard</div>
const Lancamentos = () => <div>Tela Lancamento</div>
const Departamentos = () => <div>Tela Departamento</div>
const Categorias = () => <div>Tela Categorias</div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lancamentos" element={<Lancamentos />} />
          <Route path="departamentos" element={<Departamentos />} />
          <Route path="categorias" element={<Categorias />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
