/* import { useForm } from "react-hook-form"; */
import { Link } from "react-router-dom";
function SignupForm() {
  /* const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data); */
  // Todo
  return (
    <div>
      <div className=" mb-10 text-center text-[64px] font-medium leading-tight text-cyan-900">
        Đăng kí tài khoản
      </div>
      <p className="text-center">
        Vui lòng liên hệ nhân viên để đăng kí tài khoản
      </p>
      {/* <form
        className="flex  flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="phone"
          id="phone"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Số điện thoại"
          required="true"
          {...register("phone", { required: true })}
        />
        <input
          type="password"
          id="password"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Mật khẩu"
          required="true"
          {...register("password", { required: true })}
        />
        <input
          type="text"
          id="name"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Họ và tên"
          required="true"
          {...register("name", { required: true })}
        />
        <input
          type="date"
          id="dob"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Ngày tháng năm sinh"
          required="true"
          {...register("dob", { required: true })}
        />
        <input
          type="text"
          id="address"
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Địa chỉ"
          required="true"
          {...register("address", { required: true })}
        />
        <button className="h-[45px] w-[300px] rounded-[10px] bg-emerald-400 shadow hover:opacity-90">
          <span className=" text-center text-base font-medium   text-cyan-900">
            Đăng kí
          </span>
        </button>
      </form> */}
      <div className="mt-5 text-center">
        <Link
          to="/login"
          className="text-base font-medium text-green-700 hover:opacity-90 "
        >
          &larr; Quay về đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
