import Footer from "../../ui/Footer";

function SignupForm() {
  // Todo
  return (
    <div className="container-2xl flex h-screen items-center bg-neutral-200">
      <div className=" mx-auto flex flex-col items-center justify-center ">
        <div className=" mb-10 text-center text-[64px] font-medium leading-tight text-cyan-900">
          Đăng kí tài khoản
        </div>
        <form className="flex  flex-col items-center gap-6">
          <input
            type="phone"
            id="phone"
            className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
            placeholder="Số điện thoại"
            required="true"
          />
          <input
            type="password"
            id="password"
            className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
            placeholder="Mật khẩu"
            required="true"
          />
          <input
            type="text"
            id="name"
            className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
            placeholder="Họ và tên"
            required="true"
          />
          <input
            type="date"
            id="dob"
            className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
            placeholder="Ngày tháng năm sinh"
            required="true"
          />
          <input
            type="text"
            id="address"
            className="h-[45px] w-[300px] rounded-[10px] bg-cyan-900 p-5 text-white"
            placeholder="Địa chỉ"
            required="true"
          />
          <button className="h-[45px] w-[300px] rounded-[10px] bg-emerald-400 shadow hover:opacity-90">
            <span className=" text-center text-base font-medium   text-cyan-900">
              Đăng kí
            </span>
          </button>
        </form>
        <a
          href="/"
          className="mt-5 text-base font-medium text-green-700 hover:opacity-90 "
        >
          &larr; Quay về đăng nhập
        </a>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
