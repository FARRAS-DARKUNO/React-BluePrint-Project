import { ErrorResponseBase } from '../../data/model/base/ErrorResponse';
import axiosInstance from '../../config/AxiosConfig';
import axios from 'axios';
import LogOutHandler from '../../utils/LogOutHandler';
import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from './reducer';
import { AppDispatch } from '..';
import generateKeyFromUrl from '../../utils/generateKeyFromUrl';



export const fetchData = (url: string) => async (dispatch: AppDispatch) => {

    const key = generateKeyFromUrl(url);

    dispatch(fetchDataRequest(key));

    try {

        const response = await axiosInstance.get(url);

        if (response.data.code > 299 || response.data.code < 200) {
            dispatch(fetchDataFailure({ key, error: response.data as ErrorResponseBase }));  // Pass the key and error
        } else {
            dispatch(fetchDataSuccess({ key, response: response.data }));  // Pass the key and success response
        }
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                err.response.status === 401
                    ? LogOutHandler()
                    : dispatch(fetchDataFailure({ key, error: err.response.data as ErrorResponseBase }));  // Pass the key and error
            }
        }
    }
};
