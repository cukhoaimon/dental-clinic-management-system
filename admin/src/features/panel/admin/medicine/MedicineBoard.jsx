import { Fragment, useState, useMemo, useEffect } from "react";
import { Medicine } from "./Medicine";
import { Pagination } from "./Pagination";
import { medicinesMock, MEDS_PER_PAGE } from "../../mocks/medicines";
import FormED from "./form-edit-delete";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const MedicineBoard = ({ attr, diaLogName }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentMeds = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * MEDS_PER_PAGE;
    const lastPageIndex = firstPageIndex + MEDS_PER_PAGE;
    return medicines.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, medicines]);

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
    setMedicines(isLoaded ? medicines : medicinesMock);
    setIsLoaded(true);
  }, [medicines]);

  // Handle submit edit
  const handleEdit = (newValues) => {
    setMedicines((preMed) => preMed.map((medicine) => medicine.id === newValues.id ? newValues : medicine));
  }

  const handleDelete = (id) => {
    setMedicines((preMed) => preMed.filter((medicine) => medicine.id !== id));
  }

  const submitEdit = (newValues, formState) => {
    // e.preventDefault();

    // currentMeds.find((medicine) => medicine.id === newValues.id).name = newValues.name;
    // currentMeds.find((medicine) => medicine.id === newValues.id).usage = newValues.usage;
    // currentMeds.find((medicine) => medicine.id === newValues.id).price = newValues.price;
    // currentMeds.find((medicine) => medicine.id === newValues.id).unit = newValues.unit;
    // currentMeds.find((medicine) => medicine.id === newValues.id).expDay = newValues.expDay;
    // currentMeds.find((medicine) => medicine.id === newValues.id).inventoryQuantity = newValues.inventoryQuantity;    

    console.log(newValues)

    if (formState === "edit") {
      handleEdit(newValues);
    }
    else {
      handleDelete(newValues.id);
    }
    // setMedicines(preMed => preMed.filter(medicine => medicine.id !== newValues.id));
    
    
    
    setOpenDialogEdit(false);
    // console.log("submit edit", newValues);
  };

  // handle dialog edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [editedMedicine, setEditedMedicine] = useState(null);

  const attr1 = useProcessDialog({
    id: "editMedicine",
    title: "Chỉnh sửa thuốc",
    triggerValue: openDialogEdit,
    onClose: () => {
      setEditedMedicine(null);
      // setShouldFocusInput(false)
      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (id) => {
    const res = medicines.find((medicine) => medicine.id === id);
    
    setEditedMedicine(res);
    // console.log(editedMedicine);
    setOpenDialogEdit(true);
  };

  return (
    <Fragment>
      <Dialog title={diaLogName} attr={attr}>
        <h1>the quick brown fox jumps over the lazy dog</h1>
      </Dialog>

      <Dialog title={"Chỉnh sửa thuốc"} attr={attr1}>
        <FormED editedMedicine={editedMedicine} submitEdit={submitEdit}/>
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

      <div className="h table w-full overflow-y-auto">
        {currentMeds.map((medicine) => (
          <Medicine
            key={medicine.id}
            medicine={medicine}
            handleCheck={handleCheck}
            selected={selectedMedicines.includes(medicine.id)}
            handlePopUpEdit={handlePopUpEdit}
          />
        ))}
        <div className="pagination__wrapper">
          <Pagination
            totalItems={medicines.flat().length}
            itemsPerPage={MEDS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
