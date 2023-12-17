/* eslint-disable react/prop-types */
export const Patient = ({
  patient: { name, dob, phone, address },
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
        <p className="w-1/8 text-left">{dob}</p>
        <p className="w-1/6 text-center">{phone}</p>
        <p className="w-[30%] text-center">{address}</p>
        <p onClick={(e)=>{e.stopPropagation(); handlePopUpPatientRecords()}} className="cursor-pointer text-center text-2xl text-green-500">➜</p>
        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
