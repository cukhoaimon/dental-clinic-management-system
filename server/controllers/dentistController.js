const pool = require("../utils/db");

module.exports = {
  KeDonThuoc: async (req, res) => {
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
};
