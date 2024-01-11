import { useState, useLayoutEffect } from "react";
/* eslint-disable react/prop-types */

export default function FormED({ editedBill, submitEdit }) {
  const defaultFormValues = {
    status: false,
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formState, setFormState] = useState(null);


  useLayoutEffect(() => {
    if (editedBill) {
      setFormValues(editedBill);
    } else {
      setFormValues(defaultFormValues);
    }

    setFormState(null);
    return () => {
      setFormValues(editedBill);
    };
  }, [editedBill]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const boolValue = value === "true" ? true : false;

    setFormValues((prev) => ({
      ...prev,
      [name]: boolValue,
    }));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitEdit?.(formValues, formState);
          setFormValues(defaultFormValues);
        }}
        className="min-w-[300px]"
      >
        <div className="form-group">
          <label htmlFor="status">Trạng thái</label>
          <select onChange={handleChange} name="status" value={formValues.status} disabled={formState !== "edit"}>
            <option value="false">Chưa thanh toán</option>
            <option value="true">Đã thanh toán</option>
          </select>
        </div>
        {/* Button */}
        <div className="inline-flex w-full flex-row justify-end pt-4">
          {formState === null && (
            <>
              <button className="btn" onClick={() => setFormState("edit")}>
                Sửa
              </button>
            </>
          )}
          {formState === "edit" && (
            <>
              <button
                className="btn ml-2"
                onClick={() => {
                  setFormState(null);
                  setFormValues(editedBill);
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
