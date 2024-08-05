import AsideProfile from "../../components/aside/AsideProfile";
import MessageLayout from "../../components/aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { Outlet } from "react-router-dom";
import MainTab from "../../components/main/MainTab";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
interface Props {
  tag: string;
  isEdit:boolean
}

const EditTag: React.FC<Props> = ({ tag,isEdit }) => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";
  const [isHoverTag, setIsHoverTag] = useState(false);

  function deleteTag(){
    
  }
  return (
    <>
      {/* main자리 */}
      <div className="" onMouseOver={()=>setIsHoverTag(true)} onMouseLeave={()=>setIsHoverTag(false)}>
          
          <div className="ms-1 w-16">{ isHoverTag&&isEdit?  <div className="bg-red-500 text-slate-50 flex flex-row justify-center rounded-xl"><IoClose/></div>: `# ${tag}`} </div>
         

      </div>
    </>
  );
};

export default EditTag;
