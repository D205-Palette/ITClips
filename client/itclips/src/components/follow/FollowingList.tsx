import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import FollowingItem from "./FollowingItem";

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

  const [ followingList, setFollowingList ] = useState<Following[]>([]);
  const { userId } = useParams<{ userId: string }>();

  // 팔로잉 목록 조회
  useEffect(() => {
    const fetchFollowingList = async () => {
      if (userId) {
        try {
          const response = await getFollowingList(parseInt(userId, 10));
          setFollowingList(response.data);          
        } catch (error) {
          console.error("팔로잉 목록 조회 실패", error);
        }
      }
    };

    fetchFollowingList();
  }, [userId]);

  return (
    <div className="mt-4">
      <FollowingItem items={followingList} />
    </div>
  );
};

export default FollowingList;