import { NavLink, useNavigate } from "react-router-dom";

// icons
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";

// stores
import darkModeStore from "../../stores/darkModeStore";

const FollowTab = () => {
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";

  return (
    <>
      <div className="flex justify-around mb-3">
        <div className="grow flex flex-row justify-around items-center">
          <NavLink
            to="newbookmarklists"
            className={({ isActive }) =>
              isActive ? "text-sky-500 font-bold " : textColor + " font-bold"
            }
          >
            <div className="flex flex-row">
              <div className="flex items-center  mx-2">
                <FaRegBookmark />
              </div>
              북마크 리스트
            </div>
          </NavLink>
          <NavLink
            to="newRoadmaps"
            className={({ isActive }) =>
              isActive ? "text-sky-500 font-bold " : textColor + " font-bold "
            }
          >
            <div className="flex flex-row">
              <div className="flex items-center  mx-2">
                <FaRegMap />
              </div>
              로드맵
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default FollowTab;
