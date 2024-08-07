import React, { useState, useEffect } from "react";

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
    <div className={`bg-base-100 text-base-content ${styles.container}`}>
      <div className={styles.searchTerms}>
        {rankItems.map((item, index) => (
          <div
            key={`${item.type}-${item.id}`}
            className={`${styles.term} ${index === currentIndex ? styles.active : ''}`}
          >
            {index + 1}. {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealtimeSidebar;