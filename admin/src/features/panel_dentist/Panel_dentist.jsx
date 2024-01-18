import { Fragment, useEffect, useState } from "react";
import { ItemSide } from "../common/ItemSide";

import { PatientBoard } from "./dentist/patient/PatientBoard";
import { ScheduleBoard } from "./dentist/schedule/ScheduleBoard";
import { sideDataMock } from "./mocks/sideData";

export const Panel_dentist = () => {
  const [selectedTitle, setSelectedTitle] = useState("Hồ sơ bệnh nhân");
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
            <p className="py-2 rounded-2xl bg-sky-300 text-center text-3xl font-bold leading-[64px] text-sky-600 shadow-lg">
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
          </div>

          <div className="main-content w-full px-10 py-5">
            {selectedTitle === "Lịch hẹn" && (
              <ScheduleBoard
              />
            )}

            {selectedTitle === "Hồ sơ bệnh nhân" && (
              <PatientBoard
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
