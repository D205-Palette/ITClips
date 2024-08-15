import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import FollowingItem from "./FollowingItem";
import { FaPersonCircleExclamation } from "react-icons/fa6";
// apis
import { getFollowingList } from "../../api/followApi";

interface Following {
  id: number;
  fromUserId: number;
  toUserId: number;
  nickname: string;
  profileImage: string;
  email: string;
  tagNames: string[];
}

const FollowingList = () => {
  const [followingList, setFollowingList] = useState<Following[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const [noContent, setNoContent] = useState(
    <div className="w-full flex flex-row justify-center mt-6">
      <span className="loading loading-spinner loading-lg text-sky-500"></span>
    </div>
  );

  // 팔로잉 목록 조회
  useEffect(() => {
    const fetchFollowingList = async () => {
      if (userId) {
        try {
          const response = await getFollowingList(parseInt(userId, 10));
          setFollowingList(response.data);
          setNoContent(
            <div className="mt-16 flex flex-row items-center gap-3 text-lg font-bold justify-center">
              <FaPersonCircleExclamation color="skyblue" size={32} /> 팔로잉이
              없습니다!
            </div>
          );
        } catch (error) {
          console.error("팔로잉 목록 조회 실패", error);
        }
      }
    };

    fetchFollowingList();
  }, [userId]);

  return (
    <div className="mt-4">
      {followingList.length !== 0 ? (
        <FollowingItem items={followingList} />
      ) : (
        <>{noContent}</>
      )}
    </div>
  );
};

export default FollowingList;
