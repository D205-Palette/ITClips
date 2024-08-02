// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트

// components
import AsideRoadmapKebabDropdown from "./ui/AsideRoadmapKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";

interface Comment {
  id: number;
  username: string;
  content: string;
}

interface Tag {
  id: number;
  content: string;
}

interface Item {
  id:number;
  title: string;
  email: string;
  description: string;
  like: number;
  fav: number;
  tags: Tag[];
  comments: Comment[];
}
interface Props{
  roadmap:any
}


const AsideRoadmap :  React.FC<Props> = (roadmap) => {

  // 더미 데이터
  const roadmapInfo: Item = {
    id:1,
    title: "로드맵_01",
    email: "abc@gmail.com",
    description: "인기 로드맵",
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
  const isMessageOpen = asideStore(state => state.isMessageOpen);

  return (
    <div className={`${ isDark ? "bg-aside-dark" : "bg-aside-light" } rounded-3xl w-80 p-8 flex flex-col items-center`}>
      {/* 더보기 버튼 */}
      { !isMessageOpen && <AsideRoadmapKebabDropdown isRoadmap={true} id={roadmapInfo.id}/> }
      {/* 북마크리스트 썸네일 */}
      <ImageContainer />
      {/* 북마크리스트 정보 */}
      <ItemDetailInfo {...roadmapInfo} />
      {/* 좋아요, 즐겨찾기 칸 */}
      <LikesFavoritesCount {...roadmapInfo} />
      {/* 태그 창 */}
      <Tags {...roadmapInfo} />
      {/* 댓글 창 */}
      <CommentsContainer {...roadmapInfo} />
    </div>
  );
};

export default AsideRoadmap;
