import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// apis
import { getBookmarkListScrapRank, getBookmarkListHitRank, getBookmarkListLikeRank, getRoadmapHitRank, getRoadmapLikeRank, getRoadmapScrapRank } from '../../api/rankApi';

interface Item {
  id: number;
  title: string;
  count: number;
}

// map 돌릴때 유일한 key 필요해서 어쩔수 없이 이렇게 만듦;;
interface RankItem extends Item {
  type: 'bookmarkList' | 'roadmap';
}

const RealtimeList = () => {
  
  const [sortBy, setSortBy] = useState<'views' | 'scraps' | 'likes'>('views');
  const [ rankItems, setRankItems ] = useState<RankItem[]>([]);

  // 선택된 카테고리에 맞게 랭크 리스트(북마크리스트 + 로드맵) 조회
  useEffect(() => {
    fetchRankData(sortBy);
  }, [sortBy]);

  const fetchRankData = async (criteria: 'views' | 'scraps' | 'likes') => {
    try {
      let bookmarkRank: Item[], roadmapRank: Item[];

      switch (criteria) {
        case 'views':
          bookmarkRank = (await getBookmarkListHitRank()).data;
          roadmapRank = (await getRoadmapHitRank()).data;
          break;
        case 'scraps':
          bookmarkRank = (await getBookmarkListScrapRank()).data;
          roadmapRank = (await getRoadmapScrapRank()).data;
          break;
        case 'likes':
          bookmarkRank = (await getBookmarkListLikeRank()).data;
          roadmapRank = (await getRoadmapLikeRank()).data;
          break;
        default:
          bookmarkRank = [];
          roadmapRank = [];
      }

      const bookmarkData: RankItem[] = bookmarkRank.map(item => ({ ...item, type: 'bookmarkList' as const }));
      const roadmapData: RankItem[] = roadmapRank.map(item => ({ ...item, type: 'roadmap' as const }));

      const combinedRank = [...bookmarkData, ...roadmapData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setRankItems(combinedRank);
    } catch (error) {
      console.error(`Error fetching ${criteria} rank data:`, error);
      setRankItems([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  const handleSortChange = (newSortBy: 'views' | 'scraps' | 'likes') => {
    setRankItems([]); // 데이터 초기화
    setSortBy(newSortBy);
  };

  return (
    <div className="bg-base-100 p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">실시간 인기순위</h2>
      <div className="flex mb-3 border-b">
        <button 
          className={`mr-4 pb-2 text-sm ${
            sortBy === 'views' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`} 
          onClick={() => handleSortChange('views')}
        >
          조회수
        </button>
        <button 
          className={`mr-4 pb-2 text-sm ${
            sortBy === 'scraps' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`} 
          onClick={() => handleSortChange('scraps')}
        >
          스크랩수
        </button>
        <button 
          className={`mr-4 pb-2 text-sm ${
            sortBy === 'likes' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`} 
          onClick={() => handleSortChange('likes')}
        >
          좋아요수
        </button>
      </div>
      <ul className="space-y-2">
        {rankItems.map((item, index) => (
          <NavLink 
            to={item.type === "bookmarkList" ? `/bookmarkList/${item.id}` : item.type === "roadmap" ? `/roadmap/${item.id}` : ''}
            className="flex items-center py-2"
            key={`${item.type}-${item.id}`}
          >
            <span className="w-6 mr-3 text-sm">
              {index + 1}
            </span>
            <div className="hover:text-blue-500 text-sm">
              {item.title}
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default RealtimeList;