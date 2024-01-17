/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react"
import { getAllMedicines, getMedicalExamination, prescribeMedication } from "../../services/apiDentist"
import formatDate from "../../utils/formatDate"
import toast from "react-hot-toast"


const MedicalExamination = () => {
    const [medicines, setMedicines] = useState([])

    const [currentMedicines, setCurrentMedicines] = useState([])

    const [newMedicines, setNewMedicines] = useState([])

    const [data, setData] = useState(null)

    const handleAddMedicine = () => {
        // check if there is any medicine not selected
        const isExist = newMedicines.find((medicine) => medicine.MA_THUOC === undefined)

        if (isExist){
            toast.error("Vui lòng chọn thuốc trước khi thêm mới")
            return
        }

        setNewMedicines((prev) => {
            return [
                ...prev,
                {
                    MA_THUOC: undefined,
                    quantity: 0,
                }
            ]
        })
    }

    const handleCheckValidNewMedicines = () => {
        const isExist = newMedicines.find((medicine) => medicine.MA_THUOC === undefined)

        if (isExist){
            toast.error("Vui lòng chọn thuốc trước khi lưu")
            return false
        }

        const isQuantityValid = newMedicines.find((medicine) => medicine.quantity === 0)

        if (isQuantityValid){
            toast.error("Vui lòng nhập số lượng thuốc trước khi lưu")
            return false
        }

        return true
    
    }

    useEffect(() => {
        const fetchData = async () => {
            // get all medicines
            let res = await getAllMedicines()
            setMedicines(res.data)

            // get current medicines
            const id = window.location.pathname.split("/")[3]

            res = await getMedicalExamination(id)
            const { data } = res
            setData(data)

            // get current medicines
            const currentMedicines = JSON.parse(data.patientRecord.THUOC)
            setCurrentMedicines(currentMedicines)
        }

        fetchData()
    }, [])

    const handleSave = async () => {
        if (!handleCheckValidNewMedicines()){
            return
        }

        const id = window.location.pathname.split("/")[3]
        const promiseArr = newMedicines.map((medicine) => {
            return prescribeMedication({
                ma_lk: id,
                ma_thuoc: medicine.MA_THUOC,
                so_luong: medicine.quantity,
            })
        })

        await Promise.all(promiseArr)
        
        window.location.reload()
    }

  return (
    <div className="py-10 px-40">
      <div className="text-5xl font-bold uppercase mb-10">
        <p className="text-blue-300">Chỉnh sửa lần khám</p>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex flex-col">
          <span className="font-bold text-blue-400">Bệnh nhân</span>
          <span className="font-bold">{`Họ và tên: ${data && data.patient.HO_TEN}`}</span>
          <span>{`Số điện thoại: ${data &&data.patient.SDT}`}</span>
          <span>{`Địa chỉ: ${data && data.patient.DIA_CHI}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-blue-400">Nha sĩ thực hiện</span>
          <span className="font-bold">{`Họ và tên: ${data && data.patientRecord.NHA_SI_THUC_HIEN}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-blue-400">Khám bệnh</span>
          <span className="font-bold">{`Mã lần khám: ${data && data.patientRecord.MA_LAN_KHAM}`}</span>
          <span>{`Ngày khám: ${data && formatDate(data.patientRecord.NGAY_KHAM)}`}</span>
        </div>
      </div>
      <div className="mt-10">
        <span className="font-bold text-3xl text-blue-400">Thuốc</span>
        <table className="table-auto w-full mt-5">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="border px-4 py-2">Tên thuốc</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Chỉ định</th>
              <th className="border px-4 py-2">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {
                currentMedicines.map((medicine) => {
                    const medicineData = medicines.find((item) => item.MA_THUOC === medicine.MA_THUOC)
                        return (
                            <tr className="h-[40px]" key={medicine.MA_THUOC}>
                                <td className="border px-4 py-2">{medicineData.TEN_THUOC}</td>
                                <td className="border text-center px-4 py-2">{medicine.SO_LUONG}</td>
                                <td className="border text-center px-4 py-2">{medicineData.CHI_DINH}</td>
                                <td className="border text-center px-4 py-2">{medicineData.GIA}</td>
                            </tr>
                        )
                })
            }
            {
                newMedicines.map((medicine, index) => {
                    // find medicine in data
                    let medicineData = medicines.find((item) => item.MA_THUOC === medicine.MA_THUOC)
                    return (
                        <tr className="h-[40px]" key={medicine.MA_THUOC ? medicine.MA_THUOC : index}>
                            <td className="border px-4 py-2">
                                <select className="w-full z-10" value={medicine.MA_THUOC} onChange={(e) => {
                                    const MA_THUOC = e.target.value
                                    setNewMedicines((prev) => {
                                        return prev.map((item) => {
                                            if (item.MA_THUOC === medicine.MA_THUOC){
                                                return {
                                                    ...item,
                                                    MA_THUOC: parseInt(MA_THUOC),
                                                }
                                            }
                                            return item
                                        })
                                    })
                                }}>
                                    {medicine.MA_THUOC === undefined ? <option value={undefined}>Chọn thuốc</option> : 
                                        <option value={medicine.MA_THUOC}>{medicineData.TEN_THUOC}</option>
                                    }
                                    {
                                        medicines.map((item) => {
                                            // check if medicine is exist in currentMedicines or newMedicines
                                            const isExist = currentMedicines.concat(newMedicines).find((medicine) => medicine.MA_THUOC === item.MA_THUOC)
                                            if (isExist) return null
                                            return (
                                                <option key={item?.MA_THUOC} value={item?.MA_THUOC}>{item?.TEN_THUOC}</option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td className="border text-center px-4 py-2">
                                <input className="w-full text-center" type="number" value={medicine?.quantity} onChange={(e) => {
                                    const quantity = e.target.value
                                    
                                    setNewMedicines((prev) => {
                                        return prev.map((item) => {
                                            if (item?.MA_THUOC === medicine?.MA_THUOC){
                                                return {
                                                    ...item,
                                                    quantity: parseInt(quantity),
                                                }
                                            }
                                            return item
                                        })
                                    })
                                }} />
                            </td>
                            <td className="border text-center px-4 py-2">
                                {medicineData?.CHI_DINH}
                            </td>
                            <td className="border text-center px-4 py-2">
                                {medicineData?.GIA}
                            </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
        <button onClick={handleAddMedicine} className="w-full text-white font-bold hover:bg-blue-500 mt-5 rounded-lg text-center h-10 bg-blue-400">
            + Thêm thuốc
        </button>
      </div>
      <div className="w-full flex justify-evenly mt-10">
        <button onClick={handleSave} type="button" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Lưu</button>
        <button onClick={() => { window.location.reload() }} type="button" className="w-32 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Huỷ</button>
      </div>
    </div>
  )
}

export default MedicalExamination