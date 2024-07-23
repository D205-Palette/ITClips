import { FaRegHeart, FaRegStar } from "react-icons/fa";

interface LikesFavoritesInfo {
  likes: number;
  fav: number;
}

const LikesFavoritesCount = () => {

  // 더미 데이터
  const data: LikesFavoritesInfo = {
    likes: 20,
    fav: 55,
  }

  return (
    <div className="grid grid-cols-6">
      <div className="col-start-2 flex">
        <div>
          <FaRegHeart />
        </div>
        <div>
          <span>{data.likes}</span>
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