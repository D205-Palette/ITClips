import CommentWrite from "./CommentWrite";

interface Comments {
  id: number;
  username: string;
  content: string;
}

const CommentsContainer = () => {

  // 더미 데이터
  const data: Comments[] = [
    { id:1, username: "고양양", content: "좋아요1" },
    { id:2, username: "고양양친구", content: "좋아요2" },
    { id:3, username: "고양양", content: "좋아요3" },
    { id:4, username: "고양양친구", content: "퍼가요1" },
    { id:5, username: "고양양", content: "퍼가요2" },
  ]

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-8">
        <div className="col-start-2">
          <h3 className="text-start font-bold mb-2">댓글</h3>
        </div>
      </div>
      <div className="grid grid-cols-8 w-full">
        <div className="col-start-2 col-span-6 max-h-20 overflow-y-auto">
          {data.map((comment) => (
            <div key={comment.id} className="flex justify-between items-center mb-2">
              <p className="text-sm">{comment.content}</p>
              <p className="text-sm">{comment.username}</p>
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