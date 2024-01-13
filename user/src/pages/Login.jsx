import LoginForm from "../features/authentication/LoginForm";
import Footer from "../ui/Footer";

function Login() {
  return (
    <div className="container-2xl bg-neutral-200 ">
      <div className="flex h-screen flex-col items-center justify-between">
        <div className="flex grow items-center ">
          <LoginForm />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
