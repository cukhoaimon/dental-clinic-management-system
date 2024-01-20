const pool = require("../utils/db");

module.exports = {
  getProfile: async (req, res) => {
    try {
      await pool.connect();

      const result = await pool
        .request()
        .input("SDT", req.params.id)
        .output("message")
        .execute(`sp_XemHoSoBenhNhan`);

      const output =
        result.output.message === "Thành công"
          ? result.recordset
          : result.output.message;

      res.status(200).json({
        status: "success",
        output,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  getMedicalRecord: async (req, res) => {
    try {
      await pool.connect();

      let result = await pool
        .request()
        .input("SDT", req.params.id)
        .output("message")
        .execute(`sp_XemHoSoBenhNhan`);

      for (const record of result.recordset) {
        const NHASI = await pool.query(
          `SELECT * FROM NGUOI_DUNG WHERE SDT = ${record.NGUOI_THUC_HIEN}`
        );
        record.NGUOI_THUC_HIEN = NHASI.recordset[0].HO_TEN;
        console.log(record.NGUOI_THUC_HIEN);
      }

      result.recordset.forEach((record) => {
        record.DICH_VU = JSON.parse(record.DICH_VU);
        record.THUOC = JSON.parse(record.THUOC);
      });

      console.log(result.recordset);

      const output =
        result.output.message === "Thành công"
          ? result.recordset
          : result.output.message;

      res.status(200).json({
        status: "success",
        output,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  recordExamination: async (req, res) => {
    // Ghi nhận lần khám
    try {
      await pool.connect();

      const { customer, examinationDate, dentist, services, medicines } =
        req.body;

      const servicesTable = new sql.Table();
      const medicinesTable = new sql.Table();

      servicesTable.columns.add("MaDichVu", sql.Int);
      services.forEach((service) => servicesTable.rows.add(service));

      medicinesTable.columns.add("MaThuoc", sql.Int);
      medicinesTable.columns.add("SoLuong", sql.Int);
      medicines.forEach((medicine) =>
        medicinesTable.rows.add(medicine.id, medicine.quantity)
      );

      const result = await pool
        .request()
        .input("SDT", customer)
        .input("NgayKham", examinationDate)
        .input("NguoiThucHien", dentist)
        .input("DanhSachDichVu", servicesTable)
        .input("DanhSachThuoc", medicinesTable)
        .output("message")
        .execute(`GhiNhanLanKham`);

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
};
