// CommentWrite.tsx
import React, { useState } from 'react';

interface CommentWriteProps {
  onCommentSubmit: (content: string) => void;
}

const CommentWrite: React.FC<CommentWriteProps> = ({ onCommentSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCommentSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="">
      <form className="relative flex items-center border rounded-lg" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="댓글을 입력해주세요." 
          className="input w-full pr-16 pl-4 placeholder:text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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