import Header from "@/components/Header"
import { Button } from "./components/ui/button"

function App() {
  return (
    <div className="p-8">
      <Header />
      <Button variant={"secondary"}>Click</Button>
      <Button variant={"destructive"}>Click</Button>
      <h1 className="text-3x1 font-bold text-blue-600">FinControl</h1>
    </div>
  )
}

export default App
