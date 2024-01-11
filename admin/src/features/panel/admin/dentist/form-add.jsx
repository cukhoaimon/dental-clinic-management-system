import { useState } from "react";

/* eslint-disable react/prop-types */
export default function FormAdd({ submitAdd }) {
  const defaultFormValues = {
    name: "",
    dob: "",
    phone: "",
    address: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  const checkValid = () => {
    if (!formValues.name || !formValues.dob || !formValues.phone || !formValues.address) {
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
          <label htmlFor="dob">Ngày sinh</label>
          <input
            id="dob"
            type="text"
            name="dob"
            className=" input-field"
            value={formValues.dob}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="text"
            name="phone"
            className=" input-field"
            value={formValues.phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            id="address"
            type="text"
            name="address"
            className="input-field"
            value={formValues.address}
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
