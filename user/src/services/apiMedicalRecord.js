import axiosClient from "./axiosClient";

// Get all medical records
export const getAllMedicalRecords = async (id) => {
  try {
    const res = await axiosClient.get(`/users/${id}/medical-record`);
    return res;
  } catch (err) {
    return err.response;
  }
};
