type ErrorMessages = {
    [code: string]: string;
};

export const errorMessages: ErrorMessages = {
    404: 'The requested resource was not found.',
    500: 'Internal server error.',
    400: 'Bad request.',
    401: 'Unauthorized access.',
    403: 'Forbidden access.',
    408: 'Request timeout.',
    429: 'Too many requests. Please try again later.',
    'ERR_ACCESS_DENIED': 'Access denied.',
    'ERR_UNKNOWN': 'An unknown error occurred.'
};

export function getErrorMessage(code: string | number): string {
    return errorMessages[code] || errorMessages['ERR_UNKNOWN'];
}