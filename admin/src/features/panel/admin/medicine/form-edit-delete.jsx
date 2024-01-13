import { useState, useLayoutEffect } from "react";
// import formatDate from "../../../../utils/formatDate";

/* eslint-disable react/prop-types */
export default function FormED({ editedMedicine, submitEdit }) {
  const defaultFormValues = {
    TEN_THUOC: "",
    CHI_DINH: "",
    GIA: "",
    DON_VI_TINH: "",
    NGAY_HET_HAN: "",
    SO_LUONG_TON_KHO: "",
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
    if (!formValues.TEN_THUOC) {
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
            name="TEN_THUOC"
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.TEN_THUOC}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="usage">Chỉ định</label>
          <input
            id="usage"
            type="text"
            name="CHI_DINH"
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.CHI_DINH}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá (VNĐ)</label>
          <input
            id="price"
            type="text"
            name="GIA"
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.GIA}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Đơn vị tính</label>
          <input
            id="unit"
            type="text"
            name="DON_VI_TINH"
            disabled={formState !== "edit"}
            className="input-field"
            value={formValues.DON_VI_TINH}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDay">Ngày hết hạn</label>
          <input
            id="expDay"
            type="text"
            name="NGAY_HET_HAN"
            disabled={formState !== "edit"}
            className="input-field"
            value={formValues.NGAY_HET_HAN}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDay">Số lượng tồn kho</label>
          <input
            id="inventoryQuantity"
            type="text"
            name="SO_LUONG_TON_KHO"
            disabled={formState !== "edit"}
            className="input-field"
            value={formValues.SO_LUONG_TON_KHO}
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
