import CreateDepartmentsDialog from "./CreateDepartmentDialog";

export default function DepartmentsHeader(){
    return(
        <div className="flex justify-between">
            <h1 className="text-gray-800 text-lg font-semibold">Página de departamentos</h1>
            <CreateDepartmentsDialog dialogTriggerStyle="cursor-pointer bg-blue-100 border-black"/>  
        </div>
    )
}