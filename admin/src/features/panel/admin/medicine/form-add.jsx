import { useState } from "react";

/* eslint-disable react/prop-types */
export default function FormAdd({ submitAdd }) {
  const defaultFormValues = {
    name: "",
    usage: "",
    price: "",
    unit: "",
    expDay: "",
    inventoryQuantity: "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);

  // useLayoutEffect(() => {
  //   setFormValues(defaultFormValues);
  //   return () => {
  //     setFormValues(defaultFormValues);
  //   };
  // }, []);

  const checkValid = () => {
    if (!formValues.name || !formValues.usage || !formValues.price || !formValues.unit || !formValues.expDay || !formValues.inventoryQuantity) {
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
        <div className="form-group">
          <label htmlFor="price">Giá (VNĐ)</label>
          <input
            id="price"
            type="text"
            name="price"
            className=" input-field"
            value={formValues.price}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Đơn vị tính</label>
          <input
            id="unit"
            type="text"
            name="unit"
            className="input-field"
            value={formValues.unit}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDay">Ngày hết hạn</label>
          <input
            id="expDay"
            type="text"
            name="expDay"
            className="input-field"
            value={formValues.expDay}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDay">Số lượng tồn kho</label>
          <input
            id="inventoryQuantity"
            type="text"
            name="inventoryQuantity"
            className="input-field"
            value={formValues.inventoryQuantity}
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
