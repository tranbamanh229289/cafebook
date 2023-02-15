import axiosClient from "../utils/axiosClient";

export const get_requested_friends = async (token, index, count) => {
  return await axiosClient(
    "post",
    "/friend/get_requested_friends",
    {},
    { token: token, index: index, count: count }
  );
};

export const get_list_suggested_friends = async (token, index, count) => {
  return await axiosClient(
    "post",
    "/friend/get_list_suggested_friends",
    {},
    { token: token, index: index, count: count }
  );
};

export const set_request_friend = async (token, user_id) => {
  return await axiosClient(
    "post",
    "/friend/set_request_friend",
    {},
    { token: token, user_id: user_id }
  );
};

export const set_accept_friend = async (token, user_id, is_accept) => {
  return await axiosClient(
    "post",
    "/friend/set_accept_friend",
    {},
    { token: token, user_id: user_id, is_accept: is_accept }
  );
};

export const get_user_friends = async (token, user_id, index, count) => {
  return await axiosClient(
    "post",
    "/friend/get_user_friends",
    {},
    { token: token, user_id: user_id, index: index, count: count }
  );
};

export const get_list_blocks = async (token, index, count) => {
  return await axiosClient(
    "post",
    "/friend/get_list_blocks",
    {},
    { token: token, index: index, count: count }
  );
};

export const set_block = async (token, user_id, type) => {
  return await axiosClient(
    "post",
    "/friend/set_block",
    {},
    { token: token, user_id: user_id, type: type }
  );
};
