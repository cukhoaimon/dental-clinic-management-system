const pool = require('../utils/db')

module.exports = {
    getBill: async (req, res) => {
        try {
            await pool.connect();
            const {id} = req.params;
            const medicines = await pool.query(
                `SELECT DT.MA_THUOC id, TH.TEN_THUOC 'name', TH.GIA price, DT.SO_LUONG quantity FROM DON_THUOC DT LEFT JOIN THUOC TH ON DT.MA_THUOC = TH.MA_THUOC
                WHERE DT.MA_LAN_KHAM = '${id}'`
            ).then((result) => {
                return result.recordset;
            })

            const services = await pool.query(
                `SELECT LKDV.MA_DICH_VU id, DV.TEN_DICH_VU name, DV.GIA price FROM LAN_KHAM_DICH_VU LKDV LEFT JOIN DICH_VU DV ON LKDV.MA_DICH_VU = DV.MA_DICH_VU
                WHERE LKDV.MA_LAN_KHAM = '${id}'`
            ).then((result) => {
                return result.recordset;
            })
            
            const lankham = await pool.query(
                `SELECT * FROM LAN_KHAM WHERE MA_LAN_KHAM = '${id}'`
            ).then((result) => {
                return result.recordset[0];
            })

            res.status(200).json({
                status: "success",
                bill: {
                    medicines,
                    services,
                    lankham
                }
            });


        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: err.message,
            });
        }
    },
}