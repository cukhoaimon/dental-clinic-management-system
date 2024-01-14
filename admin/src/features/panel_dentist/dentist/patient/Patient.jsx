/* eslint-disable react/prop-types */
import formatDate from "../../../../utils/formatDate";

export const Patient = ({
  patient: { HO_TEN: name, NGAY_SINH: dob, SDT: phone, DIA_CHI: address },
  index,
  // patient,
  selected,
  handleCheck,
  handlePopUpEdit,
  handlePopUpPatientRecords,
}) => {
  return (
    <>
      <div
        className="patient flex h-20 w-full items-center border-b-[1px] border-black bg-white px-4 py-10"
        onClick={() => handlePopUpEdit(phone)}
      >
        <input
          onChange={() => handleCheck(phone)}
          onClick={(e) => e.stopPropagation()}
          checked={selected}
          className="h-6 w-6 cursor-pointer"
          type="checkbox"
          name="all"
        />
        <p className="w-[15%] text-center">{index}</p>
        <p className="w-1/5 text-left">BS. {name}</p>
        <p className="w-1/8 text-left">{formatDate(dob)}</p>
        <p className="w-1/6 text-center">{phone}</p>
        <p className="w-[30%] text-center">{address}</p>
        <p onClick={(e)=>{e.stopPropagation(); handlePopUpPatientRecords(phone)}} className="cursor-pointer text-center text-2xl text-green-500">➜</p>
        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
