import { useState, useLayoutEffect } from "react";
/* eslint-disable react/prop-types */

export default function FormED({ editedMedicine, submitEdit }) {
  const defaultFormValues = {
    name: "",
    usage: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formState, setFormState] = useState(null);

  useLayoutEffect(() => {
    if (editedMedicine) {
      setFormValues(editedMedicine);
    } else {
      setFormValues(defaultFormValues);
    }
    setFormState(null);
    return () => {
      setFormValues(defaultFormValues);
    };
  }, [editedMedicine]);

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
          submitEdit?.(formValues, formState);
          setFormValues(defaultFormValues);
        }}
        className="min-w-[300px]"
      >
        <div className="form-group">
          <label htmlFor="name" className="block">
            Tên thuốc
          </label>
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
          <label htmlFor="usage" className="block">
            Chỉ định
          </label>
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
        <div className="inline-flex w-full flex-row justify-end pt-4">
          {formState === null && (
            <>
              <button className="btn" onClick={() => setFormState("edit")}>
                Sửa
              </button>
              <button className="btn ml-2" onClick={()=> setFormState("delete")}>Xoá</button>
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
