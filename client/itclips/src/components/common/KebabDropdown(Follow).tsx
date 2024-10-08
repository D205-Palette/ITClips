import { VscKebabVertical } from "react-icons/vsc";
import { FC, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { authStore } from "../../stores/authStore";
// 무슨 탭에서 눌렀는지 받는 인자
// 리스트,그룹 북마크 리스트, 즐겨찾기, 로드맵
interface Props {
  whatMenu: string;
}

const KebabDropdown: FC<Props> = ({ whatMenu }) => {
  const { userId } = authStore();
  const params = useParams();
const [canEdit, setCanEdit] = useState(false)

  useEffect(()=>{
    if(String(userId) === params.userId){
      setCanEdit(true)
    } else{
      setCanEdit(false)
    }
},[])
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost">
          <VscKebabVertical />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box  w-52 p-2 shadow z-30 "
        >
          <li>
            <a>메세지 보내기</a>
          </li>
          {canEdit ? 
            <>
              <li className={whatMenu === "팔로워" ? "" : "hidden"}>
                <a>삭제{userId}{params.userId}</a>
              </li>
              <li className={whatMenu === "팔로워" ? "" : "hidden"}>
                <a>삭제 후 차단</a>
              </li>
              <li className={whatMenu === "팔로워" ? "hidden" : ""}>
                <a>팔로우 취소</a>
              </li>
            </>
           :  
            <></>
          }
        </ul>
      </div>
    </>
  );
};
export default KebabDropdown;
