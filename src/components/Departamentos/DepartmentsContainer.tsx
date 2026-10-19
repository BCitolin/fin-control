import { useDepartments } from "@/data/context/DepartmentsContext";
import DepartmentsHeader from "./DepartmentsHeader";
import DepartmentsTable from "./DepartmentsTable";
import ZeroDepartmentsCard from "./ZeroDepartmentsCard";

export default function DepartmentsContainer() {
    const { departments } = useDepartments()
    if (departments.length === 0) {
        return (
            <ZeroDepartmentsCard />
        )
    } else {
        return (
            <div className="w-full space-y-6">
                {/* Header */}
                <DepartmentsHeader />

                {/* Tabela de departamentos */}
                <DepartmentsTable />
            </div>
        )
    }
}