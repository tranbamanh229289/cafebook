import axios from "axios";

const axiosClient = (method, url, data, params) => {
<<<<<<< HEAD
    const baseURL = "http://192.168.0.108:5000/it4788/";
=======
    const baseURL = 'http://192.168.0.101:5000/it4788/' 
>>>>>>> b358421 (add secure storage , call api get_user_info)
    return axios({
        baseURL: baseURL,
        method: method,
        url: url,
        data: data,
        params: params,
    });
};

export default axiosClient;
