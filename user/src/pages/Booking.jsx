import BookingForm from "../features/bookClinic/BookingForm";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function Booking() {
  return (
    <div className="container-2xl bg-neutral-200 ">
      <div className="flex h-screen flex-col items-center justify-between">
        {/* <Header /> */}
        <div className="font-['Lexend Deca'] m-4 self-start text-4xl font-normal text-black">
          Đặt lịch hẹn
        </div>
        <div className="flex w-screen grow items-center justify-center gap-52">
          <BookingForm />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Booking;
