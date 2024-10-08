import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import FollowerItem from "./FollowerItem";
import { FaPersonCircleExclamation } from "react-icons/fa6";
// apis
import { getFollowerList } from "../../api/followApi";

interface Follower {
  id: number;
  fromUserId: number;
  toUserId: number;
  nickname: string;
  profileImage: string;
  email: string;
  tagNames: string[];
}

const FollowerList = () => {
  const [followerList, setFollowerList] = useState<Follower[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const [noContent, setNoContent] = useState(
    <div className="w-full flex flex-row justify-center mt-6">
      <span className="loading loading-spinner loading-lg text-sky-500"></span>
    </div>
  );
  // 팔로워 목록 조회
  useEffect(() => {
    const fetchFollowerList = async () => {
      if (userId) {
        try {
          const response = await getFollowerList(parseInt(userId, 10));
          setFollowerList(response.data);
          setNoContent(
            <div className="mt-16 flex flex-row items-center gap-3 text-lg font-bold justify-center">
              <FaPersonCircleExclamation color="skyblue" size={32} /> 팔로워가
              없습니다
            </div>
          );
        } catch (error) {
          console.error("팔로워 목록 조회 실패", error);
        }
      }
    };

    fetchFollowerList();
  }, [userId]);

  return (
    <div className="mt-4">
      {followerList.length !== 0 ? (
        <FollowerItem items={followerList} />
      ) : (
        <>{noContent}</>
      )}
    </div>
  );
};

export default FollowerList;
