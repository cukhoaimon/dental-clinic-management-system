import formatDate from "../../../../utils/formatDate";
/* eslint-disable react/prop-types */
export const Schedule = ({
  schedule: { MA_LICH_HEN: id, TEN_BENH_NHAN: name, NGAY_DANG_KI: enrollDate, NGAY_HEN: appointmentDate },
  
  // schedule,
  selected,
  handleCheck,
  handlePopUpEdit,
}) => {
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
        <p onClick={(e)=>e.stopPropagation()} className="text-center text-2xl text-green-500"><a href="">➜</a></p>
        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
