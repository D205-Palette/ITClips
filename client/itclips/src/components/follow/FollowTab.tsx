import { NavLink, useNavigate } from "react-router-dom";

// icons
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineBookmarks } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

// stores
import darkModeStore from "../../stores/darkModeStore";


const FollowTab = () => {
  
  const isDark = darkModeStore((state)=>state.isDark);
  const textColor = (isDark? "text-slate-300" : "text-slate-900");

  const navigate = useNavigate();

  const BackButton = (): any => {
    return (
      <button className="me-5  " onClick={()=>navigate(-1)}>
        <IoIosArrowBack size="40px"/>{" "}
      </button>
    );
  };

  return (
    <>
      <BackButton />
      <div className="flex justify-around">
      <NavLink to="follower" className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold")}><div className="flex flex-row"><div className="flex items-center  mx-2"><FaRegBookmark /></div>팔로워</div></NavLink>
      <NavLink to="following"  className={(({isActive}) => isActive? "text-sky-500 font-bold " : textColor + " font-bold ")}><div  className="flex flex-row"><div className="flex items-center  mx-2"><MdOutlineBookmarks /></div>팔로잉</div></NavLink>
    </div>
    </>
  );
}

export default FollowTab;