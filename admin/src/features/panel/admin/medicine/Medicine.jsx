// import { useState } from "react";
// import Dialog from "../../../common/Dialog";
// import FormED from "./form-edit-delete";

// import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const Medicine = ({
  // medicine: { id, name, usage, price, unit, expDay, inventoryQuantity },
  medicine,
  selected,
  handleCheck,
  handlePopUpEdit
}) => {
  // const [openDialog, setOpenDialog] = useState(false);
  // const attr = useProcessDialog({
  //   id: "Thuốc",
  //   title: "Thuốc",
  //   triggerValue: openDialog,
  //   onClose: () => {
  //     // seteditMed(null);
  //     setOpenDialog(false);
  //   },
  // });

  // const { editMed, seteditMed } = useState(null);
  return (
    <>
      {/* {openDialog && (
        <Dialog key={medicine.id} title={"Thuốc"} attr={attr}>
          <FormED key={medicine.id} medicine={medicine} />
          
        </Dialog>
      )} */}
      {/* <Dialog key={medicine.id} title={"Thuốc"} attr={attr}>
        <FormED key={medicine.id} medicine={medicine} />
      </Dialog> */}
      <div
        className="medicine flex h-20 w-full items-center border-b-[1px] border-black bg-white px-4 py-10"
        // onClick={() => {
        //   // seteditMed(medicine);
        //   setOpenDialog(true);
        // }}
        onClick={() => handlePopUpEdit(medicine?.id)}
      >
        <input
          onChange={() => handleCheck(medicine.id)}
          onClick={(e) => e.stopPropagation()}
          checked={selected}
          className="h-6 w-6 cursor-pointer"
          type="checkbox"
          name="all"
        />
        <p className="w-[10%] text-center">{medicine.id}</p>
        <p className="w-1/5 text-left">{medicine.name}</p>
        <p className="w-1/5 text-left">{medicine.usage}</p>
        <p className="w-1/6 text-center">{medicine.price}</p>
        <p className="w-[10%] text-center">{medicine.unit}</p>
        <p className="w-1/6 text-center">{medicine.expDay}</p>
        <p className="w-[10%] text-center">{medicine.inventoryQuantity}</p>
      </div>
    </>
  );
};
