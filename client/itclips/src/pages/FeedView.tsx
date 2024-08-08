import React, { useEffect } from "react";
import { feedStore } from "../stores/feedStore";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import AsideProfile from "../components/aside/AsideProfile";

import FeedTab from "../components/feed/FeedTab";

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
    // const feedApiResponse = axios.get(`${API_BASE_URL}/api/`)

    
    // axiosResult를 설정 (여기서는 하드코딩된 값을 사용)
    const result = {
      lists: [
        // id: number;
        // user: string;
        // title: string;
        // description: string;
        // createdAt: string;
        // image: string;
        // bookmarks: object[];
        // bookmark_list_tags: string[];
        // bookmark_list_like: number;

        {
          id: 1,
          user: "joon",
          title: "생성된 리스트_01",
          description:
            "리스트에 관한 설명 리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명",
          createdAt: "2024-07-30T16:11:21",
          image:
            "https://i.namu.wiki/i/D5L06L99Z46x9rni9Zo22DHkHkL9j_xMcKd0ztGQVIf2jsl5cuVj0utmErS0UGS1q6LyxBeinJnRIIXCBKZsF8GpU68iig24ZvT386FyAePlD_oPt7WUZOStoumOTzegAxMQl-WjPB4X1GMJ_A31-Q.svg",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          bookmark_list_tags: ["JAVA", "FE"],
          bookmark_list_like: 5,
        },

        {
          id: 2,
          user: "joon",
          title: "생성된 리스트_01",
          description:
            "리스트에 관한 설명 리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명",
          createdAt: "2024-07-30T16:11:21",
          image:
            "data:image/jpeg;base64,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",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          bookmark_list_tags: ["JAVA", "FE"],
          bookmark_list_like: 5,
        },
        {
          id: 3,
          user: "joon",
          title: "생성된 리스트_01",
          description:
            "리스트에 관한 설명 리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명",
          createdAt: "2024-07-30T16:11:21",
          image: "https://picsum.photos/200/300",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          bookmark_list_tags: ["JAVA", "FE"],
          bookmark_list_like: 5,
        },
        {
          id: 5,
          user: "joon",
          title: "생성된 리스트_01",
          description:
            "리스트에 관한 설명 리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명",
          createdAt: "2024-07-30T16:11:21",
          image: "https://picsum.photos/200/300",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          bookmark_list_tags: ["JAVA", "FE"],
          bookmark_list_like: 5,
        },
        {
          id: 4,
          user: "joon",
          title: "생성된 리스트_01",
          description:
            "리스트에 관한 설명 리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명리스트에 관한 설명",
          createdAt: "2024-07-30T16:11:21",
          image: "https://picsum.photos/200/300",
          bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
          bookmark_list_tags: ["JAVA", "FE"],
          bookmark_list_like: 5,
        },
      ],
      roadmaps: [
        {
          id: 1,
          userName: "joon",
          title: "새 로드맵 1",
          description:
            "EcoSustain 프로젝트는 지속 가능한 환경을 위한 혁신적인 솔루션을 개발하는 것을 목표로 합니다. 이 프로젝트는 재생 가능 에너지, 친환경 건축 자재, 그리고 폐기물 감소를 중심으로 한 통합 시스템을 설계하고 구현합니다. EcoSustain는 지역 사회와 협력하여 에너지 효율적인 기술을 도입하고, 최신 연구 결과를 바탕으로 환경에 미치는 영향을 최소화하는 방법을 모색합니다. 프로젝트의 핵심은 지속 가능한 도시 개발을 지원하는 기술적 솔루션을 제공하는 것이며, 이를 통해 기후 변화에 대응하고, 미래 세대에게 깨끗한 지구를 물려주기 위한 실질적인 변화를 일으키는 것입니다.",
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
          description:
            "피드용 새 로드맵 게시글 입니다. 피드용 새 로드맵 게시글 입니다.피드용 새 로드맵 게시글 입니다.피드용 새 로드맵 게시글 입니다.피드용 새 로드맵 게시글 입니다.",
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
        </div>

        {/* main자리 */}
        <div
          id="main"
          className="relative xl:col-start-5 xl:col-span-7 col-start-3 col-span-8 flex flex-col"
        >
          <div className="sticky top-16 z-10 bg-base-100">
            <FeedTab />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
