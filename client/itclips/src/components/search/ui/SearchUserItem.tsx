import { NavLink } from "react-router-dom";
import { useState } from "react";

// images (임시)
import image from "../../../assets/images/profile_image.png";

interface User {
  id: number;
  username: string;
  email: string;
  followers: number;
  following: number;
  listCount: number;
  roadmapCount: number;
}

interface SearchUserItemProps {
  item: User;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ item }) => {

  // 더보기 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const [isFollow, setIsFollow] = useState(false);

  const toggleFollow = (e: React.MouseEvent) => {
    handleNavLink(e);
    setIsFollow(!isFollow);
  };

  return(
    <div>
      <NavLink
          to={`/user/${item.id}`}
          className="w-80 bg-base-100 shadow rounded"
        >
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                  <img src={image} alt={item.username} className="w-full object-cover" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-lg">{item.username}</h2>
                <p className="text-xs text-gray-500">{item.email}</p>
              </div>
            </div>
            {/* 팔로우 버튼 */}
            <button 
            className={`btn btn-sm ${isFollow ? 'btn-error' : 'btn-primary'}`} 
            onClick={toggleFollow}
          >
            {isFollow ? '언팔로우' : '팔로우'}
          </button>
          </div>
          <p className="text-sm mt-2 flex justify-center">안녕하세요 고양친구입니다~</p>
          <div className="grid grid-cols-8 gap-2 mt-2 text-sm">
            <div className="col-start-2 col-span-4">
              <p className="text-gray-500 mb-2">팔로워 <span className="font-bold text-black">{item.followers}</span></p>
              <p className="text-gray-500">리스트 <span className="font-bold text-black">{item.listCount}</span></p>
            </div>
            <div className="col-start-6 col-span-8">
              <p className="text-gray-500 mb-2">팔로잉 <span className="font-bold text-black">{item.following}</span></p>
              <p className="text-gray-500">로드맵 <span className="font-bold text-black">{item.roadmapCount}</span></p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchUserItem;