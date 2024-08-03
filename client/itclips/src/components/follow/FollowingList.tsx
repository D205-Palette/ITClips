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
}

const FollowingList = () => {

  const [ followingList, setFollowingList ] = useState<Following[]>([]);
  const { user_id } = useParams<{ user_id: string }>();

  // 팔로잉 목록 조회
  const fetchFollowingList = async () => {
    if (user_id) {
      try {
        const response = await getFollowingList(parseInt(user_id, 10));
        setFollowingList(response.data);
        console.log(response);
      } catch (error) {
        console.error("팔로잉 목록 조회 실패", error);
      }
    }
  };
  
  useEffect(() => {
    fetchFollowingList();
  }, [user_id]);

  return (
    <div className="mt-4">
      <FollowingItem items={followingList} />
    </div>
  );
};

export default FollowingList;