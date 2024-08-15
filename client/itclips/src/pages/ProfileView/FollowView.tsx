import { Outlet } from "react-router-dom";

// stores
import darkModeStore from "../../stores/darkModeStore";

// components
import FollowTab from "../../components/follow/FollowTab";


const FollowView = () => {

  const isDark = darkModeStore((state)=>state.isDark)

  return (
    <>
      {/* main자리 */}
      <FollowTab />
  
      <div
        id="Main"
        className="lg:col-start-4 lg:col-span-4 md:col-start-3 md:col-span-5 sm:col-start-2 sm:col-span-6"
      >
        <Outlet />
      </div>
    </>
  );
};

export default FollowView;
