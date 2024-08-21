import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponseBase } from "../../data/model/base/ErrorResponse";
import { SuccsessResponse } from "../../data/model/base/SuccsessResponse";
import DataState from "../../data/model/base/StateResponse";

const initialState: Record<string, DataState<any>> = {};

const fetchSlice = createSlice({
    name: 'AgriFetcher',
    initialState,
    reducers: {
        fetchDataRequest(state, action: PayloadAction<string>) {
            const key = action.payload;
            if (!state[key]) {
                state[key] = { data: null, loading: true, error: null };
            } else {
                state[key].loading = true;
                state[key].error = null;
            }
        },
        fetchDataSuccess<T>(state: Record<string, DataState<T>>, action: PayloadAction<{ key: string; response: SuccsessResponse<T> }>) {
            const { key, response } = action.payload;
            if (state[key]) {
                state[key].loading = false;
                state[key].data = response;
            }
        },
        fetchDataFailure(state, action: PayloadAction<{ key: string; error: ErrorResponseBase }>) {
            const { key, error } = action.payload;
            if (state[key]) {
                state[key].loading = false;
                state[key].error = error;
            }
        },
    },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = fetchSlice.actions;

export default fetchSlice.reducer;
