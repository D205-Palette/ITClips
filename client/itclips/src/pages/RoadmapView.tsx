import SearchBar from "../components/main/MainSearchBar";
import CategoryTab from "../components/main/CategoryTab";
import mainStore from "../stores/mainStore";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import MainTab from "../components/main/MainTab";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ListItem from "../components/main/ListsItem(Roadmap)";
import { useEffect, useState } from "react";
import darkModeStore from "../stores/darkModeStore";
interface Props {
  roadmapId: number;
}

// prop으로 받은 로드맵 id 로 axios 호출해서 조회
const roadmap = {
  id: 1,
  userId: 1,
  userName: "UserOne",
  title: "First Roadmap",
  description: "This is the description for the first roadmap",
  createdAt: "2024-07-24T05:41:26",
  image:
    "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
  isPublic: 1,
  stepList: [
    {
      id: 1,
      roadmapId: 1,
      bookmarkListResponseDTO: {
        id: 1,
        title: "My First Bookmark List",
        description: "This is a description for the first bookmark list",
        bookmarkCount: 0,
        likeCount: 1,
        image:
          "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        tags: [],
        users: [],
      },
      check: 0,
      order: 1,
    },
    {
      id: 2,
      roadmapId: 1,
      bookmarkListResponseDTO: {
        id: 3,
        title: "UserOne Second Bookmark List",
        description: "This is a description for UserOne's second bookmark list",
        bookmarkCount: 0,
        likeCount: 1,
        image:
          "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        tags: [],
        users: [],
      },
      check: 1,
      order: 2,
    },
    {
      id: 3,
      roadmapId: 1,
      bookmarkListResponseDTO: {
        id: 3,
        title: "UserOne Second Bookmark List",
        description: "This is a description for UserOne's second bookmark list",
        bookmarkCount: 0,
        likeCount: 1,
        image:
          "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        tags: [],
        users: [],
      },
      check: 1,
      order: 2,
    },
  ],
  commentList: [
    {
      id: 1,
      comment: "This is a comment on the first roadmap by UserOne",
      userId: 1,
      userName: "UserOne",
      createdAt: "2024-07-24T05:41:26",
      roadmapId: 1,
    },
    {
      id: 2,
      comment: "This is a comment on the first roadmap by Admin",
      userId: 2,
      userName: "AdminUser",
      createdAt: "2024-07-24T05:41:26",
      roadmapId: 1,
    },
  ],
  likeCnt: 2,
};

const bookmarkLists = roadmap.stepList;

const checkedList = bookmarkLists.filter((list) => list.check);

// useEffect(() => {

// const bookmarkLists = roadmap.stepList;

// const checkedList = bookmarkLists.filter((list) => list.check);

// const percentage = ((checkedList.length * 100) / bookmarkLists.length).toFixed(1);
//   // return () => {
//   //   connection.disconnect();
//   // };
// }, [bookmarkLists]);

const RoadmapView = () => {
  const bookmarks = mainStore((state) => state.bookmarks);
  // const lists = mainStore((state) => state.lists);
  // const completedList = lists.filter((list)=>list.isCompleted)
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const navigate = useNavigate();
  const isDark = darkModeStore((state) => state.isDark);

  const [count, changeCount] = useState(checkedList.length);

  const percentage = ((count * 100) / bookmarkLists.length).toFixed(1);

  const BackButton = (): any => {
    return (
      <button className="me-5  " onClick={() => navigate(-1)}>
        <IoIosArrowBack size="40px" />{" "}
      </button>
    );
  };

  return (
    <>
      <div className="grid  grid-cols-7">
        <div className="col-span-7">
          <MainTab />
        </div>

        <div className="col-span-7 flex flex-row justify-between my-9">
          <div>
            <BackButton />
          </div>
          <div
            className={
              (!isDark
                ? percentage === "100.0"
                  ? "text-green-300"
                  : "text-sky-500"
                : percentage === "100.0"
                ? "text-green-700"
                : "text-sky-400") + " flex items-center text-3xl font-bold"
            }
          >
            {`${percentage}` + "%"}
          </div>
          {/* 퍼센트 계산 방법이.... 전체 필터걸어서 isCompleted된거 구하는거긴한데... */}
        </div>

        {roadmap.stepList.map((list) => (
          <ListItem list={list} changeCount={changeCount} />
        ))}
      </div>
    </>
  );
};

export default RoadmapView;
