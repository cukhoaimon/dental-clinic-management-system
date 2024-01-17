import axiosClient from "./axiosClient";

export const getAllMedicines = async () => {
    try {
        const res = await axiosClient.get("medicines");
        return res;
    } catch (err) {
        return err.response;
    }
}

export const editMedicine = async (id, data) => {
    try {
        const res = await axiosClient.patch(`medicines/${id}`, data);
        return res;
    } catch (err) {
        return err.response;
    }
}