export interface SuccsessResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}