import { Fragment, useEffect, useState } from "react";
import { ItemSide } from "./ItemSide";
import { MedicineBoard } from "./admin/medicine/MedicineBoard";
import Dialog from "../common/Dialog";
import useProcessDialog from "../../hooks/useProcessDialog";
import { sideDataMock } from "./mocks/sideData";

export const Panel = () => {
  const [selectedTitle, setSelectedTitle] = useState("Thuốc");
  const [sideData, setSideData] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    alert(search);
  };

  const handleSelect = (title) => {
    setSelectedTitle(title);
  };

  // load data
  useEffect(() => {
    setSideData(sideDataMock);
  }, [sideData]);

  // handle dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [diaLogName, setDialogName] = useState("");

  const attr = useProcessDialog({
    id: diaLogName,
    title: diaLogName,
    triggerValue: openDialog,
    onClose: () => {
      setOpenDialog(false);
    },
  });

  return (
    <Fragment>
      <div className="nav flex h-[60px] items-center justify-between bg-sky-100 px-4">
        <button className="h-10 w-24 rounded-lg bg-sky-300 font-bold text-sky-600">
          Home
        </button>
        <div className="search-bar flex w-[500px]">
          <input
            onChange={handleSearchChange}
            className="mr-3 w-3/5 rounded-full px-3"
            type="text"
            name="search"
            id="search"
            placeholder="Nhập để tìm kiếm theo mã"
          />
          <button
            onClick={handleSearchSubmit}
            className="h-10 w-1/5 rounded-lg bg-sky-300 font-bold text-sky-600"
          >
            Tìm
          </button>
        </div>
      </div>
      <div className="main-container flex">
        <div className="side w-1/4 pt-10">
          <div className="title mx-8 mb-10">
            <p className="h-16 w-[240px] rounded-2xl bg-sky-300 text-center text-3xl font-bold leading-[64px] text-sky-600 shadow-lg">
              {selectedTitle}
            </p>
          </div>

          <div className="list">
            {sideData.map((item, index) => (
              <ItemSide
                onClick={handleSelect}
                key={index}
                item={item}
                even={index % 2 === 0}
                handleTitle={handleSelect}
              />
            ))}
          </div>
        </div>
        <div className="main w-3/4 bg-gray-200">
          <div className="main-navbar flex h-14 w-full items-center justify-between bg-sky-500 px-8">
            <div className="mt-6 h-8 w-28 rounded-tl-lg rounded-tr-lg bg-white">
              <p className="w-full text-center leading-8 text-sky-600">
                Table #1
              </p>
            </div>
            <div>
              <button
                className="mr-8 h-8 w-20 rounded-md bg-sky-200 leading-8 text-sky-600"
                onClick={() => {
                  setOpenDialog(true);
                  setDialogName("Thêm");
                }}
              >
                + Thêm
              </button>

              <button className="mr-8 h-8 w-20 rounded-md bg-sky-200 leading-8 text-sky-600"
              onClick={() => {
                setOpenDialog(true);
                setDialogName("Xoá");
              }}>
                - Xoá
              </button>

              <button className="h-8 w-20 rounded-md bg-sky-200 leading-8 text-sky-600"
              onClick={() => {
                setOpenDialog(true);
                setDialogName("Sửa");
              }}>
                ? Sửa
              </button>

              <Dialog title={diaLogName} attr={attr}>
                <h1>the quick brown fox jumps over the lazy dog</h1>
              </Dialog>
            </div>
          </div>

          <div className="main-content w-full px-10 py-5">
            <MedicineBoard />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
