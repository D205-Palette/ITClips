// UserActivityInfo.tsx 는 유저의 정보(팔로워, 팔로잉, 리스트 갯수, 북마크 갯수)를 출력하고
// 팔로워, 팔로잉의 숫자를 누르면 팔로우 관리 창으로 이동하는 컴포넌트
import { useNavigate } from "react-router-dom";

interface ActivityInfo {
  followers: number;
  following: number;
  listCount: number;
  bookmarkCount: number;
}

const UserActivityInfo = () => {
  const navigate = useNavigate()

  // 더미 데이터
  const data: ActivityInfo = {
    followers: 100,
    following: 200,
    listCount: 30,
    bookmarkCount: 10,
  }

  // 팔로워, 팔로잉 숫자를 눌렀을 때 이동
  const onClick = (event: any) => {
    console.log(event.target.id);
    if (event.target.id === "followers") {
      navigate('/user/:user_id/follow/follower')
      // alert("팔로워 창으로 이동합니다.");
    } else if (event.target.id === "following") {
      navigate('/user/:user_id/follow/following')
      // alert("팔로잉 창으로 이동합니다.");
    }
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-4 mt-6">
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-5 text-start text-gray-500">팔로워</div>
        <div className="col-start-9">
          <button id="followers" className="text-start font-bold hover:bg-sky-100 hover:rounded" onClick={onClick}>{data.followers}</button>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-5 text-start text-gray-500">팔로잉</div>
        <div className="col-start-9">
          <button id="following" className="text-start font-bold hover:bg-sky-100 hover:rounded" onClick={onClick}>{data.following}</button>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-5 text-start text-gray-500">리스트 개수</div>
        <div className="col-start-9 text-start font-bold">{data.listCount}</div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-start-3 col-span-5 text-start text-gray-500">북마크 개수</div>
        <div className="col-start-9 text-start font-bold">{data.bookmarkCount}</div>
      </div>
    </div>
  );
};

export default UserActivityInfo;