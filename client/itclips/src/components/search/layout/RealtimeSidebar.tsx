import React, { useState, useEffect } from "react";
import styles from "../styles/RealtimeSidebar.module.css";

interface SearchTerm {
  id: number;
  term: string;
}

const RealtimeSidebar = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  // 더미 데이터
  const searchTerms: SearchTerm[] = [
    { id: 1, term: "리눅스 초급자를 위한 리스트" },
    { id: 2, term: "리눅스 중급자를 위한 리스트" },
    { id: 3, term: "리눅스 고급자를 위한 리스트" },
    { id: 4, term: "유닉스 초급자를 위한 리스트" },
    { id: 5, term: "유닉스 중급자를 위한 리스트" },
    { id: 6, term: "유닉스 고급자를 위한 리스트" },
    { id: 7, term: "윈도우 초급자를 위한 리스트" },
    { id: 8, term: "윈도우 중급자를 위한 리스트" },
    { id: 9, term: "윈도우 고급자를 위한 리스트" },
    { id: 10, term: "이재용처럼 부자되는 리스트" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === searchTerms.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [searchTerms.length]);

  return (
    <div className={`bg-base-100 text-base-content ${styles.container}`}>
      <div className={styles.searchTerms}>
        {searchTerms.map((term, index) => (
          <div
            key={term.id}
            className={`${styles.term} ${index === currentIndex ? styles.active : ''}`}
          >
            {index + 1}. {term.term}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealtimeSidebar;