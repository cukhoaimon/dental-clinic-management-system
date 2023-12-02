import { useLayoutEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function FormAdd() {
  const defaultFormValues = {
    name: "",
    usage: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  
  useLayoutEffect(() => {
    setFormValues(defaultFormValues);
    return () => {
        setFormValues(defaultFormValues);
      };
  },[])

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
          // submitAdd(formValues)
          console.log(formValues)
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
        <div className="inline-flex w-full flex-row justify-end pt-4">
          <button className="btn ml-2">Thêm</button>
        </div>
      </form>
    </>
  );
}
