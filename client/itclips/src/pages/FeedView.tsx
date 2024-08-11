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
        <div
          id="aside"
          className="hidden xl:block xl:col-start-2 xl:col-span-3"
        >
          {/* aside 자리 */}
          <AsideProfile />
        </div>

        {/* main자리 */}
        <div
          id="main"
          className="col-start-2 col-span-10 xl:col-start-5 xl:col-span-7 flex flex-col"
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
