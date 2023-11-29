import { Fragment, useEffect, useState, useMemo } from "react";
import { Medicine } from "./Medicine";
import { Pagination } from "./Pagination";
import { medicinesMock, MEDS_PER_PAGE } from "../../mocks/medicines";
import Dialog from "../../../common/Dialog";

/* eslint-disable react/prop-types */
export const MedicineBoard = ({attr, diaLogName}) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentMeds = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * MEDS_PER_PAGE;
    const lastPageIndex = firstPageIndex + MEDS_PER_PAGE;
    return medicinesMock.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, medicinesMock]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setSelectedMedicines([]);
    } else {
      setSelectedMedicines(medicines.map((medicine) => medicine.id));
    }

    setIsCheckAll(!isCheckAll);
  };

  const handleCheck = (id) => {
    if (selectedMedicines.includes(id)) {
      setSelectedMedicines(
        selectedMedicines.filter((medicineId) => medicineId !== id),
      );
    } else {
      setSelectedMedicines([...selectedMedicines, id]);
    }
  };

  // load data
  useEffect(() => {
    setMedicines(medicinesMock);
  }, [medicines]);

  return (
    <Fragment>
      <Dialog title={diaLogName} attr={attr}>
        <h1>the quick brown fox jumps over the lazy dog</h1>
      </Dialog>
      
      <div className="nav-table flex h-12 items-center rounded-tl-xl rounded-tr-xl bg-gray-400 px-4">
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
      <div className="h table w-full overflow-y-auto">
        {currentMeds.map((medicine) => (
          <Medicine
            key={medicine.id}
            medicine={medicine}
            handleCheck={handleCheck}
            selected={selectedMedicines.includes(medicine.id)}
          />
        ))}
        <div className="pagination__wrapper">
          <Pagination
            totalItems={medicinesMock.flat().length}
            itemsPerPage={MEDS_PER_PAGE}  
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
