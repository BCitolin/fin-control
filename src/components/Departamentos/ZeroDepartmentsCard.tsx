import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from "../ui/card";
import CreateDepartmentsDialog from "./CreateDepartmentDialog";

export default function ZeroDepartmentsCard() {
    return (
        <div className="flex h-full items-center justify-center">
            <Card className="mx-auto w-full max-w-120">
                <CardHeader>
                    <CardTitle>
                        Nenhum departamento encontrado
                    </CardTitle>
                    <CardDescription className="p-5">
                        Você ainda não cadastrou nenhum departamento. Clique no botão abaixo para adicionar seu primeiro registro.
                    </CardDescription>
                </CardHeader>

                <CardFooter className="justify-center">
                    <CreateDepartmentsDialog dialogTriggerStyle="cursor-pointer" />
                </CardFooter>
            </Card>
        </div>
    )
}