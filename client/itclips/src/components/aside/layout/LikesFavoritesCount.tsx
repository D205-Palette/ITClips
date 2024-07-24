// LikesFavoritesCount.tsx 는 AsideBookmarkList.tsx 에서 좋아요, 즐겨찾기 갯수를 출력하는 컴포넌트

// icons
import { FaRegHeart, FaRegStar } from "react-icons/fa";

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

const LikesFavoritesCount = (data: ItemProps) => {

  return (
    <div className="grid grid-cols-6">
      <div className="col-start-2 flex">
        <div>
          <FaRegHeart />
        </div>
        <div>
          <span>{data.like}</span>
        </div>
      </div>
      <div className="col-start-5 flex">
        <div>
          <FaRegStar />
        </div>
        <div>
          <span>{data.fav}</span>
        </div>
      </div>
    </div>
  );
};

export default LikesFavoritesCount;