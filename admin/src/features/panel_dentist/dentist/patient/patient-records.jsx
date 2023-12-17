import { patientRecordsMock } from "../../mocks/records"

const PatientRecord = () => {
  return (
    <div>
      <div>
        <p className="font-bold text-2xl text-blue-400">Họ và tên: Cristiano Ronaldo</p>
      </div>
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
            {patientRecordsMock.map((record, index) => {
              const bgColor = index % 2 !== 0 ? 'bg-blue-50' : 'bg-white'
              const services = record.services.map((service) => service.name).join(', ')

              return (
              <tr key={record.id} className={bgColor}>
                <td className="border px-4 py-2">{record.id}</td>
                <td className="border px-4 py-2">{record.dentalVisitDate}</td>
                <td className="border px-4 py-2">{record.dentist.name}</td>
                <td className="border px-4 py-2">
                  {services}
                </td>
                <td className="border px-4 py-2">
                  {record.medicines.map((medicine) => {
                    return (
                      <div className="grid grid-cols-2 gap-x-4" key={medicine.id}>
                        <span>{medicine.name}</span>
                        <span className="text-center">{medicine.quantity}</span>
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