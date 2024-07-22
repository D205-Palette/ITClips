import ImageContainer from "./items/ImageContainer";
import DetailInfo from "./items/DetailInfo";
import UserActivityInfo from "./items/UserActivityInfo";

const ProfileCard = () => {

  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 프로필 이미지 컨테이너: 안에 이미지 이름을 넘겨주면 이미지 출력 */}
      <ImageContainer />
      {/* 제목, 이메일, 소개글 정보 컨테이너 */}
      <DetailInfo />
      {/* 팔로워, 팔로잉 리스트, 북마크 수 출력부분 */}
      <UserActivityInfo />
    </div>
  );
};

export default ProfileCard;

