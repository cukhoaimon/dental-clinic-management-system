import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router";

function Home() {
  // TODO: handle role here
  const role = "admin";

  // Get current location
  const location = useLocation();
  const regexPattern = /^\/employee\/bills\/\d+$/;

  return (
    <>
      <Outlet />
      {role === "admin" && <Navigate to="/admin" />}
      {role === "dentist" && <Navigate to="/dentist" />}
      {role === "employee" && regexPattern.test(location.pathname) && <Navigate to={location.pathname} />}
      {role === "employee" && <Navigate to="/employee" />}
    </>
  );
}

export default Home;
