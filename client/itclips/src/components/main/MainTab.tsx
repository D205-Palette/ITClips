// 버전 1 : 리스트, 공유 리스트, 즐겨찾기, 로드맵
// 버전 2 : 팔로워, 팔로잉
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineBookmarks } from "react-icons/md";
import tabStore from '../../stores/mainTabStore'
import darkModeStore from "../../stores/darkModeStore";

const ButtonV1 = () => {
  return (
    <>
      <button className="text-blue-500 font-bold">북마크 리스트</button>
      <button>그룹 북마크</button>
      <button>즐겨찾기</button>
      <button>로드맵</button>
    </>
  );
}

const ButtonV2 = () => {
  return (
    <>
      <button>팔로워</button>
      <br />
      <button>팔로잉</button>
    </>
  );
}

export default function MainTab() {
  const [ version, setVersion ] = useState(true);
  
  const isDark = darkModeStore((state)=>state.isDark)
  const textColor = (isDark? "text-slate-300" : "text-slate-900")
  const whatTab = tabStore((state) => state.whatMainTab)
  const changeTab = tabStore((state) => state.changeMainTab)

  return (
    <>
      {/* {version ? <ButtonV1 /> : <ButtonV2 />} */}
      { version ? (
        <div className="flex justify-around">
          <NavLink to="bookmarklist" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center  mx-2"><FaRegBookmark /></div>북마크 리스트</div></NavLink>
          <NavLink to="groupbookmarklist"  className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold ")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><MdOutlineBookmarks /></div>그룹 북마크 리스트</div></NavLink>
          <NavLink to="favorites" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><FaRegStar /></div>즐겨찾기</div></NavLink>
          <NavLink to="roadmap" className={(({isActive}) => isActive? "text-sky-500 font-bold" : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center mx-2"><FaRegMap /></div>로드맵</div></NavLink>
        </div>
      ) : (
        <div className="flex justify-around">
          <NavLink to="follower" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center  mx-2"><FaRegBookmark /></div>팔로워</div></NavLink>
          <NavLink to="following"  className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold ")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><MdOutlineBookmarks /></div>팔로잉</div></NavLink>
        </div>
      )}

      {/* <Link to=""><div onClick={()=>changeTab('bookmarklist')} className={(whatTab==='bookmarklist'? "text-sky-500": {textColor}) + " font-bold flex flex-row"}><div className="flex items-center  mx-2"><FaRegBookmark /></div>북마크 리스트</div></Link>
      <Link to="groupbookmarklist"><div onClick={()=>changeTab('groupbookmarklist')} className={(whatTab==='groupbookmarklist'? "text-sky-500": {textColor}) + " font-bold flex flex-row"}><div className="flex items-center  mx-2"><MdOutlineBookmarks /></div>그룹 북마크 리스트</div></Link>
      <Link to="favorites"><div onClick={()=>changeTab('favorites')} className={(whatTab==='favorites'? "text-sky-500": {textColor}) + " font-bold flex flex-row"}><div className="flex items-center  mx-2"><FaRegStar /></div>즐겨찾기</div></Link>
      <Link to="roadmap"><div onClick={()=>changeTab('roadmap')} className={(whatTab==='roadmap'? "text-sky-500": {textColor}) + " font-bold flex flex-row"}><div className="flex items-center mx-2"><FaRegMap /></div>로드맵</div></Link> */}
{/* 
      <NavLink to="bookmarklist" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center  mx-2"><FaRegBookmark /></div>북마크 리스트</div></NavLink>
      <NavLink to="groupbookmarklist"  className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold ")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><MdOutlineBookmarks /></div>그룹 북마크 리스트</div></NavLink>
      <NavLink to="favorites" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><FaRegStar /></div>즐겨찾기</div></NavLink>
      <NavLink to="roadmap" className={(({isActive}) => isActive? "text-sky-500 font-bold" : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center mx-2"><FaRegMap /></div>로드맵</div></NavLink> */}
      
      {/* <NavLink  to='my' className={(({isActive}) => isActive? "text-sky-500 font-bold" : textColor + " font-bold")}>MY</NavLink>
      <NavLink  to='feed' className={(({isActive}) => isActive? "text-sky-500 font-bold" : textColor +" font-bold")}>피드</NavLink>
      <NavLink  to='search' className={(({isActive}) => isActive? "text-sky-500 font-bold" : textColor + " font-bold")}>검색</NavLink> */}
    </>
  );
}
