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
};
