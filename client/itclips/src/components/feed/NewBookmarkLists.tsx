import React, { useEffect } from "react";
import { feedStore } from "../../stores/feedStore";
import ListsItem from "../main/ListsItem(List)";

const NewBookmarkLists = () => {
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
