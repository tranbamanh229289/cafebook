import axios from "axios";

export const baseURL = 'http://192.168.1.45:5000/it4788/' 

const axiosClient = (method, url, data, params) => {
    return axios({
        baseURL: baseURL,
        method: method,
        url: url,
        data: data,
        params: params,
    });
};

export default axiosClient;
