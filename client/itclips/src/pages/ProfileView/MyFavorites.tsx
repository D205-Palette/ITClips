import MyBookmarkList from "../../components/main/ListsItem(List)";
import MyBookmarkListAlbum from "../../components/main/ListsItem(Album)";
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import axios from "axios";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
import NoContent from "./NoContent";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";
import { useParams } from "react-router-dom";
import mainStore from "../../stores/mainStore";

const MyGroupBookmarkList = () => {
  const params = useParams();

  const {isFavoriteChange,setIsFavoriteChange} = mainStore()
  const { token, userId } = authStore();

  const [filterText, changeFilterText] = useState("");
  const [isList, setTab] = useState(true);
  const [lists, setLists] = useState<BookmarkListSumType[]>([]);
  const [filterdLists, setFilterdLists] = useState<BookmarkListSumType[]>([]);
  const [canView, setCanView] = useState(false);
  const [noContent, setNoContent] = useState(<div className="w-full flex flex-row justify-center mt-6">
    <span className="loading loading-spinner loading-lg text-sky-500"></span>
  </div>);


  // 리스트형&앨범형 보기 변경
  function tabList(): void {
    setTab(true);
  }
  function tabAlbum(): void {
    setTab(false);
  }

  // 마운트할때 유저의 즐겨찾기들 요약
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/scrap/${params.userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          viewerId: userId,
        },
      })
        .then((res) => {
          setLists(res.data);
          setFilterdLists(res.data)
          if (res.data.user) {
            res.data.users.map(
              (user: any) => user.Id === userId && setCanView(true)
            );
          }
          setNoContent(<NoContent content={"즐겨찾기"} />);
          setIsFavoriteChange(false)
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, [isFavoriteChange]);
  
  // 검색어 변경시마다 필터링 된 로드맵 변경
  useEffect(() => {
    setFilterdLists(lists.filter((list) => list.title.toLowerCase().includes(filterText.toLowerCase())));
  }, [filterText]);

  return (
    <>
      <div className="sticky top-16 z-20 w-full">
        <div className="bg-base-100">
          <MainTab userId={Number(params.userId)} />
          <SearchBar
            whatSearch={"즐겨찾기"}
            filterText={filterText}
            changeFilterText={changeFilterText}
          />
        </div>

        {/* 리스트 & 액자형 탭 */}
        <div className="flex justify-end">
          <div role="tablist" className="tabs hidden md:block ">
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
                <div
                  onClick={tabList}
                  role="tab"
                  className="tab tab-active mx-3"
                >
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

      <div className="">
        {/* 북마크 리스트들*/}
        {filterdLists.length === 0 ? (
          noContent
        ) : (
          <>
            {!isList ? (
              <div className="flex justify-around ">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  {filterdLists.map((list) => (
                    <MyBookmarkListAlbum
                      list={list}
                      whatMenu="즐겨찾기"
                      canEdit={canView}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {filterdLists.map((list) => (
                  <div
                    className={
                      (canView || list.isPublic ? "" : "hidden ") + " my-1"
                    }
                  >
                    <MyBookmarkList list={list} whatMenu="즐겨찾기" />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      
    </>
  );
};

export default MyGroupBookmarkList;
