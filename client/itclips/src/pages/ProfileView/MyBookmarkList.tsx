import MyBookmarkList from "../../components/main/ListsItem(List)";
import MyBookmarkListAlbum from "../../components/main/ListsItem(Album)";
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import { authStore } from "../../stores/authStore";
import axios from "axios";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
import NoContent from "./NoContent";
import { FaPlus } from "react-icons/fa6";
import BookmarkListCreateModal from "../../components/aside/modals/BookmarkListCreateModal";
import { API_BASE_URL } from "../../config";

export default function MyView() {
  const [isList, setTab] = useState(true);
  const [filterText, changeFilterText] = useState("");
  const [lists, setLists] = useState<BookmarkListSumType[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { token, userId } = authStore();

  // 리스트형으로 볼지 앨범형으로 볼지
  function tabList(): void {
    setTab(true);
  }
  function tabAlbum(): void {
    setTab(false);
  }

  const filterdLists = lists.filter((list) => list.title.includes(filterText));

  // 마운트할때 유저의 북마크 리스트들 요약
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/personal/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setLists(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      {/* 화면에 고정시킬 우측 상단들 */}
      <div className="fixed z-10 w-7/12">
        <div className="bg-white">
          <MainTab />
          {/* 상단 검색바 */}
          <SearchBar
            whatSearch={"북마크 리스트"}
            filterText={filterText}
            changeFilterText={changeFilterText}
          />
        </div>

        {/* 리스트 & 액자형 전환탭 */}
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

      {/* 북마크 리스트들*/}
      <div className="absolute top-36 w-7/12">
        {filterdLists.length === 0 ? (
          <NoContent content={"리스트"} />
        ) : (
          <>
            {!isList ? (
              <div className="flex justify-around ">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  {filterdLists.map((list) => (
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
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* 리스트 생성 버튼 */}
      <button
        className="fixed z-20 bottom-10 right-10"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <FaPlus color="skyblue" size={56} />
      </button>
      {/* 북마크리스트 생성 모달 */}
      <BookmarkListCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
