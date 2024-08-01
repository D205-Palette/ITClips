import MyBookmarkList from "./ProfileView/MyBookmarkList";
import React from "react";

import { Route, Routes, Outlet } from "react-router-dom";
import MyGroupBookmarkList from './ProfileView/MyGroupBookmarkList';
import MyFavorites from './ProfileView/MyFavorites';
import MyRoadmap from './ProfileView/MyRoadmap';
import { asideStore } from "../stores/asideStore";
// component
import AsideBookmarkList from "../components/aside/AsideBookmarkList"
import AsideProfile from '../components/aside/AsideProfile'

import MessageLayout from "../components/aside/MessageLayout";
import MyBookmark from "./BookmarkView";
import MainTab from "../components/main/MainTab";

export default function MyView() {

  const isMessageOpen = asideStore(state => state.isMessageOpen);

  return (
    <>
      <div id='Body' className="grid grid-cols-12 gap-4">

        {/* aside 자리 */}
        <div id="aside" className="xl:col-start-2 xl:col-span-3 hidden xl:block ">
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-3 col-span-2 z-50 ">
          { isMessageOpen && <MessageLayout /> }
          </div>
          <AsideProfile />
        </div>                                        
       

        {/* main자리 */}
        <div id="Main" className="xl:col-start-5 xl:col-span-7 col-start-3 col-span-8 gap-4">
          {/* <MainTab /> */}
          
          <Outlet />

        </div>
      </div>
    </>
  );
}
