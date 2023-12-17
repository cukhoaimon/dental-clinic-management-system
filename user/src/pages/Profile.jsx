import { useState } from "react";
import UpdateForm from "../features/userProfile/UpdateForm";
import UserProfile from "../features/userProfile/UserProfile";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Profile() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "Me may beoooooooooooo",
    dob: "01/01/1997",
    address: "co me may beo ayyyyyyyy",
    phone: "0123456789",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-2xl bg-neutral-200 ">
      <div className="flex h-screen flex-col items-center justify-between">
        <Header />
        <div className="font-['Lexend Deca'] m-4 self-start text-4xl font-normal text-black">
          Thông tin cá nhân
        </div>
        <div className="flex w-screen grow items-center justify-center gap-52">
          <div className="border border-black  p-10">
            <UserProfile
              name={data.name}
              dob={data.dob}
              address={data.address}
              phone={data.phone}
              onClick={handleClickOpen}
            />
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
            <DialogContent>
              <UpdateForm updateData={setData} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Huỷ</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
