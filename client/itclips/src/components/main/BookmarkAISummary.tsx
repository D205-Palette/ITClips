import AsideProfile from "../aside/AsideProfile";
import MessageLayout from "../aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { Outlet } from "react-router-dom";
import MainTab from "./MainTab";
import { IoIosWarning } from "react-icons/io";

interface Props {
  tag: string;
}

const AISummary: React.FC<Props> = ({ tag }) => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";

  return (
    <>
      {/* main자리 */}
      <div className="">
        <IoIosWarning color="skyblue" size={28} />
      </div>
    </>
  );
};

export default AISummary;
