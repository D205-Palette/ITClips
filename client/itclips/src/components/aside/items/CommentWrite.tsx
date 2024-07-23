const CommentWrite = () => {
  return (
    <div className="grid grid-cols-8 mt-4">
      <div className="col-start-2 col-span-6">
        <form className="flex items-center">
          <input 
            type="text" 
            placeholder="댓글을 입력해주세요." 
            className="flex-grow mr-2 p-2 rounded text-sm"
          />
          <button className="text-white btn btn-info">작성</button>
        </form>
      </div>
    </div>
  );
};

export default CommentWrite;