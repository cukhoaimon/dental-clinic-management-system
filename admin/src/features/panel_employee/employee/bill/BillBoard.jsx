import { Fragment, useState, useMemo, useEffect } from "react";
import { Bill } from "./Bill";
import { Pagination } from "../../../common/Pagination";
import {billsMock, BILLS_PER_PAGE } from "../../mocks/bills";
import FormED from "./form-edit-delete";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const BillBoard = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentDens = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * BILLS_PER_PAGE;
    const lastPageIndex = firstPageIndex + BILLS_PER_PAGE;
    return schedules.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, schedules]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setSelectedSchedules([]);
    } else {
      setSelectedSchedules(schedules.map((schedule) => schedule.id));
    }

    setIsCheckAll(!isCheckAll);
  };

  const handleCheck = (id) => {
    if (selectedSchedules.includes(id)) {
      setSelectedSchedules(
        selectedSchedules.filter((medicineId) => medicineId !== id),
      );
    } else {
      setSelectedSchedules([...selectedSchedules, id]);
    }
  };

  // load data
  useEffect(() => {
    setSchedules(isLoaded ? schedules : billsMock);
    setIsLoaded(true);
  }, [schedules, isLoaded]);



  // Handle submit edit 1 object
  const handleEdit = (newValues) => {
    setSchedules((preDen) =>
      preDen.map((schedule) =>
        schedule.id === newValues.id ? newValues : schedule,
      ),
    );
  };

  // Handle submit delete 1 object
  const handleDelete = (id) => {
    setSchedules((preDen) => preDen.filter((schedule) => schedule.id !== id));
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
  const [editedBill, setEditedBill] = useState(null);

  const attr1 = useProcessDialog({
    id: "editSchedule",
    title: "Chỉnh sửa lịch",
    triggerValue: openDialogEdit,
    onClose: () => {
      setEditedBill(null);

      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (id) => {
    const res = schedules.find((schedule) => schedule.id === id);

    setEditedBill(res);

    setOpenDialogEdit(true);
  };

  return (
    <Fragment>
      {/* Dialog top */}
      

      {/* Dialog lines */}
      <Dialog title={"Chỉnh sửa hoá đơn"} attr={attr1}>
        <FormED editedBill={editedBill} submitEdit={submitEdit} />
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
        <p className="w-[15%] text-center">Mã lần khám</p>
        <p className="w-1/3 text-left">Bệnh nhân</p>
        <p className="w-1/5 text-center">Ngày khám</p>
        <p className="w-1/5 text-center">Trạng thái</p>
        <p className="text-center"></p>
      </div>

      <div className="h table w-full overflow-y-auto">
        {currentDens.map((schedule,index) => (
          <Bill
            key={index}
            schedule={schedule}
            index={index + 1}
            handleCheck={handleCheck}
            selected={selectedSchedules.includes(schedule.id)}
            handlePopUpEdit={handlePopUpEdit}
          />
        ))}
        <div className="pagination__wrapper">
          <Pagination
            totalItems={schedules.flat().length}
            itemsPerPage={BILLS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
