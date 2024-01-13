import CallIcon from "@mui/icons-material/Call";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Button } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f6fbf2",
      }}
    >
      <img src="logo.png" width={72} />
      <div className="flex flex-col">
        <span>
          <CallIcon /> Tổng đài 24/7
        </span>
        <div>(+84) 123 456 789</div>
      </div>
      <Button
        sx={{
          border: "circle",
          color: "white",
          backgroundColor: "green",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
      >
        <CalendarMonthIcon />
        <div>Đặt lịch ngay</div>
      </Button>
    </Box>
  );
}

export default Header;
