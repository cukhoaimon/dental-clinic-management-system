import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  // Todo
  return (
    <div>
      <div className=" mb-7 text-center text-[64px] font-medium leading-tight text-cyan-900">
        Đăng nhập
      </div>
      <div className=" mb-10 text-center text-base font-normal text-cyan-900">
        Trở thành người đẹp trai nhất vũ trụ bằng việc đi khám răng nào!
      </div>
      <form
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
          className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
          placeholder="Mật khẩu"
          required="true"
          {...register("password", { required: true })}
        />
        <div className="flex w-[300px] justify-around ">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-[18px] w-[18px] cursor-pointer rounded-[5px] bg-cyan-900 accent-cyan-900"
            />
            <div className="text-sm font-medium text-cyan-900">Ghi nhớ</div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-cyan-900 hover:underline"
          >
            Quên mật khẩu?
          </a>
        </div>
        <button className="h-[45px] w-[300px] rounded-[10px] bg-emerald-400 shadow hover:opacity-90">
          <span className=" text-center text-base font-medium   text-cyan-900">
            Đăng nhập
          </span>
        </button>
      </form>
      <div className="mt-5 text-center">
        <span className=" text-sm font-medium text-cyan-900">
          Chưa có tài khoản?{" "}
          <Link
            to="/signup"
            className=" text-sm font-medium text-green-700 hover:underline"
          >
            Đăng kí ngay!
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
