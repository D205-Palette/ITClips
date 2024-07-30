// CommentsContainer.tsx 는 댓글들을 리스트로 출력하는 컴포넌트
import { FC } from "react";
// components
import CommentWrite from "../ui/CommentWrite";

interface ItemProps {
  commentList : {
    id : number,
    comment : string,
    userId : number,
    userName : string,
    createdAt : string,
    roadmapId : number,
  }[];
}

const CommentsContainer: FC<ItemProps> = ({commentList})=> {

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-8">
        <div className="col-start-2">
          <h3 className="text-start font-bold mb-2">댓글</h3>
        </div>
      </div>
      <div className="grid grid-cols-8 w-full">
        <div className="col-start-2 col-span-6 max-h-20 overflow-y-auto">
          {commentList.map((comment) => (
            <div key={comment.id} className="flex justify-between items-center mb-2">
              <p className="text-sm">{comment.comment}</p>
              <p className="text-sm">{comment.userName}</p>
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