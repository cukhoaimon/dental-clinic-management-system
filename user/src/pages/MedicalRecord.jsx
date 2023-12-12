import Record from "../features/record/Record";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function MedicalRecord() {
  return (
    <div className="container-2xl bg-neutral-200 ">
      <div className="flex h-screen flex-col items-center justify-between">
        <Header />
        <div className="font-['Lexend Deca'] m-4 self-start text-4xl font-normal text-black">
          Bệnh án
        </div>
        <div className="flex w-screen grow items-center justify-center gap-52">
          <Record />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MedicalRecord;
