import MyBookmarkList from "./ProfileView/MyBookmarkList";
import React from "react";

import { Outlet } from "react-router-dom";
import MyGroupBookmarkList from './ProfileView/MyGroupBookmarkList';
import MyFavorites from './ProfileView/MyFavorites';
import MyRoadmap from './ProfileView/MyRoadmap';

// component
import AsideBookmarkList from "../components/aside/AsideBookmarkList"
import AsideProfile from '../components/aside/AsideProfile'

import MyBookmark from "./BookmarkView";
import MainTab from "../components/main/MainTab";

export default function MyView() {

  return (
    <>
      <div id='Body' className="grid grid-cols-12 gap-4 ">

        {/* aside 자리 */}
        <div id="aside" className="md:col-start-2 md:col-span-3 md:p-4 col-start-2 col-span-10 ">
          {/* 메세지 뜨는 위치 */}
          <div className="sticky top-16 z-30">
            <AsideProfile />
          </div>
        </div>
       

        {/* main자리 */}
        <div id="Main" className="md:col-start-5 md:col-span-7 col-start-2 col-span-10 ">
          {/* <MainTab /> */}
          
          <Outlet />

        </div>
      </div>
    </>
  );
}
