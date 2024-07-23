import ListItem from '../components/main/ListsItem(List)';
import AlbumItem from '../components/main/ListsItem(Album)';
import { Link, Route, Routes } from 'react-router-dom';
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2  } from "react-icons/hi2";
import { useState } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from '../components/MainSearchBar';
import MainTab from '../components/main/MainTab';
import MyBookmarkList from './MyBookmarkList';
import AsideBookmarkList from "../components/aside/AsideProfile"
import MyBookmarkListAlbum from './MyBookmarkList(Album)';

export default function MyView() {
    const [isList, setTab] = useState(true);
    function tabList (): void  {
        setTab(true)
    };
    function tabAlbum (): void  {
      setTab(false)
  };
    return (
      <> 
       {/* <div className="grid grid-cols-8 gap-4">
        <div id="aside" className="col-start-2 col-span-2">
          <AsideBookmarkList />
        </div> */}

        <div id="Main" className="col-start-4 col-span-4">
          {/* <MainTab /> */}
          
          <SearchBar />

        {/* 리스트 or 앨범형 선택자 */}
        <div className='flex justify-end'> 
            <div role="tablist" className="tabs" >
                {!isList? <><div onClick={tabList} role='tab' className="tab mx-3"><CiBoxList /></div><div onClick={tabAlbum} role="tab" className="tab tab-active"> <HiMiniSquares2X2 /> </div> </>:
                <> <div onClick={tabList} role="tab" className="tab tab-active mx-3"><FaList /></div> <div onClick={tabAlbum} role="tab" className="tab"> <HiOutlineSquares2X2 /></div></> }
            </div>
        </div>

        {/* 리스트 or 북마크 or 즐겨찾기 or 로드맵 나오는 위치 */}
        {!isList? <MyBookmarkListAlbum /> : <MyBookmarkList />}
        
        {/* <Routes>
            <Route path='/list' element={<AlbumItem />} />
            <Route path='/album' element={<ListItem />} />
        </Routes> */}

        
        </div>
      {/* </div> */}
      
        
        
        </>
    );
  }
  