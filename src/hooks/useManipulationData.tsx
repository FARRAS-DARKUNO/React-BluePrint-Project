import { useState } from 'react';
import { HttpMethod, TypeApplication } from '../utils/type';
import { SuccsessResponse } from '../data/model/base/SuccsessResponse';
import { ErrorResponseBase } from '../data/model/base/ErrorResponse';
import axiosInstance from '../config/AxiosConfig';
import KEY from '../utils/TypeKey';
import axios from 'axios';
import LogOutHandler from '../utils/LogOutHandler';
import Cookies from 'js-cookie'

function useManipulationData<T>(url: string, method: HttpMethod, typeformData: TypeApplication): [
    SuccsessResponse<T> | null, boolean, ErrorResponseBase | null,
    (formData: URLSearchParams | FormData | JSON) => Promise<[SuccsessResponse<T> | null, ErrorResponseBase | null]>
] {
    const [data, setData] = useState<SuccsessResponse<T> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponseBase | null>(null);

    const manipulateData = async (formData: URLSearchParams | FormData | JSON): Promise<[SuccsessResponse<T> | null, ErrorResponseBase | null]> => {
        let tempSuccess: SuccsessResponse<T> | null = null;
        let tempError: ErrorResponseBase | null = null;

        try {
            setData(null);
            setError(null);
            setLoading(true);

            const token = typeof window !== "undefined" ? Cookies.get(KEY.TokenKey) : null;
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": typeformData,
            };

            let response;
            switch (method) {
                case "post":
                    response = await axiosInstance.post(url, formData, { headers });
                    break;
                case "put":
                    response = await axiosInstance.put(url, formData, { headers });
                    break;
                case "delete":
                    response = await axiosInstance.delete(url, { headers });
                    break;
                default:
                    throw new Error("Unsupported HTTP method");
            }

            if (response.data.code > 299 || response.data.code < 200) {
                setError(response.data as ErrorResponseBase);
                tempError = response.data as ErrorResponseBase;
            } else {
                setData(response.data);
                tempSuccess = response.data as SuccsessResponse<T>;
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 401) {
                        LogOutHandler()
                    } else {
                        setError(err.response.data as ErrorResponseBase);
                        tempError = err.response.data as ErrorResponseBase;
                    }
                }
            }
        } finally {
            setLoading(false);
        }

        return [tempSuccess, tempError];
    };

    return [data, loading, error, manipulateData];
}

export default useManipulationData;
