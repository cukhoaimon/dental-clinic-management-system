import { useState, useLayoutEffect } from "react";
/* eslint-disable react/prop-types */

export default function FormED({ editedMedicine, submitEdit }) {
  const defaultFormValues = {
    name: "",
    usage: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  useLayoutEffect(() => {
    if (editedMedicine) {
      setFormValues(editedMedicine);
    } else {
      setFormValues(defaultFormValues);
    }

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
          e.preventDefault()
          submitEdit?.(formValues);
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
            className=" input-field"
            value={formValues.usage}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="pt-4 inline-flex items-end w-full flex-col">
          <button type="submit" className="btn">Lưu</button>
        </div>
      </form>
    </>
  );
}
