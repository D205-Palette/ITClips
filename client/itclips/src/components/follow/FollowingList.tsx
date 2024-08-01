// components
import FollowingItem from "./FollowingItem";

interface User {
  id: number;
  username: string;
  imageUrl: string;
  email: string;
  tag: string;
}

const FollowingList = () => {

  // 더미 데이터
  const data: User[] = [
    { id: 1, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 2, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 3, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 4, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 5, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 6, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 7, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 8, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 9, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
    { id: 10, username: "고양양", imageUrl: "", email: "abc@gmail.com", tag: "#관심사1 #관심사2 #태그" },
  ]

  return (
    <div className="mt-4">
      <FollowingItem items={data} />
    </div>
  );
};

export default FollowingList;