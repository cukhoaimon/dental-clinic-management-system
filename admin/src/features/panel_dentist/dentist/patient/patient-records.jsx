/* eslint-disable react/prop-types */
import formatDate from "../../../../utils/formatDate"

const PatientRecord = ({patientRecords}) => {
  return (
    <div>
      <div className="overflow-y-scroll flex flex-col max-h-[500px]">
        <table className="table-auto w-full mt-5">
          <thead className="text-white bg-blue-600">
            <tr>
              <th className="border px-4 py-2">Mã Lần Khám</th>
              <th className="border px-4 py-2">Ngày khám</th>
              <th className="border px-4 py-2">Nha sĩ thực hiện</th>
              <th className="border px-4 py-2">Dịch vụ sử dụng</th>
              <th className="border px-4 py-2">Thuốc đã kê + số lượng</th>
            </tr>
          </thead>
          <tbody>
            {patientRecords && patientRecords.map((record, index) => {
              const bgColor = index % 2 !== 0 ? 'bg-blue-50' : 'bg-white'
              const services = JSON.parse(record.DICH_VU).map((service) => service.TEN_DICH_VU).join(', ')

              return (
              <tr key={record.MA_LAN_KHAM} className={bgColor}>
                <td className="border px-4 py-2 text-center">{record.MA_LAN_KHAM}</td>
                <td className="border px-4 py-2">{formatDate(record.NGAY_KHAM)}</td>
                <td className="border px-4 py-2">{record.NHA_SI_THUC_HIEN}</td>
                <td className="border px-4 py-2">
                  {services}
                </td>
                <td className="border px-4 py-2">
                  {JSON.parse(record.THUOC).map((medicine, index) => {
                    return (
                      <div className="grid grid-cols-2 gap-x-4" key={index}>
                        <span>{medicine.TEN_THUOC}</span>
                        <span className="text-center">{medicine.SO_LUONG}</span>
                      </div>
                    )
                  })}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientRecord