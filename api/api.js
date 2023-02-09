import axiosClient from "../utils/axiosClient";

export const get_user_info = async (user_id, token) => {
  return await axiosClient(
    "post",
    "/user/get_user_info",
    {},
    { token: token, user_id: user_id }
  );
};