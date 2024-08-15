import React from "react";
import { Outlet } from "react-router-dom";

// component
import AsideProfile from "../components/aside/AsideProfile";
import AsideMoblieProfile from "../components/aside/AsideProfile(Mobile)";

export default function MyView() {

  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-4 ">
        {/* aside 자리 */}
        <div
          id="aside"
          className="md:col-start-2 md:col-span-3 md:pe-10 col-start-2 col-span-10"
        >
          {/* 메세지 뜨는 위치 */}
          <div className="sticky md:block hidden top-16 z-30">
            <AsideProfile />
          </div>
          <div className="md:hidden top-16 z-30">
            <AsideMoblieProfile />
          </div>
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="md:col-start-5 md:col-span-7 col-start-2 col-span-10"
        >
          <Outlet />
        </div>


      </div>
    </>
  );
}
