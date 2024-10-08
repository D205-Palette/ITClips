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
import { useParams } from "react-router-dom";
import mainStore from "../../stores/mainStore";

export default function MyView() {
  const params = useParams();

  const { token, userId } = authStore();
  const { isBookmarkListChange, setIsBookmarkListChange } = mainStore();

  const [isList, setTab] = useState(true);
  const [filterText, changeFilterText] = useState("");
  const [lists, setLists] = useState<BookmarkListSumType[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [filterdLists, setFilterdLists] = useState<BookmarkListSumType[]>([]);
  const [noContent, setNoContent] = useState(
    <div className="w-full flex flex-row justify-center mt-6">
      <span className="loading loading-spinner loading-lg text-sky-500"></span>
    </div>
  );

  // 리스트형으로 볼지 앨범형으로 볼지
  function tabList(): void {
    setTab(true);
  }
  function tabAlbum(): void {
    setTab(false);
  }
  
  // 북마크 리스트 변화할때 유저의 북마크 리스트들 요약
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/personal/${params.userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          viewerId: userId,
        },
      })
        .then((res) => {
          setLists(res.data);
          setFilterdLists(
            res.data
          );
          setIsBookmarkListChange(false);

          setNoContent(<NoContent content={"리스트"} />);
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, [isBookmarkListChange, params.userId]);

  // 검색어 변경시 리스트 변경
  useEffect(() => {
    setFilterdLists(lists.filter((list) => list.title.toLowerCase().includes(filterText.toLowerCase())));
  }, [filterText]);

  return (
    <>
      {/* 화면에 고정시킬 우측 상단들 */}
      <div className="sticky top-16 z-20 w-full">
        <div className="bg-base-100">
          <MainTab userId={Number(params.userId)} />
          {/* 상단 검색바 */}
          <SearchBar
            whatSearch={"북마크 리스트"}
            filterText={filterText}
            changeFilterText={changeFilterText}
          />
        </div>

        {/* 리스트 & 액자형 전환탭 */}
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

      {/* 북마크 리스트들*/}
      <div className="">
        {filterdLists.length === 0 ? (
          noContent
        ) : (
          <>
            {!isList ? (
              <div className="flex justify-around ">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-2 gap-y-6 ">
                  {filterdLists.map((list) => (
                    <MyBookmarkListAlbum
                      whatMenu="리스트"
                      list={list}
                      canEdit={params.userId === String(userId)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {filterdLists.map((list) => (
                  <div
                    className={
                      (params.userId === String(userId) || list.isPublic
                        ? ""
                        : "hidden ") + " my-1"
                    }
                  >
                    <MyBookmarkList whatMenu="리스트" list={list} />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* 리스트 생성 버튼 */}
      <div className="fixed bottom-24 right-16 z-20 hidden md:flex  ">
        <button
          className={(Number(params.userId) !== userId ? "hidden" : "") + " "}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <FaPlus color="skyblue" size={56} />
        </button>
      </div>

      {/* 북마크리스트 생성 모달 */}
      <BookmarkListCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />  
    </>
  );
}
