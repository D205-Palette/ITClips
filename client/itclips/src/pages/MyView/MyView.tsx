import MyBookmarkList from "./MyBookmarkList";
import React from "react";
import MainTab from "../../components/main/MainTab";
import { Route, Routes } from "react-router-dom";
import MyGroupBookmarkList from '../..//pages/MyView/MyGroupBookmarkList';
import MyFavorites from '../..//pages/MyView/MyFavorites';
import MyRoadmap from '../..//pages/MyView/MyRoadmap';
import { asideStore } from "../../stores/asideStore";
// component
import AsideBookmarkList from "../../components/aside/AsideBookmarkList"
import AsideProfile from '../../components/aside/AsideProfile'

import MessageLayout from "../../components/aside/MessageLayout";
import MyBookmark from "./MyBookmark";


export default function MyView() {

  const isMessageOpen = asideStore(state => state.isMessageOpen);

  return (
    <>
      <div id='Body' className="grid grid-cols-8 gap-4">

        {/* aside 자리 */}
        <div id="aside" className="col-start-2 col-span-2 hidden xl:block ">
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
          { isMessageOpen && <MessageLayout /> }
          </div>
          <Routes>
            <Route path='bookmarklist' element={<AsideProfile />} />
            <Route path='bookmarklist/1' element={<AsideBookmarkList />} />

            <Route path="groupbookmarklist" element={<AsideProfile />} />
            <Route path="favorites" element={<AsideProfile />} />
            <Route path="roadmap" element={<AsideProfile />} />
            
          </Routes>
        </div>

        {/* main자리 */}
        <div id="Main" className="lg:col-start-4 lg:col-span-4 md:col-start-3 md:col-span-5 sm:col-start-2 sm:col-span-6">
          <MainTab />
          
          <Routes>
            <Route path="bookmarklist" element={<MyBookmarkList />} />
            <Route path='bookmarklist/1' element={<MyBookmark />} />
          
            <Route path="groupbookmarklist" element={<MyGroupBookmarkList />} />
            <Route path="favorites" element={<MyFavorites />} />
            <Route path="roadmap" element={<MyRoadmap />} />            
          </Routes>

        </div>
      </div>
    </>
  );
}
