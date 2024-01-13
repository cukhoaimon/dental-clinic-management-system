import { useForm } from "react-hook-form";

function BookingForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <form
        className="flex  flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="date"
          id="date"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Ngày khám"
          required="true"
          {...register("date", { required: true })}
        />
        <input
          type="time"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Giờ khám"
          required="true"
          {...register("time", { required: true })}
        />
        <input
          type="text"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Nha sĩ"
          required="true"
          {...register("dentist", { required: true })}
        />
        <button className="h-[45px] w-[300px] rounded-[10px] bg-emerald-400 shadow hover:opacity-90">
          <span className=" text-center text-base font-medium   text-cyan-900">
            Xác nhận
          </span>
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
