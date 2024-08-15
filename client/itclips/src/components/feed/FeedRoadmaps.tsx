import React, { useEffect, useState } from "react";
import { authStore } from "../../stores/authStore";
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
    } catch (error) {}
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
              <span className="loading loading-spinner loading-lg"></span>
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
