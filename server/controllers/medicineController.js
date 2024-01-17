const pool = require("../utils/db");

module.exports = {
  getMedicines: async (req, res) => {
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

  updateMedicine: async (req, res) => {
    try {
      await pool.connect();

      const { id } = req.params;
      const { NGAY_HET_HAN, TEN_THUOC, DON_VI_TINH, CHI_DINH, GIA, SO_LUONG_TON_KHO } = req.body;
      //format date
      const [day, month, year] = NGAY_HET_HAN.split("/");
      const formattedDate = `${year}-${month}-${day}`;
      // query
      // const result = await pool.query(
      //   `UPDATE THUOC SET TEN_THUOC = '${TEN_THUOC}', DON_VI_TINH = '${DON_VI_TINH}', GIA = ${GIA}, SO_LUONG_TON_KHO = ${SO_LUONG_TON_KHO}, CHI_DINH = N'${CHI_DINH}', NGAY_HET_HAN = '${formattedDate}' WHERE MA_THUOC = ${id}`
      // );

      // res.status(200).json({
      //   status: "success",
      //   // data: result,
      // });

      const result = await pool.request()
        .input('Ma', id)
        .input('Ngay', formattedDate)
        .input('Ten', TEN_THUOC)
        .input('Dv', DON_VI_TINH)
        .input('Chidinh', CHI_DINH)
        .input('Gia', GIA)
        .input('SoLuong', SO_LUONG_TON_KHO)
        .output('message')
        .execute(`sp_SuaThuoc`);

        const output = result.output.message;

        res.status(200).json({
            status: "success",
            message: output
        });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
};
