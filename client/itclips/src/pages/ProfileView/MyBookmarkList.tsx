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

export default function MyView() {
  const [isList, setTab] = useState(true);
  const [filterText, changeFilterText] = useState("")
  function tabList(): void {
    setTab(true);
  }
  function tabAlbum(): void {
    setTab(false);
  }

  // 나중에 api로 받아올때는 타입 BookmarkListsSumType으로
  const lists = mainStore((state) => state.lists);

// 북마크 리스트
// axios({
//   method: 'get',
//   url: `i11d205.p.ssafy.io/api/list/personal/${userId}/`,
//   // params: {
//   //   userId: 1,

//   // },
//   // headers: {
//   //   Authorization: 'Bearer YourAccessToken'
//   // }
// })
// .then((res) => {
//   console.log(res.data);
// })
// .catch((err) => {
//   console.error(err);
// });

// 받아오는 형식 (개인 북마크 리스트)
// [
//   {
//     "id": 57,
//     "title": "string",
//     "description": "string",
//     "bookmarkCount": 0,
//     "likeCount": 1,
//     "image": "string",
//     "isLiked" : true,
//     "tags": [
//       {
//         "title": "String"
//       }
//     ],
//     "users": [
//       {
//         "id": 1,
//         "nickName": "진규"
//       }
//     ]
//   }
// ]

  const filterdLists = lists.filter((list) => list.title.includes(filterText)||list.tags.includes(filterText))

  return (
    <>
      <MainTab />
      {/* 상단 검색바 */}
      <SearchBar whatSearch={"북마크 리스트"} filterText={filterText} changeFilterText={changeFilterText}/>
  
      {/* 리스트 & 액자형 탭 */}
      <div className="flex justify-end">
        <div role="tablist" className="tabs">
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

      {/* 북마크 리스트들*/}
      {!isList ? (
         <div className="flex justify-around">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {filterdLists.map((list) => (
            <MyBookmarkListAlbum list={list} />
          ))}
        </div>
          </div>  
      ) : (
        <>
          {filterdLists.map((list) => (
            <div className="my-1"><MyBookmarkList list={list} /></div>
          ))}
        </>
      )}
    
    </>
  );
}
