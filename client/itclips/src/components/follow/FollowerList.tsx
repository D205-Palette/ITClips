import { useParams } from "react-router-dom";

// components
import FollowerItem from "./FollowerItem";

interface User {
  id: number;
  username: string;
  imageUrl: string;
  email: string;
  tag: string;
}

const FollowerList = () => {

  const params = useParams();

  // 더미 데이터
  const data: User[] = [
    { id: 1, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 2, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 3, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 4, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그"},
  ]

  return (
    <div className="mt-4">
      {/* 추천 결과 */}
      <FollowerItem items={data} />
    </div>
  );
};

export default FollowerList;