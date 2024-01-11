import { Fragment, useState, useMemo, useEffect } from "react";
import { Patient } from "./Patient";
import { Pagination } from "../../../common/Pagination";
import { patientsMock, PATIENTS_PER_PAGE } from "../../mocks/patients";
import FormED from "./form-edit-delete";
import FormAdd from "./form-add";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";
import PatientRecord from "./patient-records";

/* eslint-disable react/prop-types */
export const PatientBoard = ({ attr, diaLogName, setOpenDialog }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentDens = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
    const lastPageIndex = firstPageIndex + PATIENTS_PER_PAGE;
    return patients.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, patients]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(patients.map((patient) => patient.phone));
    }

    setIsCheckAll(!isCheckAll);
  };

  const handleCheck = (phone) => {
    if (selectedPatients.includes(phone)) {
      setSelectedPatients(
        selectedPatients.filter((medicineId) => medicineId !== phone),
      );
    } else {
      setSelectedPatients([...selectedPatients, phone]);
    }
  };

  // load data
  useEffect(() => {
    setPatients(isLoaded ? patients : patientsMock);
    setIsLoaded(true);
  }, [patients, isLoaded]);

  // Handle submit add 1 object
  const submitAdd = (newValues) => {
    console.log(newValues);
    setPatients((preDen) => [...preDen, newValues]);
    setOpenDialog(false);
  };

  // Handle delete selected
  const deleteSelected = () => {
    setOpenDialog(false);
    if (!selectedPatients) return;
    selectedPatients.forEach((patient) => handleDelete(patient));
  };

  // Handle submit edit 1 object
  const handleEdit = (newValues) => {
    setPatients((preDen) =>
      preDen.map((patient) =>
        patient.phone === newValues.phone ? newValues : patient,
      ),
    );
  };

  // Handle submit delete 1 object
  const handleDelete = (phone) => {
    setPatients((preDen) => preDen.filter((patient) => patient.phone !== phone));
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
  const [editedPatient, setEditedPatient] = useState(null);

  const attr1 = useProcessDialog({
    id: "editPatient",
    title: "Chỉnh sửa hồ sơ",
    triggerValue: openDialogEdit,
    onClose: () => {
      setEditedPatient(null);

      setOpenDialogEdit(false);
    },
  });

  const handlePopUpEdit = (phone) => {
    const res = patients.find((patient) => patient.phone === phone);
    
    setEditedPatient(res);

    setOpenDialogEdit(true);
  };

   // handle dialog patient records  
   const [openDialogPatientRecords, setopenDialogPatientRecords] = useState(false);
   const [patientRecords, setPatientRecords] = useState(null);
 
   const attr2 = useProcessDialog({
     id: "patientRecords",
     title: "Hồ sơ bệnh nhân",
     triggerValue: openDialogPatientRecords,
     onClose: () => {
       setPatientRecords(null);
 
       setopenDialogPatientRecords(false);
     },
   });

    const handlePopUpPatientRecords = (phone) => {
      const res = patients.find((patient) => patient.phone === phone);
      
      setPatientRecords(res);
  
      setopenDialogPatientRecords(true);
    }



  return (
    <Fragment>
      {/* Dialog top */}
      <Dialog title={diaLogName} attr={attr}>
        {diaLogName === "Xoá" ? (
          <>
            <p>Xoá các bệnh nhân đã chọn?</p>
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
        <FormED editedPatient={editedPatient} submitEdit={submitEdit} />
      </Dialog>

      {/* Dialog patient records */}
      <Dialog title={"Lịch sử khám bệnh"} attr={attr2}>
        <PatientRecord patientRecords={patientRecords} />
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
        <p className="text-center"></p>
      </div>

      <div className="h table w-full overflow-y-auto">
        {currentDens.map((patient,index) => (
          <Patient
            key={index}
            patient={patient}
            index={index + 1}
            handleCheck={handleCheck}
            selected={selectedPatients.includes(patient.phone)}
            handlePopUpEdit={handlePopUpEdit}
            handlePopUpPatientRecords={handlePopUpPatientRecords}
          />
        ))}
        <div className="pagination__wrapper">
          <Pagination
            totalItems={patients.flat().length}
            itemsPerPage={PATIENTS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Fragment>
  );
};
