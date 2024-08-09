import MyBookmarkList from "../../components/main/ListsItem(List)";
import MyBookmarkListAlbum from "../../components/main/ListsItem(Album)";
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import axios from "axios";
import { BookmarkListSumType } from "../../types/BookmarkListType";
import NoContent from "./NoContent";
import { authStore } from "../../stores/authStore";
import { API_BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
const MyGroupBookmarkList = () => {
  const [filterText, changeFilterText] = useState("");
  const [isList, setTab] = useState(true);
  const [lists, setLists] = useState<BookmarkListSumType[]>([]);
  const filterdLists = lists.filter((list) => list.title.includes(filterText)); //||list.tags.includes({title:filterText}))
  const { token, userId } = authStore();
  const params = useParams();
  function tabList(): void {
    setTab(true);
  }
  function tabAlbum(): void {
    setTab(false);
  }
  // 그룹 북마크들 api
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/group/${params.userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          viewerId: userId,
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
      <div className="fixed z-10 w-7/12">
        <div className="bg-base-100">
          <MainTab userId={Number(params.userId)} />
          <SearchBar
            whatSearch={"그룹 북마크 리스트"}
            filterText={filterText}
            changeFilterText={changeFilterText}
          />
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
          <NoContent content={"즐겨찾기"} />
        ) : (
          <>
            {!isList ? (
              <div className="flex justify-around ">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
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
                        : "hidden ") + +" my-1"
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
    </>
  );
};

export default MyGroupBookmarkList;
