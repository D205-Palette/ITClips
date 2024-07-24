import MyBookmarkList from "../../components/main/ListsItem(List)";
import MyBookmarkListAlbum from "../../components/main/ListsItem(Album)";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from "../../components/main/MainSearchBar";
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

    {/* 상단 검색바 */}
    <SearchBar whatSearch={'북마크 리스트'}/>

    {/* 리스트 & 액자형 탭 */}
    <div className='flex justify-end'> 
      <div role="tablist" className="tabs" >
          {!isList? <><div onClick={tabList} role='tab' className="tab mx-3"><CiBoxList /></div><div onClick={tabAlbum} role="tab" className="tab tab-active"> <HiMiniSquares2X2 /> </div> </>:
          <> <div onClick={tabList} role="tab" className="tab tab-active mx-3"><FaList /></div> <div onClick={tabAlbum} role="tab" className="tab"> <HiOutlineSquares2X2 /></div></> }
      </div>
    </div>

    {/* 리스트형으로 보여줄지 액자형으로 보여줄지 */}
    {!isList ? <MyBookmarkListAlbum /> : <MyBookmarkList />}
    </>
  );
}
