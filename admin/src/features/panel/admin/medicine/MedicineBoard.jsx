import { Fragment, useEffect, useState } from "react";
import { Medicine } from "./Medicine";
import { medicinesMock } from "../../mocks/medicines";

export const MedicineBoard = () => {
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [medicines, setMedicines] = useState([])
    const [selectedMedicines, setSelectedMedicines] = useState([])

    const handleCheckAll = () => {
        if (isCheckAll) {
            setSelectedMedicines([])
        }
        else {
            setSelectedMedicines(medicines.map((medicine) => medicine.id))
        }

        setIsCheckAll(!isCheckAll)
    }

    const handleCheck = (id) => {
        if (selectedMedicines.includes(id)) {
            setSelectedMedicines(selectedMedicines.filter((medicineId) => medicineId !== id))
        } else {
            setSelectedMedicines([...selectedMedicines, id])
        }
    }

    // load data
    useEffect(() => {
        setMedicines(medicinesMock)
    }, [medicines])

  return (
    <Fragment>
      <div className="nav-table flex h-12 text-gray-700 items-center rounded-tl-xl rounded-tr-xl bg-gray-400 px-4">
        <input
          onChange={handleCheckAll}
          checked={isCheckAll}
          className="h-6 w-6 cursor-pointer"
          type="checkbox"
          name="all"
          id="all"
        />
        <p className="w-[10%] text-center">Mã thuốc</p>
        <p className="w-1/5 text-left">Tên thuốc</p>
        <p className="w-1/5 text-left">Chỉ định</p>
        <p className="w-1/6 text-center">Giá (VNĐ)</p>
        <p className="w-[10%] text-center">ĐV Tính</p>
        <p className="w-1/6 text-center">Ngày hết hạn</p>
        <p className="w-[10%] text-center">Số lượng tồn kho</p>
      </div>

     {/* TODO: Add pagination */}
      <div className="table w-full overflow-y-auto h">
        {medicines.map((medicine) => (
          <Medicine key={medicine.id} medicine={medicine} handleCheck={handleCheck} selected={selectedMedicines.includes(medicine.id)} />
        ))}
      </div>
    </Fragment>
  );
};
