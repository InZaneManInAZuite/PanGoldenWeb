export const isSuccess = (response: Response): boolean => {
    return response.status >= 200 && response.status < 300;
}

export const isFailure = (response: Response): boolean => {
    return response.status < 200 || response.status >= 300;
}

export const isServerError = (response: Response): boolean => {
    return response.status >= 500 && response.status < 600;
}

export const isClientError = (response: Response): boolean => {
    return response.status >= 400 && response.status < 500;
}

