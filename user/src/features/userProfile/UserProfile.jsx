function UserProfile({ name, dob, address, phone, onClick }) {
  return (
    <div className="infomation">
      <div className="mb-10 flex gap-10">
        <span className="w-40  text-xl font-medium text-black">
          Họ và tên:{" "}
        </span>
        <p className="text-xl">{name}</p>
      </div>
      <div className="mb-10 flex gap-10">
        <span className="w-40 text-xl  font-medium text-black">Ngày sinh:</span>
        <p className="text-xl">{dob}</p>
      </div>
      <div className="mb-10 flex gap-10">
        <span className="w-40 text-xl  font-medium text-black">Địa chỉ: </span>
        <p className="text-xl">{address}</p>
      </div>
      <div className="mb-10 flex gap-10">
        <span className="w-40 text-xl font-medium text-black">
          Số điện thoại:
        </span>
        <p className="text-xl">{phone}</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onClick}
          className="h-[45px] w-[300px] rounded-[10px] bg-emerald-400 shadow hover:opacity-90"
        >
          <span className=" text-center text-base font-medium   text-cyan-900">
            Cập nhật
          </span>
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
