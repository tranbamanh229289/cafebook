import axiosClient from "../utils/axiosClient";

export const get_user_info = async (user_id, token) => {
  return await axiosClient(
    "post",
    "/user/get_user_info",
    {},
    { token: token, user_id: user_id }
  );
};

export const change_info_after_signup = async (username, token) => {
  return await axiosClient(
    "post",
    "/auth/change_info_after_signup",
    {},
    { token: token, username: username }
  );
}