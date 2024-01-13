import { Outlet, useLocation, Navigate } from "react-router-dom";

function Home() {
  // Get current location
  const location = useLocation();
  const regexPattern = /^\/employee\/bills\/\d+$/;

  // TODO: handle role here
  const role = localStorage.getItem("role");
  if (!role) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
      {role === "QUAN_TRI_VIEN" && <Navigate to="/admin" />}
      {role === "NHA_SI" && <Navigate to="/dentist" />}
      {role === "NHAN_VIEN" && regexPattern.test(location.pathname) && <Navigate to={location.pathname} />}
      {role === "NHAN_VIEN" && <Navigate to="/employee" />}
    </>
  );
}

export default Home;
