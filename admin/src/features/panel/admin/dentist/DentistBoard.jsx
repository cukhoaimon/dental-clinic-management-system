import { Fragment, useState, useMemo, useEffect } from "react";
import { Dentist } from "./Dentist";
import { Pagination } from "../../../common/Pagination";
import { dentistsMock, DENS_PER_PAGE } from "../../mocks/dentists";
import FormED from "./form-edit-delete";
import FormAdd from "./form-add";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const DentistBoard = ({ attr, diaLogName, setOpenDialog }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dentists, setDentists] = useState([]);
  const [selectedDentists, setSelectedDentists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentDens = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * DENS_PER_PAGE;
    const lastPageIndex = firstPageIndex + DENS_PER_PAGE;
    return dentists.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dentists]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setSelectedDentists([]);
    } else {
      setSelectedDentists(dentists.map((dentist) => dentist.phone));
    }

    setIsCheckAll(!isCheckAll);
  };

  const handleCheck = (phone) => {
    if (selectedDentists.includes(phone)) {
      setSelectedDentists(
        selectedDentists.filter((medicineId) => medicineId !== phone),
      );
    } else {
      setSelectedDentists([...selectedDentists, phone]);
    }
  };

  // load data
  useEffect(() => {
    setDentists(isLoaded ? dentists : dentistsMock);
    setIsLoaded(true);
  }, [dentists]);

  // Handle submit add 1 object
  const submitAdd = (newValues) => {
    console.log(newValues);
    setDentists((preDen) => [...preDen, newValues]);
    setOpenDialog(false);
  };

  // Handle delete selected
  const deleteSelected = () => {
    setOpenDialog(false);
    if (!selectedDentists) return;
    selectedDentists.forEach((den) => handleDelete(den));
  };

  // Handle submit edit 1 object
  const handleEdit = (newValues) => {
    setDentists((preDen) =>
      preDen.map((dentist) =>
        dentist.phone === newValues.phone ? newValues : dentist,
      ),
    );
  };

  // Handle submit delete 1 object
  const handleDelete = (phone) => {
    setDentists((preDen) => preDen.filter((dentist) => dentist.phone !== phone));
  };

  const submitEdit = (newValues, formState) => {
    if (formState === "edit") {
      handleEdit(newValues);
    } else {
      handleDelete(newValues.phone);
    }

    setOpenDialogEdit(false);
    // console.log("submit edit", newValues);
  };

  // handle dialog edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [editedDentist, setEditedDentist] = useState(null);

  const attr1 = useProcessDialog({
    id: "editDentist",
    title: "Chỉnh sửa thuốc",
    triggerValue: openDialogEdit,
    onClose: () => {
      setEditedDentist(null);

      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (phone) => {
    const res = dentists.find((dentist) => dentist.phone === phone);
    
    setEditedDentist(res);

    setOpenDialogEdit(true);
  };

  return (
    <Fragment>
      {/* Dialog top */}
      <Dialog title={diaLogName} attr={attr}>
        {diaLogName === "Xoá" ? (
          <>
            <p>Xoá các nha sĩ đã chọn?</p>
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
        ) : <FormAdd submitAdd={submitAdd}/>}
      </Dialog>

      {/* Dialog lines */}
      <Dialog title={"Chỉnh sửa hồ sơ"} attr={attr1}>
        <FormED editedDentist={editedDentist} submitEdit={submitEdit} />
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
        <p className="w-[15%] text-center">STT</p>
        <p className="w-1/5 text-left">Họ và tên</p>
        <p className="w-1/8 text-left">Ngày sinh</p>
        <p className="w-1/6 text-center">Số điện thoại</p>
        <p className="w-[30%] text-center">Địa chỉ</p>
      </div>

      <div className="h table w-full overflow-y-auto">
        {currentDens.map((dentist,index) => (
          <Dentist
            key={index}
            dentist={dentist}
            index={index + 1}
            handleCheck={handleCheck}
            selected={selectedDentists.includes(dentist.phone)}
            handlePopUpEdit={handlePopUpEdit}
          />
        ))}
        <div className="pagination__wrapper">
          <Pagination
            totalItems={dentists.flat().length}
            itemsPerPage={DENS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
