import axiosClient from "./axiosClient";

export const getBill = async (id) => {
    try {
        const res = await axiosClient.get(`bill/${id}`);
        return res;
    } catch (err) {
        return err.response;
    }
}

export const createBill = async (id) => {
    try {
        const res = await axiosClient.post(`bill/${id}`);
        return res;
    } catch (err) {
        return err.response;
    }
}