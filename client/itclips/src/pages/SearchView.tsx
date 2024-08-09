import React, { useState } from 'react';

// components
import SearchBar from "../components/search/ui/SearchBar";
import RealtimeList from "../components/search/RealtimeList";
import SearchMain from "../components/search/SearchMain";
import SearchUser from "../components/search/SearchUser";
import SearchBookmarkList from "../components/search/SearchBookmarkList";
import SearchRoadmap from "../components/search/SearchRoadmap.tsx";
import SearchTag from "../components/search/SearchTag";
import RealtimeSidebar from "../components/search/layout/RealtimeSidebar";

// stores
import { asideStore } from "../stores/asideStore";

const SearchView = () => {

  const [ whatCategory, setWhatCategory ] = useState("카테고리");
  const [ keyword, setKeyword ] = useState("");

  const selectCategory = (category: string, keyword: string) => {
    setWhatCategory(category);
    setKeyword(keyword);
  }

  // 검색바에서 어떤 카테고리 골랐는지에 따라 검색 메인에 출력되는 컴포넌트 다르게

  return (
    <>
      <div id='Body' className="grid grid-cols-12 gap-4">        

        {/* main자리 */}
        <div id="Main" className="lg:col-start-2 lg:col-span-8 md:col-start-2 md:col-span-5 sm:col-start-2 sm:col-span-6">
          <div className="container mx-auto p-4">
            <div className=" md:flex-row justify-between gap-4 mb-4">
              {/* 검색 바 */}
              <div className="w-full">
                <SearchBar handleCategory={selectCategory} />
              </div>
              {/* 카테고리 조건에 따라 검색 컴포넌트 변경 */}
              {/* 검색 버튼을 눌렀을 때 적용되게 */}
              { whatCategory === "카테고리" && <SearchMain /> }
              { whatCategory === "유저" && <SearchUser keyword={keyword} /> }
              { whatCategory === "북마크리스트" && <SearchBookmarkList keyword={keyword} /> }
              { whatCategory === "로드맵" && <SearchRoadmap keyword={keyword} /> }
              { whatCategory === "태그" && <SearchTag keyword={keyword} /> }
            </div>
          </div>
        </div>

        <div className="col-start-10 col-span-2">
          <div className="my-6">
            <RealtimeSidebar />
          </div>
          {/* 실시간 인기 순위는 검색 메인에서만 */}
          { whatCategory === "카테고리" && (
            <div className="w-60">
              <RealtimeList />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchView;