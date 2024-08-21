import axios from "axios";
import KEY from "../utils/TypeKey";
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
    baseURL: 'https://unusia-be.agriciatech.com/api/v1'
});

const token = Cookies.get(KEY.TokenKey)

let bearerToken = "";

if (token) {
    bearerToken = token;
    axiosInstance.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${bearerToken}`;
}

axiosInstance.interceptors.request.use((axiosConfig) => {
    axiosConfig.headers.Accept = "application/json";
    return axiosConfig;
});

export default axiosInstance;