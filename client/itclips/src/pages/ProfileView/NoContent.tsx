import AsideProfile from "../../components/aside/AsideProfile";
import MessageLayout from "../../components/aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { Outlet } from "react-router-dom";
import MainTab from "../../components/main/MainTab";
import { IoIosWarning } from "react-icons/io";

const NoContent = () => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state)=>state.isDark)
  const textColor = (isDark? "text-slate-300" : "text-slate-900")

  return (
    <>
        {/* main자리 */}
        <MainTab />
        <IoIosWarning color="skyblue"/>
        컨텐츠가 없습니다! + 버튼을 눌러 추가해주세요


    </>
  );
};

export default NoContent;
