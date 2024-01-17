import axiosClient from "./axiosClient";

export const getBill = async (id) => {
    try {
        const res = await axiosClient.get(`bill/${id}`);
        return res;
    } catch (err) {
        return err.response;
    }
}