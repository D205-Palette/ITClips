import AsideProfile from "../aside/AsideProfile";
import MessageLayout from "../aside/MessageLayout";
import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { Outlet } from "react-router-dom";
import MainTab from "./MainTab";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type tempTag = {
  title: string;
};

interface Props {
  tag: string;
  isEdit: boolean;
  tempTags: tempTag[];
  editTempTags: React.Dispatch<React.SetStateAction<tempTag[]>>;
}

const EditTag: React.FC<Props> = ({ tag, isEdit, editTempTags, tempTags }) => {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";
  const [isHoverTag, setIsHoverTag] = useState(false);

  const tagLength = { width: `${15 + tag.length * 17}px` };
  function deleteTag() {
    editTempTags(tempTags.filter((tempTag) => tempTag.title !== tag));
  }
  return (
    <>
      {/* main자리 */}
      <div
        className="relative"
        onMouseOver={() => setIsHoverTag(true)}
        onMouseLeave={() => setIsHoverTag(false)}
      >
        <div className="ms-1 flex " onClick={()=>deleteTag()}>
          <div
            className={
              isHoverTag && isEdit
                ? "bg-red-500 flex flex-row justify-center rounded-lg text-red-500"
                : ""
            }
          >
            {`# ${tag}`}
          </div>
          <div
            className={
              (isHoverTag && isEdit ? "" : "hidden") +
              " absolute text-white flex flex-row justify-center left-1/2 top-0.5"
            }
            
          >
            <IoClose size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTag;
