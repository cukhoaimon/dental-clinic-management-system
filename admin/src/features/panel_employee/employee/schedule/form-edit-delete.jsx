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

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "status") {
      value = value === "true" ? true : false;
    }

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
          <label htmlFor="status">Trạng thái</label>
          <select onChange={handleChange} name="status" value={formValues.status} disabled={formState !== "edit"}>
            <option value="false">Chưa duyệt</option>
            <option value="true">Đã duyệt</option>
          </select>
        </div>
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
