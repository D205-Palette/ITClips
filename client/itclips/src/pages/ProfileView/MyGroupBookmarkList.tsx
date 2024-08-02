import MyBookmarkList from "../../components/main/ListsItem(List)";
import MyBookmarkListAlbum from "../../components/main/ListsItem(Album)";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import mainStore from "../../stores/mainStore";
import { IoIosWarning } from "react-icons/io";
import axios from "axios";
import type { BookmarkListsSumType } from "../../types/BookmarkListType";
import NoContent from "./NoContent";

const MyGroupBookmarkList = () => {      
  
  const [filterText, changeFilterText] = useState("")
  const [isList, setTab] = useState(true);
  function tabList(): void {
    setTab(true);
  }
  function tabAlbum(): void {
    setTab(false);
  }

  // 나중에 api로 받아올때는 타입 BookmarkListsSumType으로
  const lists = mainStore((state) => state.lists);

  
  const filterdLists = lists.filter((list) => list.title.includes(filterText)||list.tags.includes(filterText))

  return (
    <>
    <div className="fixed z-10 w-7/12">
    <div className="bg-white">
      <MainTab />
      <SearchBar whatSearch={'그룹 북마크 리스트'} filterText={filterText} changeFilterText={changeFilterText}/>
      </div>
    
      {/* 리스트 & 액자형 탭 */}
      <div className="flex justify-end">
        <div role="tablist" className="tabs ">
          {!isList ? (
            <>
              <div onClick={tabList} role="tab" className="tab mx-3">
                <CiBoxList />
              </div>
              <div onClick={tabAlbum} role="tab" className="tab tab-active">
                {" "}
                <HiMiniSquares2X2 />{" "}
              </div>{" "}
            </>
          ) : (
            <>
              {" "}
              <div onClick={tabList} role="tab" className="tab tab-active mx-3">
                <FaList />
              </div>{" "}
              <div onClick={tabAlbum} role="tab" className="tab">
                {" "}
                <HiOutlineSquares2X2 />
              </div>
            </>
          )}
        </div>
      </div>
      </div>
      
      <div className="absolute top-36 w-7/12">
        {/* 북마크 리스트들*/}
        {filterdLists.length === 0 ? <NoContent content={"즐겨찾기"}/> : <>
        {!isList ? (
          <div className="flex justify-around ">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {filterdLists.map((list) => (
                <MyBookmarkListAlbum list={list} />
              ))}{filterdLists.map((list) => (
                <MyBookmarkListAlbum list={list} />
              ))}{filterdLists.map((list) => (
                <MyBookmarkListAlbum list={list} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {filterdLists.map((list) => (
              <div className="my-1">
                <MyBookmarkList list={list} />
              </div>
            ))}{filterdLists.map((list) => (
              <div className="my-1">
                <MyBookmarkList list={list} />
              </div>
            ))}{filterdLists.map((list) => (
              <div className="my-1">
                <MyBookmarkList list={list} />
              </div>
            ))}
          </>
        )}</> }
      </div>
    </>
  );
};

export default MyGroupBookmarkList;
