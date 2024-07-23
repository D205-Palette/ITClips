import { VscKebabVertical } from "react-icons/vsc";
import { CiMenuKebab } from "react-icons/ci";

export default function KebabDropdown() {
  return (
    <>
      {/*  다시 눌러야 닫히는 방식
      <details className=" dropdown  dropdown-end " >
        <summary className="btn btn-ghost m-1 ">
          <VscKebabVertical />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a>수정하기</a>
          </li>
          <li>
            <a>삭제하기</a>
          </li>
          <li>
            <a>url복사</a>
          </li>
          <li>
            <a>즐겨찾기</a>
          </li>
          <li>
            <a>신고하기</a>
          </li>
        </ul>
      </details> */}


      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost"><VscKebabVertical /></div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
            <a>수정하기</a>
          </li>
          <li>
            <a>삭제하기</a>
          </li>
          <li>
            <a>url복사</a>
          </li>
          <li>
            <a>즐겨찾기</a>
          </li>
          <li>
            <a>신고하기</a>
          </li>
        </ul>
      </div>
    </>
  );
}
