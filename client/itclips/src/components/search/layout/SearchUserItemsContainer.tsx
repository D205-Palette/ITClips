import React from "react";

// components
import SearchUserItem from "../ui/SearchUserItem";

interface User {
  id: number;
  username: string;
  email: string;
  followers: number;
  following: number;
  listCount: number;
  roadmapCount: number;
}

interface UserProps {
  items: User[];
}

const SearchUserItemContainer: React.FC<UserProps> = ({ items }) => {

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((item) => (
      <div key={item.id}>
        <SearchUserItem item={item} />
      </div>
    ))}
    </div>
  );
};

export default SearchUserItemContainer;