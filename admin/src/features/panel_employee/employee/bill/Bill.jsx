/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import formatDate from "../../../../utils/formatDate";

export const Bill = ({
  schedule: {
    MA_LAN_KHAM: id,
    TEN_BENH_NHAN: name,
    TONG_TIEN: totalPrice,
    NGAY_KHAM: dentalVisitDate,
    TRANG_THAI: status,
  },

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
        <p className="w-1/5 text-left">{name}</p>
        <p className="w-1/8 text-center">{formatDate(dentalVisitDate)}</p>
        <p className="w-1/5 text-center">{totalPrice ? totalPrice : 0}</p>
        <p className={"w-1/5 text-center " + statusColor}>
          {status === true ? "Đã thanh toán" : "Chưa thanh toán"}
        </p>
        {status === true ? (
          <p
            onClick={(e) => e.stopPropagation()}
            className="mx-auto text-center text-2xl text-green-500"
          >
            <Link
              to={{ pathname: `/employee/bills/${id}`, state: { state: 1 } }}
            >
              ➜
            </Link>
          </p>
        ) : (
          <p
            onClick={(e) => e.stopPropagation()}
            className="btn !hover:bg-green-500 !bg-green-300"
          >
            <Link
              to={{ pathname: `/employee/bills/${id}`, state: { state: 0 } }}
            >
              Thanh toán
            </Link>
          </p>
        )}

        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
