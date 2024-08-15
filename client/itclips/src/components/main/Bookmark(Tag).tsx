import { asideStore } from "../../stores/asideStore";
import darkModeStore from "../../stores/darkModeStore";
import { useState } from "react";

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
  const [isHoverTag, setIsHoverTag] = useState(false);

  function deleteTag() {
    editTempTags(tempTags.filter((tempTag) => tempTag.title !== tag));
  }
  
  return (
    <>
      <div
        className="relative"
        onMouseOver={() => setIsHoverTag(true)}
        onMouseLeave={() => setIsHoverTag(false)}
      >
        <div className="ms-1 flex flex-row justify-center" >
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
              " absolute text-white flex flex-row justify-center items-center  "
            }
            onClick={()=>deleteTag()}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTag;
