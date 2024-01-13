import { DataGrid } from "@mui/x-data-grid";

function Record() {
  const columns = [
    { field: "id", headerName: "Mã lần khám", width: 200 },
    { field: "date", headerName: "Ngày khám", width: 200 },
    { field: "dentist", headerName: "Nha sĩ", width: 300 },
    { field: "medicine", headerName: "Thuốc", width: 300 },
    { field: "service", headerName: "Dịch vụ", width: 300 },
    { field: "credit", headerName: "Tổng tiền", width: 300 },
  ];
  const rows = [
    {
      id: "LK001",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK002",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK003",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK004",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK005",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK006",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK007",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK008",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc A",
      service: "Chụp X-quang",
      credit: "100.000",
    },
    {
      id: "LK009",
      date: "20/10/2021",
      dentist: "Nguyễn Văn A",
      medicine: "Thuốc B",
      service: "Chụp X-quang",
      credit: "100.000",
    },
  ];

  return (
    <div>
      <DataGrid
        sx={{ fontSize: 22 }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default Record;
