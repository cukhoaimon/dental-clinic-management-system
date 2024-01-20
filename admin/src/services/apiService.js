import axiosClient from "./axiosClient";

export const getAllServices = async () => {
  try {
    const res = await axiosClient.get("services");
    return res;
  } catch (err) {
    return err.response;
  }
};
