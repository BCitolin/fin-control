import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "../ui/card";
import CreateCategoryDialog from "./CreateCategoryDialog";

export default function ZeroCategoriesCard() {
    return (
        <div className="flex h-full items-center justify-center">
            <Card className="mx-auto w-full max-w-120">
                <CardHeader>
                    <CardTitle>
                        Nenhuma categoria encontrada
                    </CardTitle>
                    <CardDescription className="p-5">
                        Você ainda não cadastrou nenhuma categoria. Clique no botão abaixo para adicionar seu primeiro registro.
                    </CardDescription>
                </CardHeader>

                <CardFooter className="justify-center">
                    <CreateCategoryDialog dialogTriggerStyle="cursor-pointer" />
                </CardFooter>
            </Card>
        </div>
    )
}