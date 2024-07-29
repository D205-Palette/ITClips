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
      <div id="Body" className="grid grid-cols-8 gap-4">
        {/* aside 자리 */}
        <div id="aside" className="col-start-2 col-span-2 hidden xl:block ">
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
            {isMessageOpen && <MessageLayout />}
          </div>
          {/* <AsideProfile /> */}

        </div>

        {/* main자리 */}
        <FollowTab />
    
        <div
          id="Main"
          className="lg:col-start-4 lg:col-span-4 md:col-start-3 md:col-span-5 sm:col-start-2 sm:col-span-6"
        >
            팔로우 자리입니다
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyFollow;
