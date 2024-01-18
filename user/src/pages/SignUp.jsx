import SignupForm from "../features/authentication/SignupForm";

function SignUp() {
  return (
    <div
      className="container-2xl flex flex-col items-center justify-between bg-neutral-200"
      style={{ flex: 1 }}
    >
      <div className="flex grow items-center ">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUp;
