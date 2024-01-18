const pool = require("../utils/db");

module.exports = {
  getEmployees: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(
        `SELECT * FROM NGUOI_DUNG WHERE VAI_TRO = 'NHAN_VIEN'`
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
  getAppointments: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(
        `SELECT LH.*, ND.HO_TEN AS TEN_BENH_NHAN FROM LICH_HEN LH JOIN NGUOI_DUNG ND ON LH.BENH_NHAN = ND.SDT ORDER BY LH.MA_LICH_HEN ASC`
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
  getRecords: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool.query(
        `SELECT LK.*, ND.HO_TEN AS TEN_BENH_NHAN FROM LAN_KHAM LK JOIN NGUOI_DUNG ND ON LK.BENH_NHAN = ND.SDT ORDER BY LK.MA_LAN_KHAM ASC`
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
  }
};
