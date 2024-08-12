import AsideProfile from "../../components/aside/AsideProfile";
import MessageLayout from "../../components/aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { Outlet } from "react-router-dom";
import MainTab from "../../components/main/MainTab";
import { IoIosWarning } from "react-icons/io";
import { useState,useEffect } from "react";
interface Props {
  content: string;
}

const NoContent: React.FC<Props> = ({ content }) => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";

  const [warningText, setWarningText] = useState("")


  useEffect(()=>{
    if(content ==="즐겨찾기" || content === "그룹" ){
      setWarningText("컨텐츠가 없습니다! \n  + 버튼을 눌러 추가해주세요 ")
    } else if(content === "비공개리스트"){
      setWarningText("비공개된 리스트입니다!")
    }
    else if(content === "비공개로드맵"){
      setWarningText("비공개된 로드맵입니다!")
    }     else{
      setWarningText("컨텐츠가 없습니다! + 버튼을 눌러 추가해주세요")
    }
  }, [])


  return (
    <>
      {/* main자리 */}
      <div className="flex flex-row items-center justify-center mt-10">
        <IoIosWarning color="skyblue" size={28} />
        
          <p className="ms-3 text-sm lg:text-xl font-bold text-wrap">
          {warningText}
          </p>
        
      </div>
    </>
  );
};

export default NoContent;
