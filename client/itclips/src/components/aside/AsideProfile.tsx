import profileImage from "../../assets/images/profile_image.png"



// 일단 API 어떻게 들어올지 몰라서 임시로 받는 값 만들어 둠
interface ProfileProps {
  username: string;
  email: string;
  description: string;
  followers: number;
  following: number;
  listCount: number;
  bookmarkCount: number;
}

const ProfileCard = () => {

  // 더미 데이터
  const ProfileInfo: ProfileProps = {
    username: "고양양",
    email: "abc@gmail.com",
    description: "안녕하세요 고양양입니다. 재미있는 IT정보를 클립할거에여~",
    followers: 20,
    following: 40,
    listCount: 100,
    bookmarkCount: 55
  }

  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 프로필 이미지 */}
      <div className="mb-4">
        <img src={profileImage} className="w-16 h-16 bg-gray-200 rounded-full mb-4"></img>
      </div>
      <h2 className="text-xl font-bold mb-1">{ProfileInfo.username}</h2>
      <p className="text-gray-500 mb-2">{ProfileInfo.email}</p>
      <p className="text-center text-sm mb-6">{ProfileInfo.description}</p>
      {/* 팔로워, 팔로잉 리스트, 북마크 수 출력부분 */}
      <div className="w-full grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">팔로워</div>
          <div className="col-start-5 text-start font-bold">{ProfileInfo.followers}</div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">팔로잉</div>
          <div className="col-start-5 text-start font-bold">{ProfileInfo.following}</div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">리스트 개수</div>
          <div className="col-start-5 text-start font-bold">{ProfileInfo.listCount}</div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">북마크 개수</div>
          <div className="col-start-5 text-start font-bold">{ProfileInfo.bookmarkCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;