import SignupForm from "../features/authentication/SignupForm";
import Footer from "../ui/Footer";

function SignUp() {
  return (
    <div className="container-2xl bg-neutral-200 ">
      <div className="flex h-screen flex-col items-center justify-between">
        <div className="flex grow items-center ">
          <SignupForm />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SignUp;
