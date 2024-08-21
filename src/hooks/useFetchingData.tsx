import { useEffect } from "react";
import { SuccsessResponse } from "../data/model/base/SuccsessResponse";
import { ErrorResponseBase } from "../data/model/base/ErrorResponse";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchData } from "../store/fetchingData/actions";
import generateKeyFromUrl from "../utils/generateKeyFromUrl";


export function useFetchingData<T>(
    url: string,
    autoFetch: boolean = true
): [SuccsessResponse<T> | null, boolean, ErrorResponseBase | null] {

    const dispatch: AppDispatch = useDispatch();
    const key = generateKeyFromUrl(url);

    const { data, loading, error } = useSelector((state: RootState) => ({
        data: state.fetchData[key].data ?? null,
        loading: state.fetchData[key]?.loading ?? false,
        error: state.fetchData[key]?.error ?? null,
    }));

    useEffect(() => {
        if (autoFetch) {
            dispatch(fetchData(url));
        }
    }, [dispatch, url]);

    return [data, loading, error];
}
