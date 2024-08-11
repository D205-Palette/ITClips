// LikesFavoritesCount.tsx 는 AsideBookmarkList.tsx 에서 좋아요, 즐겨찾기 갯수를 출력하는 컴포넌트

// icons
import { FaRegHeart,FaHeart, FaRegStar,FaStar } from "react-icons/fa";
import type { BookmarkListDetailType } from "../../../types/BookmarkListType";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
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
  title: string;
  email: string;
  description: string;
  like: number;
  fav: number;
  tags: Tag[];
  comments: Comment[];
}

const LikesFavoritesCount = (data: BookmarkListDetailType) => {

  const {userId, token} = authStore()


  const [isLike, setIsLike] = useState(data.isLiked)
  const [likeCount, changeLikeCount] = useState(data.likeCount)

  const [isScraped, setIsScraped] = useState(data.isScraped)
  const [scrapCount, changeScrapCount] = useState(data.scrapCount)

  const clickHeart = (): void => {
    if (isLike) {
      axios.delete(`${API_BASE_URL}/api/list/like/${userId}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount - 1);
    } else {
      axios.post(`${API_BASE_URL}/api/list/like/${userId}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeLikeCount(likeCount + 1);
    }
    setIsLike(!isLike);
  };


  const clickStar = (): void => {
    if (isScraped) {
      axios.delete(`${API_BASE_URL}/api/list/scrap/${userId}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeScrapCount(scrapCount - 1);
    } else {
      axios.post(`${API_BASE_URL}/api/list/scrap/${userId}/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      changeScrapCount(scrapCount + 1);
    }
    setIsScraped(!isScraped);
  };



  return (
    <div className="flex flex-row justify-start w-full ps-4 mb-4">
      <div className="col-start-2 flex items-center me-6">
        <div className="me-2 hover:cursor-pointer" onClick={()=>clickHeart()}>
        {isLike ? <FaHeart color="red"  size={12}/> : <FaRegHeart color="gray" size={12}/>}
        </div>
        <div className="w-3">
          <span  className={isLike? "" : "text-slate-400"}>{likeCount}</span>
        </div>
      </div>
      <div className="col-start-5 flex items-center">
        <div className="me-2 hover:cursor-pointer " onClick={()=>clickStar()}>
        {isScraped? <FaStar color="skyblue"  size={14}/> : <FaRegStar color="gray" size={14} />}
    
        </div>
        <div>
          <span className={isScraped ? "" : "text-slate-400"}>{scrapCount}</span>
        </div>
      </div>
    </div>
  );
};

export default LikesFavoritesCount;