import { useForm } from "react-hook-form";

function UpdateForm({ updateData }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => updateData(data);

  return (
    <form
      className="flex  flex-col items-center gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="name"
        className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
        placeholder="Họ và tên"
        required="true"
        {...register("name", { required: true })}
      />
      <input
        type="text"
        id="address"
        className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
        placeholder="Địa chỉ"
        required="true"
        {...register("address", { required: true })}
      />
      <input
        type="phone"
        id="phone"
        className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
        placeholder="Số điện thoại"
        required="true"
        {...register("phone", { required: true })}
      />
      <input
        type="date"
        id="dob"
        className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
        placeholder="Ngày tháng năm sinh"
        required="true"
        {...register("dob", { required: true })}
      />
      <button className="h-[45px] w-[300px] rounded-[10px] bg-emerald-400 shadow hover:opacity-90">
        <span className=" text-center text-base font-medium   text-cyan-900">
          Xác nhận
        </span>
      </button>
    </form>
  );
}

export default UpdateForm;
