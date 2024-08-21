import { ErrorResponseBase } from "./ErrorResponse";
import { SuccsessResponse } from "./SuccsessResponse";

interface DataState<T> {
    data: SuccsessResponse<T> | null;
    loading: boolean;
    error: ErrorResponseBase | null;
}

export default DataState