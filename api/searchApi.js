import axiosClient from "../utils/axiosClient";

export const search_post = async (token, index, count, keyword) => {
    return await axiosClient(
      "post",
      "/search/search",
      {},
      { token: token, index: index, count: count, keyword: keyword }
    );
  };

  export const get_saved_search = async (token, index, count) => {
    return await axiosClient(
      "post",
      "/search/get_saved_search",
      {},
      { token: token, index: index, count: count }
    );
  };

  export const del_saved_search = async (token, all, search_id) => {
    return await axiosClient(
      "post",
      "/search/del_saved_search",
      {},
      { token: token, all: all, search_id: search_id}
    );
  };