// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState } from "react";
import useStore from "../stores/listStore";
import KebabDropdown from "./KebabDropdown";

function HeartButton() {
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  return <i onClick={clickHeart}>{isLike ? "heartFullIcon" : "noHeartIcon"}</i>;
}

export default function ListItem() {
  const list = useStore((state) => state);
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{list.title}</h2>
          <p>{list.description}</p>
          {list.bookmark_list_tags.map((tag: string) => (
            <p>{"# " + tag}</p>
          ))}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <HeartButton /> {list.bookmark_list_like}
              <KebabDropdown />
            </button>
            리스트형
          </div>
        </div>
      </div>
    </>
  );
}
