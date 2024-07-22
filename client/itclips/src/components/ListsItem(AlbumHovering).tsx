import { useState } from "react";
import useStore from  "../store/listStore";
import KebabDropdown from "./KebabDropdown";
import { FaHeart,FaRegHeart  } from "react-icons/fa";
// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?
function HeartButton() {
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  return <div onClick={clickHeart}>{isLike ? <FaHeart /> : <FaRegHeart />}</div>;
}

// function Hovering(isHover:boolean){
  
// }

export default function ListItem() {
  const list = useStore((state) => state);
  const [isHover, setIsHovering] = useState(false);
  
  return (
    <>
    <div className="card  image-full h-min shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Shoes"
          height="100%" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    </>
  );
}