/* eslint-disable react/prop-types */
import formatDate from "../../../../utils/formatDate";

export const Schedule = ({
  schedule: { MA_LICH_HEN: id, TEN_BENH_NHAN: name, NGAY_DANG_KI: enrollDate, NGAY_HEN: appointmentDate, TRANG_THAI: status },
  
  // schedule,
  selected,
  handleCheck,
  handlePopUpEdit,
}) => {
  const statusColor = status ? "text-green-500" : "text-red-500";
  return (
    <>
      <div
        className="schedule flex h-20 w-full items-center border-b-[1px] border-black bg-white px-4 py-10"
        onClick={() => handlePopUpEdit(id)}
      >
        <input
          onChange={() => handleCheck(id)}
          onClick={(e) => e.stopPropagation()}
          checked={selected}
          className="h-6 w-6 cursor-pointer"
          type="checkbox"
          name="all"
        />
        <p className="w-[15%] text-center">{id}</p>
        <p className="w-1/3 text-left">{name}</p>
        <p className="w-1/5 text-center">{formatDate(enrollDate)}</p>
        <p className="w-1/5 text-center">{formatDate(appointmentDate)}</p>
        <p className={"text-center " + statusColor}>{status ? "Đã duyệt" : "Chưa duyệt"}</p>
        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
