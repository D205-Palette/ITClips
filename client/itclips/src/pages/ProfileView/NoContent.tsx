import AsideProfile from "../../components/aside/AsideProfile";
import MessageLayout from "../../components/aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { Outlet } from "react-router-dom";
import MainTab from "../../components/main/MainTab";
import { IoIosWarning } from "react-icons/io";

interface Props {
  content: string;
}

const NoContent: React.FC<Props> = ({ content }) => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";

  return (
    <>
      {/* main자리 */}
      <div className="flex flex-row items-center justify-center mt-10">
        <IoIosWarning color="skyblue" size={28} />
        {content === "그룹" || content === "즐겨찾기" ? (
          <p className="ms-3 text-sm lg:text-xl font-bold">
            컨텐츠가 없습니다!
          </p>
        ) : (
          <p className="ms-3 text-sm lg:text-xl font-bold">
            컨텐츠가 없습니다! + 버튼을 눌러 추가해주세요
          </p>
        )}
      </div>
    </>
  );
};

export default NoContent;
