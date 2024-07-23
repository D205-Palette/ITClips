import { IoChatboxEllipsesOutline } from "react-icons/io5";

import ImageContainer from "./items/ImageContainer";
import DetailInfo from "./items/DetailInfo";
import UserActivityInfo from "./items/UserActivityInfo";

const AsideProfile = () => {

  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 다른 유저일때 채팅하기 버튼 활성화 */}
      <button className="btn btn-ghost btn-circle ms-16">
          <IoChatboxEllipsesOutline className="h-8 w-8" />
      </button>
      {/* 프로필 이미지 컨테이너: 안에 이미지 이름을 넘겨주면 이미지 출력 */}
      <ImageContainer />
      {/* 제목, 이메일, 소개글 정보 컨테이너 */}
      <DetailInfo />
      {/* 자기인지 아닌지에 따라 활성화되는 팔로우 버튼 */}
      {/* 클릭한 유저의 정보와 자신의 정보가 같으면 버튼 비활성화, 다르면 활성화하기 위해 유저정보 필요(api) */}
      <button className="text-white btn btn-info">팔로우</button>
      {/* 자기이면서 팔로우 했는지에 따라 활성화되는 언팔로우 버튼 */}
      {/* <button className="text-white btn btn-error">언팔로우</button> */}
      {/* 팔로워, 팔로잉 리스트, 북마크 수 출력부분 */}
      <UserActivityInfo />
    </div>
  );
};

export default AsideProfile;

