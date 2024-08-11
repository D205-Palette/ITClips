import { useState, FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
// 이미지 , 리스트명, 북마크 개수, 태그,(설명), 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
// 아님 호버링 기능을 여기에다 포함이 나을듯?

interface Props {
  list: BookmarkListSumType;
}

const ListItem: FC<Props> = ({ list }) => {
  const navigate = useNavigate();
  // const list = useStore((state) => state);
  const [isHover, setIsHovering] = useState(false);

  return (
    <>
      <div
        className="card bg-base-100 image-full size-64 shadow-xl hover:cursor-pointer w-full"
        onClick={() => navigate(`/bookmarklist/${list.id}`)}
      >
        <figure>
          <img src={list.image} alt="Shoes" className="w-full object-fill" />
        </figure>

        <div className="card-body flex flex-row justify-center items-center">
          <div className="flex flex-row justify-center">
            <p>{list.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
