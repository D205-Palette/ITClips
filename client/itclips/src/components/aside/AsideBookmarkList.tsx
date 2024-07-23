import profileImage from "../assets/profile_image.png";
import { VscKebabVertical } from "react-icons/vsc";
import { FaRegHeart, FaRegStar } from "react-icons/fa";

interface Comment {
  id: number;
  text: string;
}

interface Tag {
  id: number;
  text: string;
}

interface BookmarkListProps {
  listName: string;
  email: string;
  description: string;
  likeCount: number;
  starCount: number;
  tags: Tag[];
  comments: Comment[];
}

const ProfileCard = () => {

  // 더미 데이터
  const bookmarkInfo: BookmarkListProps = {
    listName: "북마크리스트",
    email: "abc@gmail.com",
    description: "인기 북마크 리스트",
    likeCount: 200,
    starCount: 300,
    tags: [
      { id: 1, text: "#태그" },
      { id: 2, text: "#태그2" },
    ],
    comments: [
      { id: 1, text: "좋아요~1" },
      { id: 2, text: "좋아요~2" },
    ]
  }

  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 더보기 버튼 */}
      <details className="dropdown dropdown-end dropdown-bottom self-end">
        <summary className="btn m-1 bg-aside-layout">
          <VscKebabVertical />
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2">
          <li><a className="justify-center">수정하기</a></li>
          <li><a className="justify-center">삭제하기</a></li>
          <li><a className="justify-center">url 복사</a></li>
          <li><a className="justify-center">신고하기</a></li>
        </ul>
      </details>
      {/* 북마크리스트 썸네일 */}
      <div className="mb-4">
        <img src={profileImage} className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
      </div>
      <h2 className="text-xl font-bold mb-1">{bookmarkInfo.listName}</h2>
      <p className="text-gray-500 mb-2">{bookmarkInfo.email}</p>
      <p className="text-center text-sm mb-6">{bookmarkInfo.description}</p>
      {/* 좋아요, 즐겨찾기 칸 */}
      <div className="grid grid-cols-6">
        <div className="col-start-2 flex">
          <div>
            <FaRegHeart />
          </div>
          <div>
            <span>{bookmarkInfo.likeCount}</span>
          </div>
        </div>
        <div className="col-start-5 flex">
          <div>
            <FaRegStar />
          </div>
          <div>
            <span>{bookmarkInfo.starCount}</span>
          </div>
        </div>
      </div>
      {/* 태그 창 */}
      <div className="m-6 flex">
        {bookmarkInfo.tags.map((tag) => (
          <p>{tag.text}&nbsp;</p>
        ))}
      </div>
      <div className="flex flex-col">
        {/* 댓글 창 */}
        <div className="grid grid-cols-8">
          <div className="col-start-2">
            <h3 className="text-start font-bold mb-2">댓글</h3>
          </div>
        </div>
        <div className="grid grid-cols-8 w-full">
          <div className="col-start-2 col-span-6 max-h-20 overflow-y-auto">
            {bookmarkInfo.comments.map((comment) => (
              <div key={comment.id} className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 댓글 작성 칸 */}
        <div className="grid grid-cols-8 mt-4">
          <div className="col-start-2 col-span-6">
            <form className="flex items-center">
              <input 
                type="text" 
                placeholder="댓글을 입력해주세요." 
                className="flex-grow mr-2 p-2 rounded text-sm"
              />
              <button className="text-white rounded-full py-2 px-2 text-sm whitespace-nowrap">
                작성
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;