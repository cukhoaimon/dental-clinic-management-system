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
    }
}