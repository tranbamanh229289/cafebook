import axios from "axios";

const axiosClient = (method, url, data, params) => {
    const baseURL = 'http://192.168.0.101:5000/it4788/' 
    return axios({
        baseURL: baseURL,
        method: method,
        url: url,
        data: data,
        params: params,
    });
};

export default axiosClient;
