import { VscKebabVertical } from "react-icons/vsc";

const AsideKebabDropdown = () => {
  return (
    <details className="dropdown dropdown-end dropdown-bottom self-end">
      <summary className="btn m-1">
        <VscKebabVertical />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
          <a className="justify-center">수정하기</a>
        </li>
        <li>
          <a className="justify-center">삭제하기</a>
        </li>
        <li>
          <a className="justify-center">url복사</a>
        </li>
        <li>
          <a className="justify-center">신고하기</a>
        </li>
      </ul>
    </details>
  );
};

export default AsideKebabDropdown;