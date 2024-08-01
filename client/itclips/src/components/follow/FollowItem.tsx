// 이미지 , 리스트명, 북마크 개수, 태그, 설명, 좋아요 버튼&좋아요 수, 리스트 세부 조작 버튼
import { useState,FC } from "react";
import useStore from "../../stores/mainStore";
import KebabDropdown from "../common/KebabDropdown(Follow)";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import darkModeStore from '../../stores/darkModeStore'
import { useNavigate } from "react-router-dom";

interface Props {
  user: {
    pk: number;
    image: string;
    tags: string[];
    name: string;
  };
}

interface Props{
  isFollower:boolean;
}

const FollowItem : FC<Props> = ({user, isFollower}) => {

  const navigate = useNavigate()
  const [isLike, setIsLike] = useState(false);
  const clickHeart = (): void => {
    setIsLike(!isLike);
    //여기에 좋아요 api호출
  };
  const isDark = darkModeStore((state) => state.isDark)
  
  return (
    <>
      <div
        className={(isDark? "hover:bg-slate-700" : "hover:bg-slate-100") + " group/item card card-side bg-base-100  rounded-none h-28 ps-8 my-2 border-b border-b-slate-300"} >
          <>
            <figure onClick={()=>navigate('/user/:user_id')} className="hover:cursor-pointer">
              <img
                src={process.env.PUBLIC_URL + `${user.image}`}
                alt="Movie"
                className="w-16 h-16 bg-gray-200 rounded-full mb-4"
              />
            </figure>

            <div className="card-body flex flex-row">
              <div className="flex flex-col flex-auto justify-around ">
                <div onClick={()=>navigate('/user/:user_id')}>
                  {" "}
                  <h4 className="flex-auto card-title hover:cursor-pointer">{user.name}</h4>{" "}
                </div>
              </div>

              <div className="card-actions justify-end flex items-center">
                 <div className="hidden md:block">
                  {" "}
                  {user.tags.map((tag: string) => (
                    <span>{" # " + tag}</span>
                  ))}{" "}
                </div>
                <button className="md:block hidden ">
                  <KebabDropdown whatMenu={isFollower? "팔로워" : "팔로잉"} />
                </button>
              </div>
            </div>
          </>
        
      </div>
    </>
  );
}



export default FollowItem;