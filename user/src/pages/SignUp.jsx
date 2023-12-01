import SignupForm from "../features/authentication/SignupForm";
import Footer from "../ui/Footer";

function SignUp() {
  return (
    <div className="container-2xl flex h-screen items-center bg-neutral-200">
      <div className=" mx-auto flex flex-col items-center justify-center ">
        <SignupForm />
        <Footer />
      </div>
    </div>
  );
}

export default SignUp;
