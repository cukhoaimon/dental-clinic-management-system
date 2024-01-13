const pool = require('../utils/db');

module.exports = {
    getProfile: async (req, res) => {
        try {
            await pool.connect();

            const result = await pool.request()
                .input('SDT', req.params.id)
                .output("message")
                .execute(`XemThongTinCaNhan`);

            const output = result.output.message === "Thành công" ? result.recordset[0] : result.output.message;

            res.status(200).json({
                status: "success",
                output
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

            const result = await pool.request()
                .input('SDT', req.params.id)
                .output('message')
                .execute(`XemHoSoBenhNhan`);

            const output = result.output.message === "Thành công" ? result.recordset[0] : result.output.message;

            // console.log(JSON.parse(result.recordset[0].DICH_VU));

            res.status(200).json({
                status: "success",
                output
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    },

    recordExamination: async (req, res) => { // Ghi nhận lần khám
        try {
            await pool.connect();

            const { customer, examinationDate, dentist, services, medicines } = req.body;

            const servicesTable = new sql.Table();
            const medicinesTable = new sql.Table();

            servicesTable.columns.add('MaDichVu', sql.Int);
            services.forEach(service => servicesTable.rows.add(service));

            medicinesTable.columns.add('MaThuoc', sql.Int);
            medicinesTable.columns.add('SoLuong', sql.Int);
            medicines.forEach(medicine => medicinesTable.rows.add(medicine.id, medicine.quantity));

            const result = await pool.request()
                .input('SDT', customer)
                .input('NgayKham', examinationDate)
                .input('NguoiThucHien', dentist)
                .input('DanhSachDichVu', servicesTable)
                .input('DanhSachThuoc', medicinesTable)
                .output('message')
                .execute(`GhiNhanLanKham`);

            res.status(200).json({
                status: "success",
                message: result.output.message
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    }
}