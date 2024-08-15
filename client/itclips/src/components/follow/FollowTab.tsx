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
      <button className="me-5 md:me-5 sm:me-2" onClick={() => navigate(-1)}>
        <IoIosArrowBack className="md:text-[40px] sm:text-[30px]" />{" "}
      </button>
    );
  };

  return (
    <>
      <div className="flex justify-evenly items-center md:justify-evenly sm:justify-between sm:px-2">

        <BackButton />

        <div className="grow flex flex-row justify-around items-center">
          <NavLink 
            to="follower" 
            className={({ isActive }) =>
              isActive
                ? "text-sky-500 font-bold"
                : `${textColor} font-bold`
            }
          >
            <div className="flex flex-row">
              <div className="flex items-center mx-2">
                <FaRegBookmark className="md:text-base sm:text-sm" />
              </div>
              <span className="md:text-lg sm:text-sm">팔로워</span>
            </div>
          </NavLink>
          
          <NavLink 
            to="following" 
            className={({ isActive }) =>
              isActive
                ? "text-sky-500 font-bold"
                : `${textColor} font-bold`
            }
          >
            <div className="flex flex-row">
              <div className="flex items-center mx-2">
                <MdOutlineBookmarks className="md:text-base sm:text-sm" />
              </div>
              <span className="md:text-lg sm:text-sm">팔로잉</span>
            </div>
          </NavLink>
        </div>

      </div>
    </>
  );
}

export default FollowTab;