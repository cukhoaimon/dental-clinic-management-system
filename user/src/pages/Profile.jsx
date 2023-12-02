import UpdateForm from "../features/userProfile/UpdateForm";
import UserProfile from "../features/userProfile/UserProfile";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function Profile() {
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
              name="Me may beoooooooooooo"
              dob="01/01/1997"
              address="co me may beo ayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
              phone="0123123123"
            />
          </div>
          <UpdateForm />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
