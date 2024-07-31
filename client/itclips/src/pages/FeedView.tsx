import React, { useEffect } from "react";
import { feedStore } from "../stores/feedStore";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import AsideProfile from "../components/aside/AsideProfile";

import FeedTab from "../components/feed/FeedTab";

import RoadMap from "../components/main/Roadmap(Feed)";

export default function FeedView() {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);

  const fetchFeedPosts = (userId: string) => {
    return axios
      .get(`/${userId}/feed`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching feed posts:", error);
        throw error;
      });
  };

  // useEffect(() => {
  //   if (user) {
  //     fetchFeedPosts(user.id)
  //       .then((posts) => setFeedPosts(posts))
  //       .catch((error) => {
  //         console.error("Failed to load feed posts:", error);
  //       });
  //   }
  // }, [user, setFeedPosts]);

  // if (!user) {
  //   return <div>Please log in to see your feed.</div>;
  // }

  const { setAxiosResult } = feedStore();

  useEffect(() => {
    // axiosResult를 설정 (여기서는 하드코딩된 값을 사용)
    const result = {
      lists: [
        {
          id: 1,
          image: "이미지 주소",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          title: "생성된 리스트_01",
          bookmark_list_tags: ["JAVA", "FE"],
          description: "리스트에 관한 설명",
          bookmark_list_like: 5,
          isCompleted: true,
        },
        {
          id: 2,
          image: "이미지 주소",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          title: "생성된 리스트_01",
          bookmark_list_tags: ["JAVA", "FE"],
          description: "리스트에 관한 설명",
          bookmark_list_like: 5,
          isCompleted: true,
        },
        {
          id: 3,
          image: "이미지 주소",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          title: "생성된 리스트_01",
          bookmark_list_tags: ["JAVA", "FE"],
          description: "리스트에 관한 설명",
          bookmark_list_like: 5,
          isCompleted: false,
        },
      ],
      roadmaps: [
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 1",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
          isPublic: 1,
          createdAt: "2024-07-30T16:11:21",
          stepCnt: 3, // 단계수
          checkCnt: 1, // 체크된 단계수
          likeCnt: 2, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 2",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-30T15:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 3, // 체크된 단계수
          likeCnt: 2, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 3",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-25T23:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 2, // 체크된 단계수
          likeCnt: 5, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 3",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-29T23:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 2, // 체크된 단계수
          likeCnt: 5, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 3",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-29T23:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 2, // 체크된 단계수
          likeCnt: 5, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 3",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-29T23:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 2, // 체크된 단계수
          likeCnt: 5, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 3",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-29T23:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 2, // 체크된 단계수
          likeCnt: 5, // 좋아요 수
        },
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 3",
          description: "피드용 새 로드맵 게시글 입니다.",
          image:
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
          isPublic: 1,
          createdAt: "2024-07-29T23:27:21",
          stepCnt: 3, // 단계수
          checkCnt: 2, // 체크된 단계수
          likeCnt: 5, // 좋아요 수
        },
      ],
    };

    setAxiosResult(result);
  }, [setAxiosResult]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div
          id="aside"
          className="xl:col-start-2 xl:col-span-3 hidden xl:block"
        >
          {/* aside 자리 */}
          <AsideProfile />
          {/* 여기에 프로필이나 메세지일때 넣기 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
            {isMessageOpen && <MessageLayout />}
          </div>
        </div>

        {/* main자리 */}
        <div
          id="main"
          className="xl:col-start-5 xl:col-span-7 col-start-3 col-span-8 flex flex-col gap-10"
        >
          <FeedTab />
          <Outlet />
        </div>
      </div>
    </>
  );
}
