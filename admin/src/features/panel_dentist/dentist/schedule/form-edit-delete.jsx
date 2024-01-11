import { useState, useLayoutEffect } from "react";
/* eslint-disable react/prop-types */

export default function FormED({ editedSchedule, submitEdit }) {
  const defaultFormValues = {
    name: "",
    enrollDate: "",
    appointmentDate: "",
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formState, setFormState] = useState(null);
  const [valid, setValid] = useState(true);

  useLayoutEffect(() => {
    if (editedSchedule) {
      setFormValues(editedSchedule);
    } else {
      setFormValues(defaultFormValues);
    }

    setFormState(null);
    return () => {
      setFormValues(editedSchedule);
    };
  }, [editedSchedule]);

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
          <label htmlFor="name">Họ và tên</label>
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
          <label htmlFor="enrollDate">Ngày đăng ký</label>
          <input
            id="enrollDate"
            type="text"
            name="enrollDate"
            disabled={formState !== "edit"}
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
            disabled={formState !== "edit"}
            className=" input-field"
            value={formValues.appointmentDate}
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
                  setFormValues(editedSchedule);
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
