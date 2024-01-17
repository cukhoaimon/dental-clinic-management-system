const pool = require("../utils/db");

module.exports = {
  prescribeMedication: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool
        .request()
        .input("MaThuoc", req.body.ma_thuoc)
        .input("MaLK", req.body.ma_lk)
        .input("SoLuong", req.body.so_luong)
        .execute(`sp_KeDonThuoc`);

      res.status(200).json({
        status: "success",
        message: result.output.message,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getDentists: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(
        `SELECT * FROM NGUOI_DUNG WHERE VAI_TRO = 'NHA_SI'`
      );

      res.status(200).json({
        status: "success",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getAllPatient: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(
        `SELECT DISTINCT ND.* FROM NGUOI_DUNG ND JOIN LAN_KHAM LK ON ND.SDT = LK.BENH_NHAN WHERE ND.VAI_TRO = 'KHACH_HANG'`
      );

      res.status(200).json({
        status: "success",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getPatientRecord: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool
        .request()
        .input("SDT", req.params.phone)
        .output("message")
        .execute(`sp_XemHoSoBenhNhan`);

      res.status(200).json({
        status: "success",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getAppointments: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(
        `SELECT LH.*, ND.HO_TEN AS TEN_BENH_NHAN FROM LICH_HEN LH JOIN NGUOI_DUNG ND ON LH.BENH_NHAN = ND.SDT WHERE LH.NHA_SI = '${req.params.phone}' ORDER BY LH.NGAY_HEN DESC`
      );

      res.status(200).json({
        status: "success",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getAllMedicines: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(`SELECT * FROM THUOC`);

      res.status(200).json({
        status: "success",
        data: result.recordset,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getMedicalExamination: async (req, res) => {
    try {
      await pool.connect();

      const medicalExamination = await pool.query(
        `SELECT * FROM LAN_KHAM WHERE MA_LAN_KHAM = '${req.params.id}'`
      );

      const patient = await pool.query(
        `SELECT * FROM NGUOI_DUNG WHERE SDT = '${medicalExamination.recordset[0].BENH_NHAN}'`
      );

      const patientRecords = await pool
      .request()
      .input("SDT", patient.recordset[0].SDT)
      .output("message")
      .execute(`sp_XemHoSoBenhNhan`);

      const patientRecord = patientRecords.recordset.find((record) => {
        return record.MA_LAN_KHAM === parseInt(req.params.id);
      });

      res.status(200).json({
        status: "success",
        data: {
          medicalExamination: medicalExamination.recordset[0],
          patient: patient.recordset[0],
          patientRecord: patientRecord,
        },
        message: "Success",
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  }
};
