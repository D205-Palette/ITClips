import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import type { BookmarkListSumType } from "../../types/BookmarkListType";
import noImg from "../../assets/images/noImg.gif"

interface Props {
  list: BookmarkListSumType;
}

const ListItem: FC<Props> = ({ list }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card bg-base-100 image-full size-64 shadow-xl hover:cursor-pointer w-full"
        onClick={() => navigate(`/bookmarklist/${list.id}`)}
      >
        <figure>
          <img src={list.image==='default'? require(`../../assets/images/noContent${list.id % 6}.png`) : list.image} alt="" className="w-full object-fill" />
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
