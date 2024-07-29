import AsideProfile from "../../components/aside/AsideProfile";
import MessageLayout from "../../components/aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import FollowTab from "../../components/main/FollowTab";
import { Outlet } from "react-router-dom";


const MyFollow = () => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state)=>state.isDark)
  const textColor = (isDark? "text-slate-300" : "text-slate-900")

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

export default MyFollow;
