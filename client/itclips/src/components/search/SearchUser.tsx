import React from "react";

// components
import SearchUserItem from "./layout/SearchUserItem";

const SearchUser = () => {

  // 더미 데이터
  const users = [
    { username: "고양양", email: "abc@gmail.com", followers: 100, following: 20, listCount: 5, roadmapCount: 2 },
    { username: "고양양", email: "abc@gmail.com", followers: 100, following: 20, listCount: 5, roadmapCount: 2 },
    { username: "고양양", email: "abc@gmail.com", followers: 100, following: 20, listCount: 5, roadmapCount: 2 },
    { username: "고양양", email: "abc@gmail.com", followers: 100, following: 20, listCount: 5, roadmapCount: 2 },
    { username: "고양양", email: "abc@gmail.com", followers: 100, following: 20, listCount: 5, roadmapCount: 2 },
  ]

  // 프로필 카드 클릭했을 때 사용자 프로필로 이동 기능 구현해야 됨

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        {users.map((user, index) => (
          <div>
            {/* 유저 검색 결과들 출력 아이템 */}
            <SearchUserItem
              key={index}
              username={user.username}
              email={user.email}
              followers={user.followers}
              following={user.following}
              listCount={user.listCount}
              roadmapCount={user.roadmapCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;