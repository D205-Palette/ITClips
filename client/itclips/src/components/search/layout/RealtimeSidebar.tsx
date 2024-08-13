import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// styles
import styles from "../styles/RealtimeSidebar.module.css";

// apis
import { getBookmarkListHitRank, getRoadmapHitRank } from "../../../api/rankApi";

interface Item {
  id: number;
  title: string;
  count: number;
}

// map 돌릴때 유일한 key 필요해서 어쩔수 없이 이렇게 만듦;;
interface RankItem extends Item {
  type: 'bookmark' | 'roadmap';
}

const RealtimeSidebar = () => {

  const [rankItems, setRankItems] = useState<RankItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchRankData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === rankItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [rankItems.length]);

  const fetchRankData = async () => {
    try {
      const bookmarkRank: Item[] = (await getBookmarkListHitRank()).data;
      const roadmapRank: Item[] = (await getRoadmapHitRank()).data;

      const bookmarkData: RankItem[] = bookmarkRank.map(item => ({ ...item, type: 'bookmark' as const }));
      const roadmapData: RankItem[] = roadmapRank.map(item => ({ ...item, type: 'roadmap' as const }));

      const combinedRank = [...bookmarkData, ...roadmapData]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setRankItems(combinedRank);
    } catch (error) {
      console.error("Error fetching rank data:", error);
      setRankItems([]);
    }
  };

  return (
    <div className="bg-base-100 text-base-content p-1 md:p-2 mx-auto w-full md:w-[300px] ml-0">
      <div className={styles.searchTerms}>
        {rankItems.map((item, index) => (
          <div 
            key={`${item.type}-${item.id}`}
            className={styles.term}
            style={{
              top: `${(index - currentIndex) * 100}%`,
            }}
          >
            <NavLink
              to={item.type === 'bookmark' ? `/bookmarklist/${item.id}` : `/roadmap/${item.id}`}
              className="flex items-center px-2 md:px-4"
            >
              <span className="font-semibold mr-1 md:mr-2 w-4 md:w-6 text-center text-xs md:text-base">{index + 1}.</span>
              <span className="truncate flex-grow max-w-[200px] md:max-w-[350px] text-xs md:text-base">{item.title}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealtimeSidebar;