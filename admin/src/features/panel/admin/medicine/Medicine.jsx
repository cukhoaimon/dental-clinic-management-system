import formatDate, { isFormat } from "../../../../utils/formatDate";

/* eslint-disable react/prop-types */
export const Medicine = ({
  medicine: { MA_THUOC: id, TEN_THUOC: name, CHI_DINH: usage, GIA: price, DON_VI_TINH: unit,
    NGAY_HET_HAN: expDay, SO_LUONG_TON_KHO: inventoryQuantity },
  // medicine,
  selected,
  handleCheck,
  handlePopUpEdit,
}) => {
  return (
    <>
      <div
        className="medicine flex h-20 w-full items-center border-b-[1px] border-black bg-white px-4 py-10"
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
        <p className="w-[10%] text-center">{id}</p>
        <p className="w-1/5 text-left">{name}</p>
        <p className="w-1/5 text-left">{usage}</p>
        <p className="w-1/6 text-center">{price}</p>
        <p className="w-[10%] text-center">{unit}</p>
        <p className="w-1/6 text-center">{isFormat(expDay) ? expDay : formatDate(expDay)}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p>
      </div>
    </>
  );
};
