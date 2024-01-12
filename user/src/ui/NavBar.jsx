import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    name: "Trang Chủ",
  },
  {
    path: "/about",
    name: "Về chúng tôi",
  },
  {
    path: "/services",
    name: "Dịch vụ",
  },
  {
    path: "/doctors",
    name: "Bác sĩ",
  },
];

export default function NavBar() {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "green",
        color: "white",
        padding: "0.5rem",
        textTransform: "uppercase",
      }}
    >
      {routes.map((route, i) => (
        <Link to={route.path} key={i}>
          <Typography
            variant="button"
            sx={{
              fontWeight: "bold",
            }}
          >
            {route.name}
          </Typography>
        </Link>
      ))}
    </Paper>
  );
}
