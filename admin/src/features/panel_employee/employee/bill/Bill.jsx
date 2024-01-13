/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Bill = ({
  schedule: { id, name, dentalVisitDate, status },
  
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
        <p className="w-1/5 text-center">{dentalVisitDate}</p>
        <p className={"w-1/5 text-center " + statusColor}>{status === true ? "Đã thanh toán" : "Chưa thanh toán"}</p>
        <p onClick={(e)=>e.stopPropagation()} className="text-center text-2xl text-green-500"><Link to={`/employee/bills/${id[id.length - 1]}`}>➜</Link></p>
        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
