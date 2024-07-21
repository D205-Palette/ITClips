import profileImage from "../assets/profile_image.png"

// 일단 API 어떻게 들어올지 몰라서 임시로 받는 값 만들어 둠
interface ProfileCardProps {
  username: string;
  email: string;
  description: string;
  followers: number;
  following: number;
  listCount: number;
  bookmarkCount: number;
}

const ProfileCard = ({
  username,
  email,
  description,
  followers,
  following,
  listCount,
  bookmarkCount
}: ProfileCardProps) => {
  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 더보기 버튼 */}
      <div className="self-end">
        <button type="button" className="text-center">...</button>
      </div>
      {/* 프로필 이미지 */}
      <div className="mb-4">
        <img src={profileImage} className="w-16 h-16 bg-gray-200 rounded-full mb-4"></img>
      </div>
      <h2 className="text-xl font-bold mb-1">{username}</h2>
      <p className="text-gray-500 mb-2">{email}</p>
      <p className="text-center text-sm mb-6">{description}</p>
      {/* 팔로워, 팔로잉 리스트, 북마크 수 출력부분 */}
      <div className="w-full grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">팔로워</div>
          <div className="col-start-5 text-start font-bold">{followers}</div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">팔로잉</div>
          <div className="col-start-5 text-start font-bold">{following}</div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">리스트 개수</div>
          <div className="col-start-5 text-start font-bold">{listCount}</div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-2 text-start text-gray-500">북마크 개수</div>
          <div className="col-start-5 text-start font-bold">{bookmarkCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;