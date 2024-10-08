import React, { useState, useEffect } from "react";

// components
import SearchBar from "../components/search/ui/SearchBar";
import RealtimeList from "../components/search/RealtimeList";
import SearchMain from "../components/search/SearchMain";
import SearchUser from "../components/search/SearchUser";
import SearchBookmarkList from "../components/search/SearchBookmarkList";
import SearchRoadmap from "../components/search/SearchRoadmap.tsx";
import SearchTag from "../components/search/SearchTag";
import RealtimeSidebar from "../components/search/layout/RealtimeSidebar";

const SearchView = () => {
  const [whatCategory, setWhatCategory] = useState("카테고리");
  const [keyword, setKeyword] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const selectCategory = (category: string, keyword: string) => {
    if (category === "카테고리") {
      setNotification({ message: "검색할 항목을 선택해주세요.", type: "error" });
      return;
    }
    setWhatCategory(category);
    setKeyword(keyword);
  };

  // 3초간 토스트알림 띄우기
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const isSpecificSearch = ["유저", "북마크리스트", "로드맵", "태그"].includes(whatCategory);

  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-4">
        {/* main 자리 */}
        <div
          id="Main"
          className={`col-span-12 px-4 ${isSpecificSearch ? 'md:col-start-3 md:col-span-8' : 'md:col-start-2 md:col-span-7'}`}
        >
          <div className="container mx-auto p-4">
            <div className="md:flex-row justify-between gap-4 mb-4">
              {/* 새로 추가된 RealtimeSidebar */}
              {isSpecificSearch && keyword && (
                <div className="mb-2">
                  <RealtimeSidebar />
                </div>
              )}

              {/* 검색 바 */}
              <div className="w-full">
                <SearchBar handleCategory={selectCategory} />
              </div>
              
              {/* 카테고리 조건에 따라 검색 컴포넌트 변경 */}
              {whatCategory === "카테고리" && <SearchMain />}
              {whatCategory === "유저" && <SearchUser keyword={keyword} />}
              {whatCategory === "북마크리스트" && <SearchBookmarkList keyword={keyword} />}
              {whatCategory === "로드맵" && <SearchRoadmap keyword={keyword} />}
              {whatCategory === "태그" && <SearchTag keyword={keyword} />}
            </div>
          </div>
        </div>

        {/* 기존 RealtimeSidebar 및 RealtimeList - 카테고리 페이지에서만 표시 */}
        {!isSpecificSearch && (
          <div className="hidden md:block col-start-9 col-span-3">
            <div className="my-6">
              <RealtimeSidebar />
            </div>
            <div className="w-60">
              <RealtimeList />
            </div>
          </div>
        )}
      </div>

      {/* 토스트 알림 */}
      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white shadow-lg z-50 transition-opacity duration-300`}
          style={{
            opacity: notification ? 1 : 0,
            visibility: notification ? "visible" : "hidden",
          }}
        >
          {notification.message}
        </div>
      )}
    </>
  );
};

export default SearchView;