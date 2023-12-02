function UserProfile({ name, dob, address, phone }) {
  return (
    <div>
      <div className="infomation">
        <span>Họ và tên: </span>
        <p>{name}</p>
        <span>Ngày sinh:</span>
        <p>{dob}</p>
        <span>Địa chỉ: </span>
        <p>{address}</p>
        <span>Số điện thoại:</span>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default UserProfile;
