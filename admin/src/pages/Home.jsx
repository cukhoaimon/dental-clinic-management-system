import { Outlet, useLocation, Navigate } from "react-router-dom";

function Home() {
  // Get current location
  const location = useLocation();
  const regexBillPattern = /^\/employee\/bills\/\d+$/;
  const regexMedicalExaminationPattern = /^\/dentist\/examinations\/\d+$/;

  // TODO: handle role here
  const role = localStorage.getItem("role");
  if (!role) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
      {role === "QUAN_TRI_VIEN" && <Navigate to="/admin" />}
      {role === "NHA_SI" && regexMedicalExaminationPattern.test(location.pathname) && <Navigate to={location.pathname} />}
      {role === "NHA_SI" && !regexMedicalExaminationPattern.test(location.pathname) && <Navigate to="/dentist" />}
      {role === "NHAN_VIEN" && regexBillPattern.test(location.pathname) && <Navigate to={location.pathname} />}
      {role === "NHAN_VIEN" && !regexBillPattern.test(location.pathname) && <Navigate to="/employee" />}
    </>
  );
}

export default Home;
