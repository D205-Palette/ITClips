import React from "react";

// components
import SearchUserItem from "../ui/SearchUserItem";

interface User {
  id: number;
  email: string;
  nickname: string;
  birth: string;
  job: string;
  gender: boolean;
  bio: string;
  image: string;
  bookmarkListCount: number;
  roadmapCount: number;
  followerCount: number;
  followingCount: number;
  following: boolean;
  followers: boolean;
}

interface UserProps {
  items: User[];
}

const SearchUserItemContainer: React.FC<UserProps> = ({ items }) => {

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
      {items.map((item) => (
      <div key={item.id} className="p-2 md:p-4 rounded shadow">
        <SearchUserItem item={item} />
      </div>
    ))}
    </div>
  );
};

export default SearchUserItemContainer;