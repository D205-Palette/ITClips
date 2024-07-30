// CommentsContainer.tsx
import React from "react";
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
    <div className="flex flex-col px-2">
      <h3 className="text-start font-bold mb-4 text-lg">댓글</h3>
      <div className="w-full rounded-lg">
        <div className="max-h-32 overflow-y-auto p-2 space-y-2">
          {data.comments.map((comment) => (
            <div key={comment.id} className="bg-base-100 p-3 rounded-lg shadow-sm flex justify-between">
              <p className="font-semibold text-sm">{comment.username}</p>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
      {/* 댓글 작성 칸 */}
      <div className="mt-2">
        <CommentWrite />
      </div>
    </div>
  );
};

export default CommentsContainer;