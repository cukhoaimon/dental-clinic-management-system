import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getBill } from "../../services/apiBill";
// import { bill } from "./mocks/bills"
import formatDate from "../../utils/formatDate";

const Bill = () => {
  const [bill1, setBill] = useState({})

  const {id} = useParams();
  useEffect(() => {
    
    const fetchBill = async () => {
      const res = await getBill(id).then(res => res.bill)     
      if (res.lankham.TRANG_THAI) {        
        setBill(res)
      }
      console.log(res)
    }

    fetchBill()
  },[])
 

  return (
    <div className="py-10 px-40">
      <div className="text-4xl font-bold uppercase mb-10">
        <p >Xin chào,</p>
        <p>Đây là hoá đơn thanh toán của bạn #<span className="text-green-400">{Date.now()}</span>.</p>
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
        <span className="font-bold text-2xl text-green-400">Thông tin hoá đơn</span>
        <table className="table-auto w-full mt-5">
          <thead>
            <tr className="text-white bg-green-600">
              <th className="border px-4 py-2">Mã</th>
              <th className="border px-4 py-2">Tên thuốc</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Đơn giá</th>
              <th className="border px-4 py-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {bill1.medicines?.map((medicine, index) => {
              const bgColor = index % 2 !== 0 ? 'bg-green-100' : 'bg-white'
              
              
              return (
              <tr key={medicine.id} className={bgColor}>
                <td className="border px-4 py-2">{medicine.id}</td>
                <td className="border px-4 py-2">{medicine.name}</td>
                <td className="border px-4 py-2">{medicine.quantity}</td>
                <td className="border px-4 py-2">{medicine.price}</td>
                <td className="border px-4 py-2">{medicine.quantity * medicine.price}</td>
              </tr>
            )})}
          </tbody>
        </table>
        <table className="table-auto w-full mt-5">
          <thead>
            <tr className="text-white bg-green-600">
              <th className="border px-4 py-2">Mã</th>
              <th className="border px-4 py-2">Tên dịch vụ</th>
              <th className="border px-4 py-2">Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {bill1.services?.map((service, index) => {
              const bgColor = index % 2 !== 0 ? 'bg-green-100' : 'bg-white'

              return (
              <tr key={service.id} className={bgColor}>
                <td className="border px-4 py-2">{service.id}</td>
                <td className="border px-4 py-2">{service.name}</td>
                <td className="border px-4 py-2">{service.price}</td>
              </tr>
            )})}
          </tbody>
        </table>
        <div className="flex justify-end mt-5">
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-10">
              <div className="flex flex-col">
                <span className="font-bold text-xl">Tổng tiền thuốc</span>
                <span className="font-bold text-xl">Tổng tiền dịch vụ</span>
                <span className="font-bold text-2xl p-2 uppercase rounded-sm text-white bg-green-600 text-center">Tổng tiền</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{bill1.medicines?.reduce((sum, medicine) => sum + medicine.price * medicine.quantity, 0)}</span>
                <span className="font-bold text-xl">{bill1.services?.reduce((sum, service) => sum + service.price, 0)}</span>
                <span className="font-bold text-2xl py-2 text-green-600">{bill1.lankham?.TONG_TIEN}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-20">
        <p className="text-6xl uppercase text-green-100 font-extrabold text-center">Cảm ơn đã sử dụng dịch vụ!</p>
      </div>
    </div>
  )
}

export default Bill