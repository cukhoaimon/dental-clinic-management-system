import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getBill, createBill } from "../../services/apiBill";
// import { bill } from "./mocks/bills"
import formatDate from "../../utils/formatDate";
import { Backdrop, CircularProgress } from "@mui/material";

const Bill = () => {
  const [bill1, setBill] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchBill = async () => {
      const res = await getBill(id).then((res) => res.bill);
      if (res.lankham.TRANG_THAI) {
        const storedBill = JSON.parse(localStorage.getItem("bill"));
        setBill(storedBill);
      } else {
        setLoading(true);
        const res1 = await createBill(id).then((res) => {
          setLoading(false);
          localStorage.setItem("bill", JSON.stringify(res));
          return res;
        });
        setBill(res1.bill);
      }
      console.log(res);
    };

    fetchBill();
  }, []);

  return (
    <div className="px-40 py-10">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mb-10 text-4xl font-bold uppercase">
        <p>Xin chào,</p>
        <p>
          Đây là hoá đơn thanh toán của bạn #
          <span className="text-green-400">{Date.now()}</span>.
        </p>
        <Link
          to="/employee"
          className=" rounded-sm bg-green-600 p-2 text-center text-2xl font-bold uppercase text-white"
        >
          Trở về
        </Link>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex flex-col">
          <span className="font-bold text-green-400">Bệnh nhân</span>
          {/* <span className="font-bold">{`Họ và tên: ${bill.customer.name}`}</span> */}
          <span>{`Số điện thoại: ${bill1.lankham?.BENH_NHAN}`}</span>
          {/* <span>{`Địa chỉ: ${bill1.lankham?.address}`}</span> */}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-green-400">Nha sĩ thực hiện</span>
          <span className="font-bold">{`Số điện thoại: ${bill1.lankham?.NGUOI_THUC_HIEN}`}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-green-400">Khám bệnh</span>
          <span className="font-bold">{`Mã lần khám: ${bill1.lankham?.MA_LAN_KHAM}`}</span>
          <span>{`Ngày khám: ${formatDate(bill1.lankham?.NGAY_KHAM)}`}</span>
        </div>
      </div>
      <div className="mt-10">
        <span className="text-2xl font-bold text-green-400">
          Thông tin hoá đơn
        </span>
        <table className="mt-5 w-full table-auto">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="border px-4 py-2">Mã</th>
              <th className="border px-4 py-2">Tên thuốc</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Đơn giá</th>
              <th className="border px-4 py-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {bill1.medicines?.map((medicine, index) => {
              const bgColor = index % 2 !== 0 ? "bg-green-100" : "bg-white";

              return (
                <tr key={medicine.id} className={bgColor}>
                  <td className="border px-4 py-2">{medicine.id}</td>
                  <td className="border px-4 py-2">{medicine.name}</td>
                  <td className="border px-4 py-2">{medicine.quantity}</td>
                  <td className="border px-4 py-2">{medicine.price}</td>
                  <td className="border px-4 py-2">
                    {medicine.quantity * medicine.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="mt-5 w-full table-auto">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="border px-4 py-2">Mã</th>
              <th className="border px-4 py-2">Tên dịch vụ</th>
              <th className="border px-4 py-2">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {bill1.services?.map((service, index) => {
              const bgColor = index % 2 !== 0 ? "bg-green-100" : "bg-white";

              return (
                <tr key={service.id} className={bgColor}>
                  <td className="border px-4 py-2">{service.id}</td>
                  <td className="border px-4 py-2">{service.name}</td>
                  <td className="border px-4 py-2">{service.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-5 flex justify-end">
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-10">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Tổng tiền thuốc</span>
                <span className="text-xl font-bold">Tổng tiền dịch vụ</span>
                <span className="rounded-sm bg-green-600 p-2 text-center text-2xl font-bold uppercase text-white">
                  Tổng tiền
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  {bill1.medicines?.reduce(
                    (sum, medicine) => sum + medicine.price * medicine.quantity,
                    0,
                  )}
                </span>
                <span className="text-xl font-bold">
                  {bill1.services?.reduce(
                    (sum, service) => sum + service.price,
                    0,
                  )}
                </span>
                <span className="py-2 text-2xl font-bold text-green-600">
                  {bill1.lankham?.TONG_TIEN}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-20">
        <p className="text-center text-6xl font-extrabold uppercase text-green-100">
          Cảm ơn đã sử dụng dịch vụ!
        </p>
      </div>
    </div>
  );
};

export default Bill;
