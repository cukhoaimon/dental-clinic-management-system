import { Fragment, useState, useMemo, useEffect } from "react";
import { Schedule } from "./Schedule";
import { Pagination } from "../../../common/Pagination";
import {schedulesMock, SCHEDULES_PER_PAGE } from "../../mocks/schedules";
import FormED from "./form-edit-delete";
import FormAdd from "./form-add";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const ScheduleBoard = ({ attr, diaLogName, setOpenDialog }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentDens = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * SCHEDULES_PER_PAGE;
    const lastPageIndex = firstPageIndex + SCHEDULES_PER_PAGE;
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
    setSchedules(isLoaded ? schedules : schedulesMock);
    setIsLoaded(true);
  }, [schedules, isLoaded]);

  // Handle submit add 1 object
  const submitAdd = (newValues) => {
    console.log(newValues);
    setSchedules((preDen) => [...preDen, newValues]);
    setOpenDialog(false);
  };

  // Handle delete selected
  const deleteSelected = () => {
    setOpenDialog(false);
    if (!selectedSchedules) return;
    selectedSchedules.forEach((schedule) => handleDelete(schedule));
  };

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
  const [editedSchedule, setEditedSchedule] = useState(null);

  const attr1 = useProcessDialog({
    id: "editSchedule",
    title: "Chỉnh sửa lịch",
    triggerValue: openDialogEdit,
    onClose: () => {
      setEditedSchedule(null);

      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (id) => {
    const res = schedules.find((schedule) => schedule.id === id);
    
    setEditedSchedule(res);

    setOpenDialogEdit(true);
  };

  return (
    <Fragment>
      {/* Dialog top */}
      <Dialog title={diaLogName} attr={attr}>
        {diaLogName === "Xoá" ? (
          <>
            <p>Xoá các lịch đã chọn?</p>
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
      <Dialog title={"Chỉnh sửa lịch hẹn"} attr={attr1}>
        <FormED editedSchedule={editedSchedule} submitEdit={submitEdit} />
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
        <p className="w-[15%] text-center">Mã lịch hẹn</p>
        <p className="w-1/3 text-left">Bệnh nhân</p>
        <p className="w-1/5 text-center">Ngày đăng ký</p>
        <p className="w-1/5 text-center">Ngày hẹn</p>
        <p className="text-center"></p>
      </div>

      <div className="h table w-full overflow-y-auto">
        {currentDens.map((schedule,index) => (
          <Schedule
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
            itemsPerPage={SCHEDULES_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
