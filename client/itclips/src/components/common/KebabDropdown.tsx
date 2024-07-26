import { VscKebabVertical } from "react-icons/vsc";
import { FC } from "react";


// 무슨 탭에서 눌렀는지 받는 인자
// 리스트,그룹 북마크 리스트, 즐겨찾기, 로드맵
interface Props {
  whatMenu: string
}


const KebabDropdown : FC<Props> = ({whatMenu}) => {
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost "><VscKebabVertical /></div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow ">
            {/* 나중에 타인 정보 페이지면 수정 삭제도 안뜨게 하기 */}
            <li>
              <a>수정하기</a>
            </li>
            <li>
              <a>삭제하기</a>
            </li>
            <li>
              <a>url복사</a>
            </li>
            <li className={whatMenu==="로드맵"? "hidden" : ''}>
              <a>즐겨찾기</a>
            </li>
            <li className={whatMenu==="로드맵"? "hidden" : ''}>
              <a>신고하기</a>
            </li>
          </ul>
      </div>
    </>
  );
}
export default KebabDropdown;