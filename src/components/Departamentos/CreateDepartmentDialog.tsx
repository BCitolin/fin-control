import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "../Button";
import { Field, FieldGroup } from "../ui/field"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface DialogTriggerStyleProps {
    dialogTriggerStyle?: string
}

export default function CreateDepartmentsDialog({ dialogTriggerStyle }: DialogTriggerStyleProps) {
    return (
        <Dialog>
            <DialogTrigger render={<Button className={dialogTriggerStyle} variant="outline" />}>
                Adicionar Departamento
            </DialogTrigger>

            <DialogContent className="sm:max-w-200">
                <form>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label></Label>
                            <Input></Input>
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose render={<Button className="cursor-pointer" variant="outline">Cancelar</Button>} />
                        <Button
                            type="submit"
                            disabled={false}
                            isLoading={false}
                            loadingMessage="Salvando..."
                            className="cursor-pointer"
                        >
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}