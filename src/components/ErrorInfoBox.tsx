import { Alert } from "@mui/material";

export interface ErrorInfoBoxProps {
    message: string
}

function ErrorInfoBox({ message }: ErrorInfoBoxProps) {
    return (
        <Alert sx={{ padding: 2, marginY: 2, }} severity='error'>
            {message}
        </Alert>
    )
}

export default ErrorInfoBox;