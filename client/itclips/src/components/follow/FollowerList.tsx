import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import FollowerItem from "./FollowerItem";

// apis
import { getFollowingList } from "../../api/followApi";

// stores
import { authStore } from "../../stores/authStore";

interface Follower {
  id: number;
  fromUserId: number;
  toUserId: number;
  nickname: string;
  profileImage: string;
  email: string;
}

const FollowerList = () => {

  const [ followingList, setFollowingList ] = useState<Follower[]>([]);
  const { user_id } = useParams<{ user_id: string }>();
  const token = authStore(state => state.token);

  // 팔로우 목록 조회
  useEffect(() => {
    const fetchFollowingList = async () => {
      if (user_id) {
        try {
          const response = await getFollowingList(parseInt(user_id, 10), token);
          setFollowingList(response.data);
          console.log(response);
        } catch (error) {
          console.error("팔로우 목록 조회 실패", error);
        }
      }
    };
    fetchFollowingList();
  }, [user_id, token]);

  return (
    <div className="mt-4">
      {/* 추천 결과 */}
      <FollowerItem items={followingList} />
    </div>
  );
};

export default FollowerList;