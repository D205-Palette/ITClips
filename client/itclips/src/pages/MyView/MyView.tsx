import MyBookmarkList from "./MyBookmarkList";


import React from "react";
import MainTab from "../../components/main/MainTab";
import { Route, Routes } from "react-router-dom";

import MyGroupBookmarkList from '../..//pages/MyView/MyGroupBookmarkList';
import MyFavorites from '../..//pages/MyView/MyFavorites';
import MyRoadmap from '../..//pages/MyView/MyRoadmap';


// component
import AsideBookmarkList from "../../components/aside/AsideProfile"
import AsideProfile from '../..//components/aside/AsideProfile'


export default function MyView() {


  return (
    <>
     <div id='Body' className="grid grid-cols-8 gap-4">
        
        <div id="aside" className="col-start-2 col-span-2">
          {/* aside 자리 */}
          {/* 여기에 프로필이나 메세지일때 넣기 */}
          <Routes>
            <Route path='' element={<AsideBookmarkList />} />
            <Route path="groupbookmarklist" element={<AsideBookmarkList />} />
            <Route path="favorites" element={<AsideBookmarkList />} />
            <Route path="roadmap" element={<AsideBookmarkList />} />
          </Routes>
        </div>

        <div id="Main" className="col-start-4 col-span-4">
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
