import MyBookmarkList from "./MyBookmarkList";
import React from "react";
import MainTab from "../../components/main/MainTab";
import { Route, Routes } from "react-router-dom";
import MyGroupBookmarkList from '../..//pages/MyView/MyGroupBookmarkList';
import MyFavorites from '../..//pages/MyView/MyFavorites';
import MyRoadmap from '../..//pages/MyView/MyRoadmap';
import { asideStore } from "../../stores/asideStore";
// component
import AsideBookmarkList from "../../components/aside/AsideProfile"
import AsideProfile from '../..//components/aside/AsideProfile'

import MessageLayout from "../../components/aside/MessageLayout";
export default function MyView() {



  const isMessageOpen = asideStore(state => state.isMessageOpen);

  return (
    <>
     <div id='Body' className="grid grid-cols-8 gap-4">
        
        <div id="aside" className="col-start-2 col-span-2 hidden xl:block ">
          {/* aside 자리 */}
          {/* 여기에 프로필이나 메세지일때 넣기 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
          { isMessageOpen && <MessageLayout /> }
          </div>
          <Routes>
            <Route path='' element={<AsideBookmarkList />} />
            <Route path="groupbookmarklist" element={<AsideBookmarkList />} />
            <Route path="favorites" element={<AsideBookmarkList />} />
            <Route path="roadmap" element={<AsideBookmarkList />} />
          </Routes>
        </div>

        {/* main자리 */}
        <div id="Main" className="lg:col-start-4 lg:col-span-4 md:col-start-3 md:col-span-5 sm:col-start-2 sm:col-span-6">
          <MainTab />
          
          <Routes>
            <Route path="" element={<MyBookmarkList />} />
            <Route path="groupbookmarklist" element={<MyGroupBookmarkList />} />
            <Route path="favorites" element={<MyFavorites />} />
            <Route path="roadmap" element={<MyRoadmap />} />            
          </Routes>

        </div>
      </div>
    </>
  );
}
