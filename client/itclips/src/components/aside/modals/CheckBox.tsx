// Tags.tsx 는 AsideBookmarkList.tsx 에서 태그를 출력하는 컴포넌트
import type { BookmarkListDetailType } from "../../../types/BookmarkListType";
interface Props {

  isPublic:boolean;
  setIsPublic : React.Dispatch<React.SetStateAction<boolean>>
}

const CB: React.FC<Props> = ({ isPublic,setIsPublic }) => {
  return (
    <div className="form-control flex flex-row items-center justify-end my-3">
      <label>공개 여부{`${isPublic}`}</label>
      <input
        type="checkbox"
        checked={isPublic ? true : false}
        onClick={() => setIsPublic(!isPublic)}
        className="checkbox checkbox-info  [--chkfg:white] mx-2 "
      />
    </div>
  );
};

export default CB;
