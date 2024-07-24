// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트

// components
import AsideKebabDropdown from "./ui/AsideKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import DetailInfo from "./layout/DetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer";

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
      <AsideKebabDropdown />
      {/* 북마크리스트 썸네일 */}
      <ImageContainer />
      {/* 북마크리스트 정보 */}
      <DetailInfo />
      {/* 좋아요, 즐겨찾기 칸 */}
      <LikesFavoritesCount />
      {/* 태그 창 */}
      <Tags />
      {/* 댓글 창 */}
      <CommentsContainer />
    </div>
  );
};

export default ProfileCard;