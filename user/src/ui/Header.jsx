import CallIcon from "@mui/icons-material/Call";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button } from "@mui/material";

function Header() {
  return (
    <div className="font-['Lexend Deca'] flex w-screen flex-row justify-between bg-emerald-400 p-4 ">
      <div className="text-4xl font-medium">Phòng khám nha khoa US</div>
      <div className="row flex">
        <CallIcon />
        <div>(+84) 123 456 789</div>
      </div>
      <Button
        sx={{ border: "circle", color: "black", backgroundColor: "lightBlue" }}
      >
        <CalendarMonthIcon />
        <div>Đặt lịch ngay</div>
      </Button>
    </div>
  );
}

export default Header;
