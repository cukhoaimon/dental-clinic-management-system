import { Fragment, useState, useMemo, useEffect } from "react";
import { Employee } from "./Employee";
import { Pagination } from "../../../common/Pagination";
import { employeesMock, EMPS_PER_PAGE } from "../../mocks/employees";
import FormED from "./form-edit-delete";
import FormAdd from "./form-add";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const EmployeeBoard = ({ attr, diaLogName, setOpenDialog }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentDens = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * EMPS_PER_PAGE;
    const lastPageIndex = firstPageIndex + EMPS_PER_PAGE;
    return employees.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, employees]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map((employee) => employee.phone));
    }

    setIsCheckAll(!isCheckAll);
  };

  const handleCheck = (phone) => {
    if (selectedEmployees.includes(phone)) {
      setSelectedEmployees(
        selectedEmployees.filter((medicineId) => medicineId !== phone),
      );
    } else {
      setSelectedEmployees([...selectedEmployees, phone]);
    }
  };

  // load data
  useEffect(() => {
    setEmployees(isLoaded ? employees : employeesMock);
    setIsLoaded(true);
  }, [employees]);

  // Handle submit add 1 object
  const submitAdd = (newValues) => {
    console.log(newValues);
    setEmployees((preDen) => [...preDen, newValues]);
    setOpenDialog(false);
  };

  // Handle delete selected
  const deleteSelected = () => {
    setOpenDialog(false);
    if (!selectedEmployees) return;
    selectedEmployees.forEach((emp) => handleDelete(emp));
  };

  // Handle submit edit 1 object
  const handleEdit = (newValues) => {
    setEmployees((preDen) =>
      preDen.map((employee) =>
        employee.phone === newValues.phone ? newValues : employee,
      ),
    );
  };

  // Handle submit delete 1 object
  const handleDelete = (phone) => {
    setEmployees((preDen) => preDen.filter((employee) => employee.phone !== phone));
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
  const [editedEmployee, setEditedEmployee] = useState(null);

  const attr1 = useProcessDialog({
    id: "editEmployee",
    title: "Chỉnh sửa thuốc",
    triggerValue: openDialogEdit,
    onClose: () => {
      setEditedEmployee(null);

      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (phone) => {
    const res = employees.find((employee) => employee.phone === phone);
    
    setEditedEmployee(res);

    setOpenDialogEdit(true);
  };

  return (
    <Fragment>
      {/* Dialog top */}
      <Dialog title={diaLogName} attr={attr}>
        {diaLogName === "Xoá" ? (
          <>
            <p>Xoá các nhân viên đã chọn?</p>
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
        <FormED editedEmployee={editedEmployee} submitEdit={submitEdit} />
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
        {currentDens.map((employee,index) => (
          <Employee
            key={index}
            employee={employee}
            index={index + 1}
            handleCheck={handleCheck}
            selected={selectedEmployees.includes(employee.phone)}
            handlePopUpEdit={handlePopUpEdit}
          />
        ))}
        <div className="pagination__wrapper">
          <Pagination
            totalItems={employees.flat().length}
            itemsPerPage={EMPS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
