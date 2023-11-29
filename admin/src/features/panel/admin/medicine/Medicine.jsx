import { useState } from "react";
import Dialog from "../../../common/Dialog";
import FormED from "./form-edit-delete";

import useProcessDialog from "../../../../hooks/useProcessDialog";

/* eslint-disable react/prop-types */
export const Medicine = ({
  medicine: { id, name, usage, price, unit, expDay, inventoryQuantity },
  selected,
  handleCheck,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const attr = useProcessDialog({
    id: "Thuốc",
    title: "Thuốc",
    triggerValue: openDialog,
    onClose: () => {
      setOpenDialog(false);
    },
  });

  return (
    <>
      <Dialog title={"Thuốc"} attr={attr}>
        <FormED/>
      </Dialog>
      <div
        className="medicine flex h-20 w-full items-center border-b-[1px] border-black bg-white px-4 py-10"
        onClick={() => setOpenDialog(true)}
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
        <p className="w-1/6 text-center">{expDay}</p>
        <p className="w-[10%] text-center">{inventoryQuantity}</p>
      </div>
    </>
  );
};
