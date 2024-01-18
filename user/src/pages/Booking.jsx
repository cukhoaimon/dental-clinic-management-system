import BookingForm from "../features/bookClinic/BookingForm";

function Booking() {
  return (
    <div
      className="container-2xl flex flex-col bg-neutral-200 "
      style={{ flex: 1 }}
    >
      {/* <Header /> */}
      <div className="font-['Lexend Deca'] m-4 self-start text-4xl font-normal text-black">
        Đặt lịch hẹn
      </div>
      <div className="flex w-screen grow items-center justify-center gap-52">
        <BookingForm />
      </div>
    </div>
  );
}

export default Booking;
