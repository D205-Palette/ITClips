import React, { useState } from "react";

interface UserProps {
  username: string;
  email: string;
  followers: number;
  following: number;
  listCount: number;
  roadmapCount: number;
}

const SearchUserItem: React.FC<UserProps> = ({
  username,
  email,
  followers,
  following,
  listCount,
  roadmapCount
}) => {
  const [isFollow, setIsFollow] = useState(false);

  const toggleFollow = () => setIsFollow(!isFollow);

  return (
    <div className="w-80 bg-base-100 shadow-xl">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span className="text-xl">고</span>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">{username}</h2>
              <p className="text-xs text-gray-500">{email}</p>
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
            <p className="text-gray-500 mb-2">팔로워 <span className="font-bold text-black">{followers}</span></p>
            <p className="text-gray-500">리스트 <span className="font-bold text-black">{listCount}</span></p>
          </div>
          <div className="col-start-6 col-span-8">
            <p className="text-gray-500 mb-2">팔로잉 <span className="font-bold text-black">{following}</span></p>
            <p className="text-gray-500">로드맵 <span className="font-bold text-black">{roadmapCount}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUserItem;