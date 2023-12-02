import { useState, useLayoutEffect } from "react";
/* eslint-disable react/prop-types */

export default function FormED({ editedMedicine, submitEdit }) {
  const defaultFormValues = {
    name: "",
    usage: "",
    price: "",
    unit: "",
    expDay: "",
    inventoryQuantity: "",
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formState, setFormState] = useState(null);
  const [valid, setValid] = useState(true);

  useLayoutEffect(() => {
    if (editedMedicine) {
      setFormValues(editedMedicine);
    } else {
      setFormValues(defaultFormValues);
    }

    setFormState(null);
    return () => {
      setFormValues(editedMedicine);
    };
  }, [editedMedicine]);

  const checkValid = () => {
    if (!formValues.name || !formValues.usage) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!checkValid()) {
            setValid(false);
            return;
          } else setValid(true);
          submitEdit?.(formValues, formState);
          setFormValues(defaultFormValues);
        }}
        className="min-w-[300px]"
      >
        <div className="form-group">
          <label htmlFor="name">Tên thuốc</label>
          <input
            id="name"
            type="text"
            name="name"
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="usage">Chỉ định</label>
          <input
            id="usage"
            type="text"
            name="usage"
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.usage}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá (VNĐ)</label>
          <input
            id="price"
            type="text"
            name="price"
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.price}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Đơn vị tính</label>
          <input
            id="unit"
            type="text"
            name="unit"
            disabled={formState !== "edit"}
            className="input-field"
            value={formValues.unit}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDay">Ngày hết hạn</label>
          <input
            id="expDay"
            type="text"
            name="expDay"
            disabled={formState !== "edit"}
            className="input-field"
            value={formValues.expDay}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDay">Số lượng tồn kho</label>
          <input
            id="inventoryQuantity"
            type="text"
            name="inventoryQuantity"
            disabled={formState !== "edit"}
            className="input-field"
            value={formValues.inventoryQuantity}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {!valid && (
          <p className="text-red-500">Vui lòng điền đầy đủ thông tin</p>
        )}
        {/* Button */}
        <div className="inline-flex w-full flex-row justify-end pt-4">
          {formState === null && (
            <>
              <button className="btn" onClick={() => setFormState("edit")}>
                Sửa
              </button>
              <button
                className="btn ml-2"
                onClick={() => setFormState("delete")}
              >
                Xoá
              </button>
            </>
          )}
          {formState === "edit" && (
            <>
              <button
                className="btn ml-2"
                onClick={() => {
                  setFormState(null);
                  setFormValues(editedMedicine);
                }}
              >
                Huỷ
              </button>
              <button type="submit" className="btn ml-2">
                Lưu
              </button>
            </>
          )}
          {formState === "delete" && (
            <>
              <button
                className="btn ml-2"
                onClick={() => {
                  setFormState(null);
                }}
              >
                Huỷ
              </button>
              <button type="submit" className="btn-delete ml-2">
                Xoá
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
