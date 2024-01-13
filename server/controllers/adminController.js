const pool = require('../utils/db')

module.exports = {
    LockUser: async (req, res) => {
        try {
            await pool.connect();

            const result = await pool.request()
                .input('SDT', req.body.id)
                .output('message')
                .execute(`KhoaTaiKhoan`);

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
    },
    Login: async (req, res) => {
        try {
            await pool.connect();

            const result = await pool.request()
                .input('SDT', req.body.phone)
                .input('MAT_KHAU', req.body.password)
                .output('VAI_TRO')
                .execute(`sp_DangNhapAdmin`);

            if (result.output.VAI_TRO === "INVALID") {
                res.status(400).json({
                    status: "fail",
                    message: "Số điện thoại hoặc mật khẩu không đúng",
                });
                return
            }

            res.status(200).json({
                status: "success",
                message: "Đăng nhập thành công",
                role: result.output.VAI_TRO
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    }
}