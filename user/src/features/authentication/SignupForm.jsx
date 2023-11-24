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
          <svg
            width="1280"
            height="111"
            viewBox="0 0 1280 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute "
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 44.4L42.6667 53.28C85.3333 62.16 170.667 79.92 256 75.48C341.333 71.04 426.667 44.4 512 26.64C597.333 8.88 682.667 0 768 0C853.333 0 938.667 8.88 1024 24.42C1109.33 39.96 1194.67 62.16 1237.33 73.26L1280 84.36V111H1237.33C1194.67 111 1109.33 111 1024 111C938.667 111 853.333 111 768 111C682.667 111 597.333 111 512 111C426.667 111 341.333 111 256 111C170.667 111 85.3333 111 42.6667 111H0V44.4Z"
              fill="#224957"
              fillOpacity="0.8"
            />
          </svg>
          <svg
            width="1280"
            height="111"
            viewBox="0 0 1280 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0L53 4.17052C107 8.34104 213 16.6821 320 30.7977C427 45.2341 533 65.7659 640 69.9364C747 74.1069 853 61.5954 960 57.7457C1067 53.5751 1173 57.7457 1227 59.6705L1280 61.5954V111H1227C1173 111 1067 111 960 111C853 111 747 111 640 111C533 111 427 111 320 111C213 111 107 111 53 111H0V0Z"
              fill="#20DF7F"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
