import React, { useEffect } from "react";
import { feedStore } from "../../stores/feedStore";
import { authStore } from "../../stores/authStore";

import ListsItem from "./ListsItem(Feed)";
import { API_BASE_URL } from "../../config";
import axios from "axios";
const NewBookmarkLists = () => {
  const { userId, token } = authStore()

  useEffect(() => {
    const feedApiBookmarklistResponse = axios.get(`${API_BASE_URL}/api/feed/list/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    console.log(feedApiBookmarklistResponse)
  })

  
  const { axiosResult } = feedStore();


  return (
    <>
      {/* 피드 북마크리스트 목록 */}
      <div id="feedBookMarkList">
        <div className="flex flex-col gap-3">
          {axiosResult?.lists.map((list) => (
            <div className="newBookMarkLists" key={list.id}>
              <ListsItem list={list} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewBookmarkLists;
