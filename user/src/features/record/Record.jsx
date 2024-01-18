import { DataGrid } from "@mui/x-data-grid";

function Record({ records }) {
  // Get columns name from records fetched from API
  const columns = [
    { field: "MaLanKham", headerName: "Mã lần khám", width: 200 },
    { field: "NgayKham", headerName: "Ngày khám", width: 300 },
    { field: "NguoiThucHien", headerName: "Người thực hiện", width: 300 },
    { field: "DichVu", headerName: "Dịch vụ", width: 500 },
    { field: "Thuoc", headerName: "Thuốc", width: 300 },
  ];
  // Get rows data from records fetched from API
  const rows = records.map((record) => {
    const jsDatetime = new Date(record.NGAY_KHAM);
    const day = String(jsDatetime.getDate()).padStart(2, "0");
    const month = String(jsDatetime.getMonth() + 1).padStart(2, "0");
    const year = jsDatetime.getFullYear();
    return {
      id: record.MA_LAN_KHAM,
      MaLanKham: record.MA_LAN_KHAM,
      NgayKham: `${day}-${month}-${year}`,
      NguoiThucHien: record.NGUOI_THUC_HIEN,
      DichVu: record.DICH_VU.map((service) => service.TEN_DICH_VU).join(", "),
      // show all medicine names and it's quantity
      Thuoc: record.THUOC.map(
        (medicine) => `${medicine.TEN_THUOC}: ${medicine.SO_LUONG}`,
      ).join(", "),
    };
  });

  return (
    <div>
      <DataGrid
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal",
            lineHeight: "normal",
          },
          ".MuiDataGrid-columnHeader": {
            // Forced to use important since overriding inline styles
            height: "46px !important",
            backgroundColor: "#cfcfcf !important",
          },
          ".MuiDataGrid-cellContent": {
            textWrap: "wrap",
          },
          fontSize: 22,
        }}
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
