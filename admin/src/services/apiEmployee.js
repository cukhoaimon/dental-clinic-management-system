import axiosClient from "./axiosClient";

export const getAllAppointments = async () => {
    try {
        const res = await axiosClient.get(`employees/appointments`);
        return res;
    } catch (err) {
        return err.response;
    }
}

export const getAllRecords = async () => {
    try {
        const res = await axiosClient.get(`employees/records`);
        return res;
    } catch (err) {
        return err.response;
    }
}