import { VscKebabVertical } from "react-icons/vsc";
import { FC,useState } from "react";
import BookmarkListEditModal from '../../components/aside/modals/BookmarkListEditModal'

// 무슨 탭에서 눌렀는지 받는 인자
// 리스트, 즐겨찾기, 로드맵, 북마크 4가지로 받을예정. 그룹 리스트랑 그냥 리스트는 차이 없음
interface Props {
  whatMenu: string;
  // id 가 그떄그때마다 listID, roadmapId, bookmarkId 달라짐
  id:number;
}

const KebabDropdown : FC<Props> = ({whatMenu, id}) => {
  const [ isEditModalOpen, setIsEditModalOpen ] = useState<boolean>(false);
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost "><VscKebabVertical /></div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-30">
            
            {/* 이구간은 내꺼 남꺼일때& 즐겨찾기일떄 유무 */}
            <li className={whatMenu==="즐겨찾기"? "hidden" : ''} onClick={()=>setIsEditModalOpen(true)}>
              <a>수정하기</a>
            </li>
            <li>
              <a>삭제하기</a>
            </li>
            {/*  */}

            <li>
              <a>url 복사</a>
            </li>
            <li className={whatMenu==="북마크"? "" : 'hidden'}>
              <a>AI 요약</a>
            </li>
            <li className={whatMenu==="북마크"? "" : 'hidden'}>
              <a>내 리스트에 추가</a>
            </li>
            <li className={whatMenu==="로드맵"||whatMenu==="북마크"? "hidden" : ''}>
              {/* 내 즐겨찾기에 있는지 유무 따져서 즐겨찾기 삭제로 출력해주기 */}
              <a>즐겨찾기</a>
            </li>
            <li className={whatMenu==="로드맵"? "" : 'hidden'}>
              <a>스크랩</a>
            </li>  
            <li className={whatMenu==="로드맵"? "hidden" : ''}>
              <a>신고하기</a>
            </li>
            
          </ul>
      </div>
      <BookmarkListEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
}
export default KebabDropdown;