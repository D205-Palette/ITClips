// 버전 1 : 리스트, 공유 리스트, 즐겨찾기, 로드맵
// 버전 2 : 팔로워, 팔로잉
import { Route, Routes, Link } from "react-router-dom";
import ListItem from "./ListsItem(List)";
import AlbumItem from "./ListsItem(Album)";
import { FaRegBookmark } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";

function ButtonV1(): any {
  return (
    <>
      <button className="text-blue-500 font-bold">북마크 리스트</button>
      <button>그룹 북마크</button>
      <button>즐겨찾기</button>
      <button>로드맵</button>
    </>
  );
}

function ButtonV2(): any {
  return (
    <>
      <button>팔로워</button>
      <br />
      <button>팔로잉</button>
    </>
  );
}

export default function MainTab() {
  const version = true;
  return (
    <>
      <div className="flex justify-around">
        {/* {version ? <ButtonV1 /> : <ButtonV2 />} */}

        <Link to=""><div className="flex flex-row"><div className="flex items-center"><FaRegBookmark /></div>북마크 리스트</div></Link>
        <Link to="groupbookmarklist"><div className="flex flex-row"><div className="flex items-center"><IoBookmarksOutline /></div>그룹 북마크 리스트</div></Link>
        <Link to="favorites">즐겨찾기</Link>
        <Link to="roadmap">로드맵</Link>
      </div>
    </>
  );
}
