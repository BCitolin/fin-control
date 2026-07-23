import Layout from "@/components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Index"
import Lancamentos from "./pages/Lancamentos"

const Departamentos = () => <div>Tela Departamento</div>
const Categorias = () => <div>Tela Categorias</div>
const Dashboard2 = () => <div>Dashboard2</div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="/dashboard/dashboard2" element={<Dashboard2/>}/>
          <Route path="lancamentos" element={<Lancamentos />} />
          <Route path="departamentos" element={<Departamentos />} />
          <Route path="categorias" element={<Categorias />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
