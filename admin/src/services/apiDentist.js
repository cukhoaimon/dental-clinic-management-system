import axiosClient from "./axiosClient";

export const getPatientRecord = async (phone) => {
    try {
        const res = await axiosClient.get(`dentists/patient-records/${phone}`);
        return res;
    } catch (err) {
        return err.response;
    }
}

export const getAllPatients = async () => {
    try {
        const res = await axiosClient.get("dentists/patients");
        return res;
    } catch (err) {
        return err.response;
    }
}

export const getAllAppointments = async () => {
    try {
        const phone = localStorage.getItem("phone");
        const res = await axiosClient.get(`dentists/appointments/${phone}`);
        return res;
    } catch (err) {
        return err.response;
    }
}