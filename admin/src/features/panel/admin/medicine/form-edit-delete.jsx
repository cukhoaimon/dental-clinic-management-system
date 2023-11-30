import { useState, useLayoutEffect } from "react";
/* eslint-disable react/prop-types */

export default function FormED({ editedMedicine }) {
  
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
      <form>
        <div>
          <label htmlFor="name" className="block">
            Tên thuốc
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className=" border-2"
            value={formValues.name}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="usage" className="block">
            Chỉ định
          </label>
          <input
            id="usage"
            type="text"
            name="usage"
            className=" border-2"
            value={formValues.usage}
            onChange={(e)=>handleChange(e)}
          />
        </div>
      </form>
    </>
  );
}
