import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div
      className="container-2xl flex flex-col items-center justify-between bg-neutral-200"
      style={{ flex: 1 }}
    >
      <div className="flex flex-1 items-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
