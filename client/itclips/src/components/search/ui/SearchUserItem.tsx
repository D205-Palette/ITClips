import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// images
import noImage from "../../../assets/images/noImg.gif";

// apis
import { follow, unfollow } from "../../../api/followApi";

// stores
import { authStore } from "../../../stores/authStore";

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

interface SearchUserItemProps {
  item: User;
}

const SearchUserItem: React.FC<SearchUserItemProps> = ({ item: initialItem }) => {

  const myUserId = authStore(state => state.userId);
  const [item, setItem] = useState(initialItem);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  // 버튼 기능이 NavLink와 안겹치게 설정
  const handleNavLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleFollow = async (e: React.MouseEvent) => {
    handleNavLink(e);
    try {
      if (item.following) {
        await unfollow(myUserId, item.id);
        setItem(prev => ({
          ...prev,
          following: false,
          followerCount: prev.followerCount - 1
        }));
      } else {
        await follow(myUserId, item.id);
        setItem(prev => ({
          ...prev,
          following: true,
          followerCount: prev.followerCount + 1
        }));
      }
    } catch (error) {
      console.error("팔로우/언팔로우 중 오류 발생:", error);
      setToast({ 
        message: `${item.following ? '언팔로우' : '팔로우'} 작업 중 오류가 발생했습니다.`, 
        type: 'error' 
      });
    }
  };

  // 토스트 알람
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return(
    <div>
      <NavLink
          to={`/user/${item.id}`}
          className="w-full md:w-80 bg-base-100 shadow rounded"
        >
        <div className="card-body p-2 md:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8 md:w-10">
                  <img src={item.image === "default" ? noImage : item.image} alt={item.nickname} className="w-full object-cover" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-sm md:text-lg">{item.nickname}</h2>
                <p className="text-xs md:text-sm text-gray-500">{item.email}</p>
              </div>
            </div>
            <button
              className={`btn btn-xs md:btn-sm ${item.following ? 'text-base-100 btn-error' : 'btn-info'}`} 
              onClick={toggleFollow}
            >
              {item.following ? '언팔로우' : '팔로우'}
            </button>
          </div>
          <p className="text-xs md:text-sm mt-1 md:mt-2 flex justify-center">{item.bio}</p>
          <div className="grid grid-cols-12 gap-1 md:gap-2 mt-1 md:mt-2 text-xs md:text-sm">
            <div className="col-start-4 col-span-4">
              <p className="text-gray-500 mb-1 md:mb-2">팔로워 <span className="font-bold text-black">{item.followerCount}</span></p>
              <p className="text-gray-500">리스트 <span className="font-bold text-black">{item.bookmarkListCount}</span></p>
            </div>
            <div className="col-start-8 col-span-8">
              <p className="text-gray-500 mb-1 md:mb-2">팔로잉 <span className="font-bold text-black">{item.followingCount}</span></p>
              <p className="text-gray-500">로드맵 <span className="font-bold text-black">{item.roadmapCount}</span></p>
            </div>
          </div>
        </div>
      </NavLink>

      {toast && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-2 md:p-4 rounded-md ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white shadow-lg z-50 transition-opacity duration-300 text-xs md:text-sm`}
        >
          {toast.message}
        </div>
      )}

    </div>
  );
};

export default SearchUserItem;