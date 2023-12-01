import LoginForm from "../features/authentication/LoginForm";
import Footer from "../ui/Footer";

function Login() {
  return (
    <div className="container-2xl flex h-screen  items-center  bg-neutral-200">
      <div className=" mx-auto flex flex-col items-center justify-center ">
        <LoginForm />
        <Footer />
      </div>
    </div>
  );
}

export default Login;
