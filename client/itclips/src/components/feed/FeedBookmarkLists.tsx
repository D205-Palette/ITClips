import React, { useEffect, useState } from "react";
import { authStore } from "../../stores/authStore";

import ListsItem from "./ListsItem(Feed)";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";

const FeedBookmarkLists = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const { userId, token } = authStore();
  const [feedList, setfeedList] = useState([]);

  const fetchFeedPosts = async () => {
    try {
      const feedListResponse = await axios.get(
        `${API_BASE_URL}/api/feed/list/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDataLoaded(true);

      setfeedList(feedListResponse.data.reverse());      
    } catch (error) {      
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchFeedPosts();
    }
  }, [dataLoaded]);

  return (
    <>
      {/* 피드 북마크리스트 목록 */}
      <div id="feedBookMarkList">
        <div className="flex justify-center flex-col gap-3">
          {!dataLoaded ? (
            <div className="mt-10 flex justify-center">              
              <span className="loading loading-spinner loading-lg"></span>
            </div>

          ) : feedList.length !== 0 ? (
            feedList?.map((list) => <ListsItem list={list} />)
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

export default FeedBookmarkLists;
