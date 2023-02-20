import axios from "axios";

<<<<<<< HEAD
export const baseURL = 'http://192.168.1.45:5000/it4788/' 
=======
export const baseURL = 'http://192.168.0.101:5000/it4788/' 
>>>>>>> a0bb97869a0fbbce15e5ce42c3b89a778a225915

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
