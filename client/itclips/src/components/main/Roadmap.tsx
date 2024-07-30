// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from "../../stores/darkModeStore";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

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

const percentage = ((checkedList.length * 100) / bookmarkLists.length).toFixed(1);

// 이걸로 로드맵 세부정보 axios 호출

const RoadMap: FC<Props> = ({ roadmapId }) => {
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };

  const isDark = darkModeStore((state) => state.isDark);

  // const [isDropDown, setIsDropDown] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={
          (isDark ? "hover:bg-slate-700" : "hover:bg-slate-100") +
          " card card-side bg-base-100 shadow-xl hover:cursor-pointer h-32 my-1"
        }
      >
        <>
          <figure className="w-28  z-20">
            <img src={roadmap.image} alt="Movie" className="h-full" />
          </figure>

          <div className="card-body flex flex-row justify-between h-full relative">
            <div
              className={
                (!isDark
                  ? percentage == "100"
                    ? "bg-green-300"
                    : "bg-sky-100"
                  : percentage == "100"
                  ? "bg-green-900"
                  : "bg-sky-900") + " h-full absolute z-0 top-0 left-0"
              }
              style={{ width: `${percentage}%` }}
            ></div>
            <div className="flex flex-col justify-around z-20">
              <div onClick={() => navigate(":roadmap_id")}>
                <h2 className=" card-title">{roadmap.title}</h2>
              </div>

              <div>
                <p>{roadmap.description}</p>
              </div>
            </div>

            <div className=" items-center text-blue-400 font-bold text-xl z-0 hidden lg:inline-flex">
              <p
                className={
                  !isDark
                    ? percentage == "100"
                      ? "text-green-500"
                      : "text-blue-400"
                    : percentage == "100"
                    ? "text-green-200"
                    : "text-blue-200"
                }
              >
                {percentage + "%"}
              </p>
            </div>

            <div className="card-actions justify-end flex items-center">
              <button onClick={clickHeart} className="btn btn-ghost z-0 ">
                {isLike ? <FaHeart /> : <FaRegHeart />}
                {roadmap.likeCnt}{" "}
              </button>
              <button className="hidden md:inline">
                <KebabDropdown whatMenu="로드맵" id={roadmap.id} />
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default RoadMap;
