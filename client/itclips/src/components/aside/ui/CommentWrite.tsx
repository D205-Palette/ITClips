// CommentWrite.tsx

const CommentWrite = () => {
  return (
    <div className="mt-3">
      <form className="relative flex items-center">
        <input 
          type="text" 
          placeholder="댓글을 입력해주세요." 
          className="input w-full pr-16 pl-4 placeholder:text-sm"
        />
        <button 
          className="btn btn-info absolute right-0 rounded-l-none text-base-100"
          type="submit"
        >
          작성
        </button>
      </form>
    </div>
  );
};

export default CommentWrite;