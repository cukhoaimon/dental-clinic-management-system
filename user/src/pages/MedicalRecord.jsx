import Record from "../features/record/Record";
import Header from "../ui/Header";
import { getAllMedicalRecords } from "../services/apiMedicalRecord";
import { useEffect, useState } from "react";

function MedicalRecord() {
  const [records, setRecords] = useState([]);
  const id = localStorage.getItem("id");
  console.log(id);
  useEffect(() => {
    const fetchRecords = async () => {
      const res = await getAllMedicalRecords(id).then((res) => res.output);
      setRecords(res);
      console.log(res);
    };
    fetchRecords();
  }, []);
  return (
    <div className="container-2xl bg-neutral-200" style={{ flex: 1 }}>
      <div className="flex flex-col items-center justify-between">
        <Header />
        <div className="font-['Lexend Deca'] m-4 self-start text-4xl font-normal text-black">
          Bệnh án
        </div>
        {records.length != 0 && <Record records={records} />}
      </div>
    </div>
  );
}

export default MedicalRecord;
