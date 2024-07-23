import { VscKebabVertical } from "react-icons/vsc";

export default function KebabDropdown() {
  return (
    <>
      <details className="dropdown  dropdown-end">
        <summary className="btn m-1">
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
      </details>
    </>
  );
}
