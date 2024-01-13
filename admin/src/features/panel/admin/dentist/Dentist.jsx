/* eslint-disable react/prop-types */
export const Dentist = ({
  dentist: { name, dob, phone, address },
  index,
  // dentist,
  selected,
  handleCheck,
  handlePopUpEdit,
}) => {
  return (
    <>
      <div
        className="dentist flex h-20 w-full items-center border-b-[1px] border-black bg-white px-4 py-10"
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
        {/* <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p> */}
      </div>
    </>
  );
};
