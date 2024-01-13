import axiosClient from "./axiosClient";

export const login = async (data) => {
  try {
    const res = await axiosClient.post("admin/login", data);
    return res;
  } catch (err) {
    return err.response;
  }
}