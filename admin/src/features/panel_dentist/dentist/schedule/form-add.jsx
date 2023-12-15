import { useState } from "react";

/* eslint-disable react/prop-types */
export default function FormAdd({ submitAdd }) {
  const defaultFormValues = {
    name: "",
    enrollDate: "",
    appointmentDate: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  const checkValid = () => {
    if (!formValues.name || !formValues.enrollDate || !formValues.appointmentDate) {
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
          if (!checkValid()) return;
          submitAdd(formValues);
          // console.log(formValues)
          setFormValues(defaultFormValues);
        }}
        className="min-w-[300px]"
      >
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
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
          <label htmlFor="enrollDate">Ngày đăng ký</label>
          <input
            id="enrollDate"
            type="text"
            name="enrollDate"
            className=" input-field"
            value={formValues.enrollDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Ngày hẹn</label>
          <input
            id="appointmentDate"
            type="text"
            name="appointmentDate"
            className=" input-field"
            value={formValues.appointmentDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {checkValid() ? null : (
          <p className="text-red-500">Vui lòng điền đầy đủ thông tin</p>
        )}
        <div className="inline-flex w-full flex-row justify-end pt-4">
          <button
            className="btn ml-2"
            onClick={() => setFormValues(defaultFormValues)}
            type="button"
          >
            Huỷ
          </button>
          <button className="btn ml-2" type="submit">
            Thêm
          </button>
        </div>
      </form>
    </>
  );
}
