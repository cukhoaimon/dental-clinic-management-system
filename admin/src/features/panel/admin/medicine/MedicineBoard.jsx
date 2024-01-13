import { Fragment, useState, useMemo, useEffect } from "react";
import { Medicine } from "./Medicine";
import { Pagination } from "../../../common/Pagination";
import { MEDS_PER_PAGE } from "../../mocks/medicines";
import axiosClient from "../../../../services/axiosClient";
import FormED from "./form-edit-delete";
import FormAdd from "./form-add";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";
import formatDate from "../../../../utils/formatDate";
import { isFormat } from "../../../../utils/formatDate";

/* eslint-disable react/prop-types */
export const MedicineBoard = ({ attr, diaLogName, setOpenDialog }) => {
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
    async function fetchData() {
      const res = await axiosClient.get("medicines");
      setMedicines(isLoaded ? medicines : res.data);
      // setMedicines((preMed) =>
      //   preMed.map((medicine) => {
      //     medicine.NGAY_HET_HAN = formatDate(medicine.NGAY_HET_HAN);
      //   }),
      // );
      // console.log(res.data);
      setIsLoaded(true);
    }

    fetchData();
  }, []);

  // Handle submit add 1 object
  const submitAdd = (newValues) => {
    // console.log(newValues);
    setMedicines((preMed) => [...preMed, newValues]);
    setOpenDialog(false);
  };

  // Handle delete selected
  const deleteSelected = () => {
    setOpenDialog(false);
    if (!selectedMedicines) return;
    selectedMedicines.forEach((med) => handleDelete(med));
  };

  // Handle submit edit 1 object
  const handleEdit = async (newValues) => {
    // console.log(newValues);
    await axiosClient
      .patch(`medicines/${newValues.MA_THUOC}`, newValues)
      .then(() =>
        setMedicines((preMed) =>
          preMed.map((medicine) =>
            medicine.MA_THUOC === newValues.MA_THUOC ? newValues : medicine,
          ),
        ),
      )
      .catch((err) => console.log(err));
    // setMedicines((preMed) =>
    //   preMed.map((medicine) =>
    //     medicine.MA_THUOC === newValues.MA_THUOC ? newValues : medicine,
    //   ),
    // );
  };

  // Handle submit delete 1 object
  const handleDelete = (id) => {
    setMedicines((preMed) => preMed.filter((medicine) => medicine.id !== id));
  };

  const submitEdit = (newValues, formState) => {
    if (formState === "edit") {
      handleEdit(newValues);
    } else {
      handleDelete(newValues.id);
    }

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

      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (id) => {
    const res = medicines.find((medicine) => medicine.MA_THUOC === id);
    // console.log('RES',res);
    // if (typeof res.NGAY_HET_HAN === 'string')
    //   res.NGAY_HET_HAN = formatDate(res.NGAY_HET_HAN);
    if (!isFormat(res.NGAY_HET_HAN)) res.NGAY_HET_HAN = formatDate(res.NGAY_HET_HAN);
    // console.log(typeof (res.NGAY_HET_HAN));
    setEditedMedicine(res);

    setOpenDialogEdit(true);
  };

  return (
    <Fragment>
      {/* Dialog top */}
      <Dialog title={diaLogName} attr={attr}>
        {diaLogName === "Xoá" ? (
          <>
            <p>Xoá các thuốc đã chọn?</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                deleteSelected();
              }}
            >
              <div className="inline-flex w-full justify-end pt-4">
                <button
                  className="btn"
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                >
                  Huỷ
                </button>
                <button className="btn-delete ml-2" type="submit">
                  Xoá
                </button>
              </div>
            </form>
          </>
        ) : (
          <FormAdd submitAdd={submitAdd} />
        )}
      </Dialog>

      {/* Dialog lines */}
      <Dialog title={"Chỉnh sửa thuốc"} attr={attr1}>
        <FormED editedMedicine={editedMedicine} submitEdit={submitEdit} />
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
            key={medicine.MA_THUOC}
            medicine={medicine}
            handleCheck={handleCheck}
            selected={selectedMedicines.includes(medicine.MA_THUOC)}
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
