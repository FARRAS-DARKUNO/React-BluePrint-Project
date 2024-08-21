export interface UnauthorizedResponse {
    statusCode: number;
    error: string;
    message: string;
    attributes: {
        error: string;
    };
}