// Read more on https://api.stackexchange.com/docs/error-handling

export function getErrorMessage(message: string | null, status = 0): string {
    let errorMessage: string;

    switch(message) {
        case 'bad_parameter':
            errorMessage = 'Provided number is incorrect. Maximum number is 100'
            break;
        case 'internal_error':
            errorMessage = 'Internal server error'
            break;
        case 'throttle_violation':
            errorMessage = 'Too much requests from this IP. Try again later'
            break;
        case 'temporarily_unavailable ':
            errorMessage = 'This service is temporarily unavailable'
            break;
        default:
            errorMessage = 'Something went wrong';
            break;
    }

    if(status) {
        errorMessage = `Error ${status} - ${errorMessage}`;
    }
    
    return errorMessage;
}