import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import FollowerItem from "./FollowerItem";

// apis
import { getFollowerList } from "../../api/followApi";

interface Follower {
  id: number;
  fromUserId: number;
  toUserId: number;
  nickname: string;
  profileImage: string;
  email: string;
}

const FollowerList = () => {

  const [ followerList, setFollowerList ] = useState<Follower[]>([]);
  const { userId } = useParams<{ userId: string }>();

  // 팔로워 목록 조회
  useEffect(() => {
    const fetchFollowerList = async () => {
      if (userId) {
        try {
          const response = await getFollowerList(parseInt(userId, 10));
          setFollowerList(response.data);
          console.log(response);
        } catch (error) {
          console.error("팔로워 목록 조회 실패", error);
        }
      }
    };

    fetchFollowerList();
  }, [userId]);
  
  return (
    <div className="mt-4">
      <FollowerItem items={followerList} />
    </div>
  );
};

export default FollowerList;