import { useState } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?


export default function ListItem() {
  const list = useStore((state) => state);
  const [isHover, setIsHovering] = useState(false);

  return (
    <>
    
      <div className="card bg-base-100 image-full size-64 shadow-xl">
        <figure >
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Shoes" 
            className="w-56"/>
        </figure>
        
        <div className="card-body flex justify-center content-center">
          <div>
          
          <p>리스트에 관한 설명~ 각종 설명들  </p>
          </div>
        </div>
      </div>
    </>
  );
}
