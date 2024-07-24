// CommentWrite.tsx 는 댓글 작성을 위한 입력칸과 작성 버튼

const CommentWrite = () => {
  return (
    <div className="mt-3">
      <form className="flex items-center">
        <input 
          type="text" 
          placeholder="댓글을 입력해주세요." 
          className="flex-grow mr-2 p-2 rounded text-sm"
        />
        <button className="text-white btn btn-info">작성</button>
      </form>
    </div>
  );
};

export default CommentWrite;