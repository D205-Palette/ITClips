import React, { useState, useEffect, useRef, FC } from "react";

// icons
import { MdOutlineEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

// types
import { BookmarkListDetailType } from "../../../types/BookmarkListType";

// components
import CommentWrite from "../ui/CommentWrite";

// stores
import { authStore } from "../../../stores/authStore";
import { getBookmarkListComments, writeBookmarkListComment, editBookmarkListComment, deleteBookmarkListComment } from "../../../api/bookmarkListApi";

type Comment = {
  commentId: number;
  commentUser: {
    id: number;
    nickName: string;
  };
  comment: string;
  commentTime: string;
}

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
  commentCount:number
}


const BookmarkListCommentsModal: FC<Props> = ({ id, isOpen, onClose,setCommentCount,commentCount }) => {

  const userInfo = authStore(state => state.userInfo);
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

const [commentChange, setCommentChange] = useState(false)

useEffect(() => {
  if (notification) {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [notification]);

  // 북마크리스트 댓글 조회
  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
    setCommentChange(false)
  }, [commentChange, isOpen]);

  const fetchComments = async () => {
    try {
      const response = await getBookmarkListComments(id);
      const sortedComments = response.data.sort((a: Comment, b: Comment) => b.commentId - a.commentId);
      setComments(sortedComments);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // 댓글 수정
  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleCommentSubmit = async (content: string) => {
    if (!userInfo || !userInfo.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      const response = await writeBookmarkListComment(userInfo.id, id, content);
      const newComment: Comment = {
        ...response.data,
        commentUser: {
          id: userInfo.id,
          nickName: userInfo.nickname || "Unknown User"
        },
        comment: content,
        commentTime: new Date().toISOString()
      };
      setComments(prevComments => [newComment, ...prevComments]);
      setCommentCount(commentCount + 1)
      setCommentChange(true)
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
    }
  };

  const handleSaveComment = async (commentId: number) => {
    if (!userInfo || !userInfo.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      await editBookmarkListComment(userInfo.id, commentId, editContent);
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.commentId === commentId 
            ? { ...comment, comment: editContent }
            : comment
        ).sort((a, b) => b.commentId - a.commentId)
      );
      setEditingId(null);
      setEditContent("");
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!userInfo || !userInfo.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      await deleteBookmarkListComment(userInfo.id, commentId);
      setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
      setNotification({ message: "댓글이 삭제되었습니다.", type: 'success' });
      setCommentCount(commentCount - 1)
      setCommentChange(true)
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      setNotification({ message: "댓글 삭제에 실패했습니다.", type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 border rounded-lg p-6 w-11/12 max-w-2xl h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        <CommentWrite onCommentSubmit={handleCommentSubmit} />
        <div className="flex-grow relative overflow-hidden mt-4">
          <div 
            ref={containerRef}
            className="h-full overflow-y-auto scrollbar-hide space-y-4 px-4"
          >
            {comments.map((comment) => (
              <div key={comment.commentId} className="bg-base-200 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.commentUser.nickName}</span>
                  {userInfo && userInfo.id === comment.commentUser.id && (
                    <div className="flex space-x-2">
                      {editingId === comment.commentId ? (
                        <>
                          <button onClick={() => handleSaveComment(comment.commentId)} className="text-green-500">
                            <MdCheck />
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-red-500">
                            <MdClose />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(comment.commentId, comment.comment)} className="text-blue-500">
                            <MdOutlineEdit />
                          </button>
                          <button onClick={() => handleDeleteComment(comment.commentId)} className="text-red-500">
                            <MdDelete />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {editingId === comment.commentId ? (
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">{new Date(comment.commentTime).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="btn btn-info text-base-100 mt-4 w-full"
        >
          닫기
        </button>
      </div>
      {notification && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white shadow-lg z-50 transition-opacity duration-300`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default BookmarkListCommentsModal;