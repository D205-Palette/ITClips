// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트

// components
import AsideKebabDropdown from "./ui/AsideKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer";

// stores
import darkModeStore from "../../stores/darkModeStore";

interface Comment {
  id: number;
  username: string;
  content: string;
}

interface Tag {
  id: number;
  content: string;
}

interface ItemProps {
  itemName: string;
  email: string;
  description: string;
  like: number;
  fav: number;
  tags: Tag[];
  comments: Comment[];
}

const ProfileCard = () => {

  // 더미 데이터
  const bookmarkInfo: ItemProps = {
    itemName: "북마크리스트",
    email: "abc@gmail.com",
    description: "인기 북마크 리스트",
    like: 200,
    fav: 300,
    tags: [
      { id: 1, content: "#태그" },
      { id: 2, content: "#태그2" },
    ],
    comments: [
      { id: 1, username: "고양양", content: "좋아요~1" },
      { id: 2, username: "고양양", content: "좋아요~2" },
      { id: 2, username: "고양양", content: "좋아요~3" },
      { id: 2, username: "고양양", content: "좋아요~4" },
    ]
  }

  const isDark = darkModeStore(state => state.isDark);

  return (
    <div className={`${ isDark ? "bg-aside-dark" : "bg-aside-light" } rounded-3xl w-80 p-8 flex flex-col items-center`}>
      {/* 더보기 버튼 */}
      <AsideKebabDropdown />
      {/* 북마크리스트 썸네일 */}
      <ImageContainer />
      {/* 북마크리스트 정보 */}
      <ItemDetailInfo {...bookmarkInfo} />
      {/* 좋아요, 즐겨찾기 칸 */}
      <LikesFavoritesCount {...bookmarkInfo} />
      {/* 태그 창 */}
      <Tags {...bookmarkInfo} />
      {/* 댓글 창 */}
      <CommentsContainer {...bookmarkInfo} />
    </div>
  );
};

export default ProfileCard;