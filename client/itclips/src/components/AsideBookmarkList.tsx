import React from 'react';
import profileImage from "../assets/profile_image.png";
import heart from "../assets/heart.png";
import star from "../assets/star.png";

interface Comment {
  id: number;
  text: string;
}

interface Tag {
  id: number;
  text: string;
}

interface ProfileCardProps {
  listName: string;
  username: string;
  description: string;
  likeCount: number;
  starCount: number;
  tags: Tag[];
  comments: Comment[];
}

const ProfileCard = ({
  listName,
  username,
  description,
  likeCount,
  starCount,
  tags,
  comments
}: ProfileCardProps) => {
  return (
    <div className="bg-aside-layout rounded-3xl w-80 p-8 flex flex-col items-center">
      {/* 더보기 버튼 */}
      <div className="self-end">
        <button className="text-center">...</button>
      </div>
      {/* 북마크리스트 썸네일 */}
      <div className="mb-4">
        <img src={profileImage} className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
      </div>
      <h2 className="text-xl font-bold mb-1">{listName}</h2>
      <p className="text-gray-500 mb-2">@{username}</p>
      <p className="text-center text-sm mb-6">{description}</p>
      {/* 좋아요, 즐겨찾기 칸 */}
      <div className="grid grid-cols-6">
        <div className="col-start-2 flex">
          <div>
            <img src={heart} className="text-gray-500 mr-1" />
          </div>
          <div>
            <span>{likeCount}</span>
          </div>
        </div>
        <div className="col-start-5 flex">
          <div>
            <img src={star} className="text-gray-500 mr-1" />
          </div>
          <div>
            <span>{starCount}</span>
          </div>
        </div>
      </div>
      {/* 태그 창 */}
      <div className="m-6">
        {tags.map((tag) => (
          <p>{tag.text} </p>
        ))}
      </div>
      <div className="flex flex-col">
        {/* 댓글 창 */}
        <div className="grid grid-cols-8">
          <div className="col-start-2">
            <h3 className="text-start font-bold mb-2">댓글</h3>
          </div>
        </div>
        <div className="grid grid-cols-8 w-full">
          <div className="col-start-2 col-span-6 max-h-20 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 댓글 작성 칸 */}
        <div className="grid grid-cols-8 mt-4">
          <div className="col-start-2 col-span-6">
            <form className="flex items-center">
              <input 
                type="text" 
                placeholder="댓글을 입력해주세요." 
                className="flex-grow mr-2 p-2 rounded text-sm"
              />
              <button className="text-white rounded-full py-2 px-2 text-sm whitespace-nowrap">
                작성
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;