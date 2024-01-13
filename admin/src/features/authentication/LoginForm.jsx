import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(watch("phone")); // watch input value by passing the name of it

  return (
    <>
      {/* <h1>Login Form</h1> */}
      <section className="w-screen">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-cyan-900">
                Đăng nhập
              </h1>
              <form
                className="space-y-4 md:space-y-6 "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-cyan-900 "
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-cyan-900 p-2.5 text-sky-300 sm:text-sm"
                    {...register("phone", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-cyan-900"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    {...register("password", { required: true })}
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-cyan-900 p-2.5 text-sky-300 sm:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-cyan-900 bg-cyan-900 accent-cyan-900"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-cyan-900">
                        Ghi nhớ đăng nhập
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-cyan-900 hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type="submit"
                  className="focus:ring-primary-300 w-full rounded-lg bg-sky-300 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-4"
                  // className=""
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;
