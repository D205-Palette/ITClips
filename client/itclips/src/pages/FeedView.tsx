import React, { useEffect } from "react";
import { feedStore } from "../stores/feedStore";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

import AsideProfile from "../components/aside/AsideProfile";

import FeedTab from "../components/feed/FeedTab";

export default function FeedView() {

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {/* aside 자리 */}
        <div id="aside" className="md:col-start-2 md:col-span-3 md:p-4 col-start-2 col-span-10 ">
          {/* 메세지 뜨는 위치 */}
          <div className="sticky top-16 z-30">
            <AsideProfile />
          </div>
        </div>

        {/* main자리 */}
        <div
          id="main"
          className="md:col-start-5 md:col-span-7 col-start-2 col-span-10"
        >
          <div className="sticky top-16 z-10 bg-base-100">
            <FeedTab />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
