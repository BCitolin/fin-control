import { Button as ButtonUI } from "./ui/button"
import { Spinner } from "./ui/spinner"

interface BtnProps extends React.ComponentProps<typeof ButtonUI>{
    isLoading?: boolean;
    loadingMessage?: string;
    children?: React.ReactNode
}

export default function Button({isLoading, loadingMessage, children, ...props}: BtnProps){
    return (
        <>
            {isLoading ? (
                    <ButtonUI {...props}>
                        {loadingMessage}
                        <Spinner/>    
                    </ButtonUI>
                ) : (
                <ButtonUI {...props}>
                    {children}
                </ButtonUI>
            )}
        </>
    )
}