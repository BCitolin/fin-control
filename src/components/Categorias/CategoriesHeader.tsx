import CreateCategoryDialog from "./CreateCategoryDialog"

export default function CategoriesHeader(){
    return(
        <div className="flex justify-between">
            <h1 className="text-gray-800 text-lg font-semibold">Página de categorias</h1>
            <CreateCategoryDialog dialogTriggerStyle="cursor-pointer bg-blue-100 border-black"/>  
        </div>
    )
}