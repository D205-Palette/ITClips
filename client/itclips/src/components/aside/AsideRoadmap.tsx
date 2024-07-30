// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트

// components
import AsideKebabDropdown from "./ui/AsideKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer(Roadmap)";
import { FaRegHeart, FaRegStar } from "react-icons/fa";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";


// interface Comment {
//   id: number;
//   username: string;
//   content: string;
// }

// interface Tag {
//   id: number;
//   content: string;
// }

// interface ItemProps {
//   itemName: string;
//   email: string;
//   description: string;
//   like: number;
//   fav: number;
//   tags: Tag[];
//   comments: Comment[];
// }

const ProfileCard = () => {
  // 더미 데이터
  const roadmap = {
    id: 1,
    userId: 1,
    userName: "UserOne",
    title: "First Roadmap",
    description: "This is the description for the first roadmap",
    createdAt: "2024-07-24T05:41:26",
    image: null,
    isPublic: 1,
    stepList: [
      {
        id: 1,
        roadmapId: 1,
        bookmarkListResponseDTO: {
          id: 1,
          title: "My First Bookmark List",
          description: "This is a description for the first bookmark list",
          bookmarkCount: 0,
          likeCount: 1,
          image: null,
          tags: [],
          users: [],
        },
        check: 0,
        order: 1,
      },
      {
        id: 2,
        roadmapId: 1,
        bookmarkListResponseDTO: {
          id: 3,
          title: "UserOne Second Bookmark List",
          description:
            "This is a description for UserOne's second bookmark list",
          bookmarkCount: 0,
          likeCount: 1,
          image: null,
          tags: [],
          users: [],
        },
        check: 1,
        order: 2,
      },
    ],
    commentList: [
      {
        id: 1,
        comment: "This is a comment on the first roadmap by UserOne",
        userId: 1,
        userName: "UserOne",
        createdAt: "2024-07-24T05:41:26",
        roadmapId: 1,
      },
      {
        id: 2,
        comment: "This is a comment on the first roadmap by Admin",
        userId: 2,
        userName: "AdminUser",
        createdAt: "2024-07-24T05:41:26",
        roadmapId: 1,
      },
    ],
    likeCnt: 2,
    isScraped : 3,
  };

  const isDark = darkModeStore((state) => state.isDark);
  const isMessageOpen = asideStore((state) => state.isMessageOpen);

  return (
    <div
      className={`${
        isDark ? "bg-aside-dark" : "bg-aside-light"
      } rounded-3xl w-80 p-8 flex flex-col items-center`}
    >
      {/* 더보기 버튼 */}
      {!isMessageOpen && <AsideKebabDropdown isRoadmap={true}/>}
      {/* 북마크리스트 썸네일 */}
      <ImageContainer />
      {/* 북마크리스트 정보 */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-1">{roadmap.title}</h2>
        <p className="text-center text-sm mb-6">{roadmap.description}</p>
      </div>
      {/* 좋아요, 즐겨찾기 칸 */}
      <div className="grid grid-cols-6">
      <div className="col-start-2 flex">
        <div>
          <FaRegHeart />
        </div>
        <div>
          <span>{roadmap.likeCnt}</span>
        </div>
      </div>
      <div className="col-start-5 flex">
        <div>
          <FaRegStar />
        </div>
        <div>
          <span>{roadmap.isScraped}</span>
        </div>
      </div>
    </div>

      {/* 댓글 창 */}
      <CommentsContainer commentList = {roadmap.commentList} />
    </div>
  );
};

export default ProfileCard;
