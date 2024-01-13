const pool = require('../utils/db')

module.exports = {
    LayTatCaThuoc: async (req, res) => {
        try {
            await pool.connect();

            const result = await pool.query(`SELECT * FROM THUOC`);

            res.status(200).json({
                status: "success",
                data: result.recordset
            });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    },
}