import { Fragment, useState, useMemo, useEffect } from "react";
import { Patient } from "./Patient";
import { Pagination } from "../../../common/Pagination";
import { PATIENTS_PER_PAGE } from "../../mocks/patients";
import Dialog from "../../../common/Dialog";
import useProcessDialog from "../../../../hooks/useProcessDialog";
import PatientRecord from "./patient-records";
import { getAllPatients, getPatientRecord } from "../../../../services/apiDentist";

/* eslint-disable react/prop-types */
export const PatientBoard = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentPatients = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
    const lastPageIndex = firstPageIndex + PATIENTS_PER_PAGE;
    return patients.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, patients]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(patients.map((patient) => patient.SDT));
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
    async function fetchData(){
      const res = await getAllPatients();
      setPatients(isLoaded ? patients : res.data);
      setIsLoaded(true);
    }
    fetchData();
  }, []);


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

    const handlePopUpPatientRecords = async (phone) => {
      const res = patients.find((patient) => patient.SDT === phone);

      const patientRecord = await getPatientRecord(res.SDT);

      setPatientRecords(patientRecord.data);
  
      setopenDialogPatientRecords(true);
    }



  return (
    <Fragment>

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
        {currentPatients.map((patient,index) => (
          <Patient
            key={patient.SDT}
            patient={patient}
            index={index + 1}
            handleCheck={handleCheck}
            selected={selectedPatients.includes(patient.SDT)}
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
