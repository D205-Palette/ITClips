import { NavLink, useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { MdOutlineBookmarks } from "react-icons/md";
import darkModeStore from "../../stores/darkModeStore";
import { IoIosArrowBack } from "react-icons/io";


export default function FollowTab() {
  
  const isDark = darkModeStore((state)=>state.isDark)
  const textColor = (isDark? "text-slate-300" : "text-slate-900")

  const navigate = useNavigate()

  const BackButton = (): any => {
    return (
      <button className="me-5  " onClick={()=>navigate(-1)}>
        <IoIosArrowBack size="40px"/>{" "}
      </button>
    );
  };
  

  return (
    <>
     <div className="flex justify-evenly">

      <BackButton />

      <div className="grow flex flex-row justify-around items-center">
        <NavLink to="follower" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center  mx-2"><FaRegBookmark /></div>팔로워</div></NavLink>
        <NavLink to="following"  className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold ")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><MdOutlineBookmarks /></div>팔로잉</div></NavLink>
      </div>

    </div>
    </>
  );
}
