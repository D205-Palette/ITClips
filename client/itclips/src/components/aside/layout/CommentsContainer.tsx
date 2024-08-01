import React from "react";
import { MdOutlineEdit, MdDelete } from "react-icons/md";

// components
import CommentWrite from "../ui/CommentWrite";

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

const CommentsContainer = (data: ItemProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="ms-4 font-bold mb-2 text-lg">댓글</h3>
      <div className="w-full rounded-lg">
        <div
          className="max-h-32 overflow-y-auto space-y-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E0 #EDF2F7"
          }}  
        >
          {data.comments.map((comment) => (
            <div key={comment.id} className="bg-base-100 p-3 rounded-lg shadow-sm flex items-center">
              <p className="font-semibold text-sm w-1/5">{comment.username}</p>
              <p className="text-sm flex-grow px-4">{comment.content}</p>
              <div className="flex space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MdOutlineEdit className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MdDelete className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 댓글 작성 칸 */}
      <CommentWrite />
    </div>
  );
};

export default CommentsContainer;