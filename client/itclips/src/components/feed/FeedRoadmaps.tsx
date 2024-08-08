import React, { useEffect, useState } from "react";
import { authStore } from "../../stores/authStore";
import { feedStore } from "../../stores/feedStore";
import Roadmap from "./Roadmap(Feed)";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { IoIosWarning } from "react-icons/io";

const FeedRoadmaps = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const { userId, token } = authStore();
  const [feedRoadmap, setfeedRoadmap] = useState([]);

  const fetchFeedPosts = async () => {
    try {
      const feedRoadmapResponse = await axios.get(
        `${API_BASE_URL}/api/feed/roadmap/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDataLoaded(true);
      setfeedRoadmap(feedRoadmapResponse.data.reverse());

      console.log(feedRoadmap);
    } catch (error) {
      console.log("데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchFeedPosts();
    }
  }, [dataLoaded]);

  return (
    <>
      {/* 피드 로드맵 목록 */}
      <div id="feedRoadmaps">
        <div className="flex flex-col gap-3">
          {!dataLoaded ? (
            <div className="mt-10 flex justify-center">
              <p className="ms-3 text-xl font-bold">로딩 중 입니다...</p>
            </div>
          ) : feedRoadmap.length !== 0 ? (
            feedRoadmap?.map((roadmap) => (
              <div>
                <Roadmap roadmap={roadmap} />
              </div>
            ))
          ) : (
            <div className="mt-10 flex justify-center items-center">
              <IoIosWarning color="skyblue" size={20} />
              <p className="ms-3 text-xl font-bold">컨텐츠가 없습니다!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedRoadmaps;
