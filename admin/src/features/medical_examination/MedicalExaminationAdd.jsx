// add a new medical examination
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { getAllMedicines } from "../../services/apiDentist";
import { getAllServices } from "../../services/apiService";
import { recordExamination } from "../../services/apiDentist";
import toast from "react-hot-toast";
import { Backdrop, CircularProgress } from "@mui/material";

const MedicalExamination = () => {
  const [customer, setCustomer] = useState("");

  const [date, setDate] = useState("");

  const [medicines, setMedicines] = useState([]);

  const [currentMedicines, setCurrentMedicines] = useState([]);

  const [newMedicines, setNewMedicines] = useState([]);

  const [services, setServices] = useState([]);

  const [currentServices, setCurrentServices] = useState([]);

  const [newServices, setNewServices] = useState([]);

  const [loading, setLoading] = useState(false);

  

  const handleAddMedicine = () => {
    // check if there is any medicine not selected
    const isExist = newMedicines.find(
      (medicine) => medicine.MA_THUOC === undefined,
    );

    if (isExist) {
      toast.error("Vui lòng chọn thuốc trước khi thêm mới");
      return;
    }

    setNewMedicines((prev) => {
      return [
        ...prev,
        {
          MA_THUOC: undefined,
          quantity: 0,
        },
      ];
    });
  };

  const handleAddService = () => {
    const isExist = newServices.find(
      (service) => service.MA_DICH_VU === undefined,
    );

    if (isExist) {
      toast.error("Vui lòng chọn dịch vụ trước khi thêm mới");
      return;
    }

    setNewServices((prev) => {
      return [
        ...prev,
        {
          MA_DICH_VU: undefined,
        },
      ];
    });
  };

  const handleCheckValidNewMedicines = () => {
    const isExist = newMedicines.find(
      (medicine) => medicine.MA_THUOC === undefined,
    );

    if (isExist) {
      toast.error("Vui lòng chọn thuốc trước khi lưu");
      return false;
    }

    const isQuantityValid = newMedicines.find(
      (medicine) => medicine.quantity === 0,
    );

    if (isQuantityValid) {
      toast.error("Vui lòng nhập số lượng thuốc trước khi lưu");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      // get all medicines
      let res = await getAllMedicines();
      setMedicines(res.data);

      // get all services
      let services = await getAllServices();
      setServices(services.data);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!handleCheckValidNewMedicines()) {
      return;
    }

    // Anh Khang sửa ở đây
    const formValue = {
      customer,
      examinationDate: date,
      dentist: localStorage.getItem("phone"),
      medicines: newMedicines,
      services: newServices,
    }
    console.log(formValue);
    
    
      setLoading(true);
      await recordExamination(formValue)
        .then((res) => {
          if (res.message === "Thành công") {
            toast.success("Thêm thành công");
          } else {
            toast.error(res.message);
          }
  
          // console.log('res',res);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Thêm thất bại");
        })
        .finally(() => setLoading(false));  
  


    ///
    // toast.success("Lưu thành công");

    // setTimeout(window.location.reload(), 4000);
  };

  return (
    <div className="px-40 py-10">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mb-10 text-5xl font-bold uppercase">
        <p className="text-blue-300">Ghi nhận lần khám</p>
      </div>
      <div className="grid grid-cols-3 ">
        <div className="flex flex-col">
          <span className="font-bold text-blue-400">Bệnh nhân</span>
          <span>
            Số điện thoại:
            <input
              type="text"
              id="sdt"
              value={customer}
              onChange={(e) => { setCustomer(e.target.value)}}
              className="ml-2 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm"
              placeholder="Số điện thoại"
              required
            ></input>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-blue-400">Nha sĩ thực hiện</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-blue-400">Ngày khám (dd/mm/yyyy)</span>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm"
          ></input>
        </div>
      </div>

      {/*Medicines */}
      <div className="mt-10">
        <span className="text-3xl font-bold text-blue-400">Thuốc</span>
        <table className="mt-5 w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Tên thuốc</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Chỉ định</th>
              <th className="border px-4 py-2">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine) => {
              const medicineData = medicines.find(
                (item) => item.MA_THUOC === medicine.MA_THUOC,
              );
              return (
                <tr className="h-[40px]" key={medicine.MA_THUOC}>
                  <td className="border px-4 py-2">{medicineData.TEN_THUOC}</td>
                  <td className="border px-4 py-2 text-center">
                    {medicine.SO_LUONG}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {medicineData.CHI_DINH}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {medicineData.GIA}
                  </td>
                </tr>
              );
            })}
            {newMedicines.map((medicine, index) => {
              // find medicine in data
              let medicineData = medicines.find(
                (item) => item.MA_THUOC === medicine.MA_THUOC,
              );
              return (
                <tr
                  className="h-[40px]"
                  key={medicine.MA_THUOC ? medicine.MA_THUOC : index}
                >
                  <td className="border px-4 py-2">
                    <select
                      className="z-10 w-full"
                      value={medicine.MA_THUOC}
                      onChange={(e) => {
                        const MA_THUOC = e.target.value;
                        setNewMedicines((prev) => {
                          return prev.map((item) => {
                            if (item.MA_THUOC === medicine.MA_THUOC) {
                              return {
                                ...item,
                                MA_THUOC: parseInt(MA_THUOC),
                              };
                            }
                            return item;
                          });
                        });
                      }}
                    >
                      {medicine.MA_THUOC === undefined ? (
                        <option value={undefined}>Chọn thuốc</option>
                      ) : (
                        <option value={medicine.MA_THUOC}>
                          {medicineData.TEN_THUOC}
                        </option>
                      )}
                      {medicines.map((item) => {
                        // check if medicine is exist in currentMedicines or newMedicines
                        const isExist = currentMedicines
                          .concat(newMedicines)
                          .find(
                            (medicine) => medicine.MA_THUOC === item.MA_THUOC,
                          );
                        if (isExist) return null;
                        return (
                          <option key={item?.MA_THUOC} value={item?.MA_THUOC}>
                            {item?.TEN_THUOC}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <input
                      className="w-full text-center"
                      type="number"
                      value={medicine?.quantity}
                      onChange={(e) => {
                        const quantity = e.target.value;

                        setNewMedicines((prev) => {
                          return prev.map((item) => {
                            if (item?.MA_THUOC === medicine?.MA_THUOC) {
                              return {
                                ...item,
                                quantity: parseInt(quantity),
                              };
                            }
                            return item;
                          });
                        });
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {medicineData?.CHI_DINH}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {medicineData?.GIA}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={handleAddMedicine}
          className="mt-5 h-10 w-full rounded-lg bg-blue-400 text-center font-bold text-white hover:bg-blue-500"
        >
          + Thêm thuốc
        </button>
      </div>

      {/* Services */}
      <div className="mt-10">
        <span className="text-3xl font-bold text-blue-400">Dịch vụ</span>
        <table className="mt-5 w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Tên dịch vụ</th>
              <th className="border px-4 py-2">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service) => {
              const serviceData = services.find(
                (item) => item.MA_DICH_VU === service.MA_DICH_VU,
              );
              return (
                <tr className="h-[40px]" key={service.MA_DICH_VU}>
                  <td className="border px-4 py-2">
                    {serviceData.TEN_DICH_VU}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {serviceData.GIA}
                  </td>
                </tr>
              );
            })}
            {newServices.map((service, index) => {
              // find service in data
              let serviceData = services.find(
                (item) => item.MA_DICH_VU === service.MA_DICH_VU,
              );
              return (
                <tr
                  className="h-[40px]"
                  key={service.MA_DICH_VU ? service.MA_DICH_VU : index}
                >
                  <td className="border px-4 py-2">
                    <select
                      className="z-10 w-full"
                      value={service.MA_DICH_VU}
                      onChange={(e) => {
                        const MA_DICH_VU = e.target.value;
                        setNewServices((prev) => {
                          return prev.map((item) => {
                            if (item.MA_DICH_VU === service.MA_DICH_VU) {
                              return {
                                ...item,
                                MA_DICH_VU: parseInt(MA_DICH_VU),
                              };
                            }
                            return item;
                          });
                        });
                      }}
                    >
                      {service.MA_DICH_VU === undefined ? (
                        <option value={undefined}>Chọn dịch vụ</option>
                      ) : (
                        <option value={service.MA_DICH_VU}>
                          {serviceData.TEN_DICH_VU}
                        </option>
                      )}
                      {services.map((item) => {
                        // check if service is exist in currentServices or newServices
                        const isExist = currentServices
                          .concat(newServices)
                          .find(
                            (service) => service.MA_DICH_VU === item.MA_DICH_VU,
                          );
                        if (isExist) return null;
                        return (
                          <option
                            key={item?.MA_DICH_VU}
                            value={item?.MA_DICH_VU}
                          >
                            {item?.TEN_DICH_VU}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {serviceData?.GIA}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          onClick={handleAddService}
          className="mt-5 h-10 w-full rounded-lg bg-blue-400 text-center font-bold text-white hover:bg-blue-500"
        >
          + Thêm dịch vụ
        </button>
      </div>

      {/* Button */}
      <div className="mt-10 flex w-full justify-evenly">
        <button
          onClick={handleSave}
          type="button"
          className="mb-2 me-2 w-32 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Lưu
        </button>

        <button
          onClick={() => {
            window.location.reload();
          }}
          type="button"
          className="mb-2 me-2 w-32 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
        >
          Huỷ
        </button>
      </div>
    </div>
  );
};

export default MedicalExamination;
