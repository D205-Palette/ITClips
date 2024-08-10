import React, { useState, useEffect, useRef, FC } from "react";

// icons
import { MdOutlineEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

// types
import { BookmarkListDetailType } from "../../../types/BookmarkListType";

// components
import CommentWrite from "../ui/CommentWrite";

// stores
import { authStore } from "../../../stores/authStore";

// apis
import { getRoadmapInfo, writeRoadmapComment, deleteRoadmapComment } from "../../../api/roadmapApi";

type Comment = {
  id: number;
  comment: string;
  userId: number;
  userName: string;
  createdAt: string;
  roadmapId: number;
}

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  onCommentCountChange: (count: number) => void;
}

const RoadmapCommentsModal: FC<Props> = ({ id, isOpen, onClose, onCommentCountChange }) => {

  const userInfo = authStore(state => state.userInfo);
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ editingId, setEditingId ] = useState<number | null>(null);
  const [ editContent, setEditContent ] = useState("");
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (isOpen && userInfo.id) {
      fetchComments();
    }
  }, [id, isOpen, userInfo.id]);

  const fetchComments = async () => {
    if (!userInfo?.id) return;
    try {
      const response = await getRoadmapInfo(id, userInfo.id);
      setComments(response.data.commentList);
      onCommentCountChange(response.data.commentList.length);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleCommentSubmit = async (content: string) => {
    if (!userInfo?.id || !userInfo?.nickname) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      await writeRoadmapComment(id, userInfo.id, content);
      
      const tempComment: Comment = {
        id: Date.now(),
        comment: content,
        userId: userInfo.id,
        userName: userInfo.nickname,
        createdAt: new Date().toISOString(),
        roadmapId: id
      };
      
      setComments(prevComments => [tempComment, ...prevComments]);
      onCommentCountChange(comments.length + 1);
      setNotification({ message: "댓글이 작성되었습니다.", type: 'success' });
      
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
      setNotification({ message: "댓글 작성에 실패했습니다.", type: 'error' });
    }
  };

  // 댓글 수정 기능은 API가 없으므로 UI만 유지
  const handleSaveComment = async (commentId: number) => {
    // API 구현 후 이 부분을 수정
    console.log("댓글 수정 기능 아직 구현안됨.");
    setEditingId(null);
    setEditContent("");
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!userInfo?.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      await deleteRoadmapComment(commentId, userInfo.id);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      onCommentCountChange(comments.length - 1);
      setNotification({ message: "댓글이 삭제되었습니다.", type: 'success' });
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      setNotification({ message: "댓글 삭제에 실패했습니다.", type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-11/12 max-w-2xl h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        <CommentWrite onCommentSubmit={handleCommentSubmit} />
        <div className="flex-grow relative overflow-hidden mt-4">
          <div 
            ref={containerRef}
            className="h-full overflow-y-auto scrollbar-hide space-y-4 px-4"
          >
            {comments.map((comment) => (
              <div key={comment.id} className="bg-base-200 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.userName}</span>
                  {userInfo.id === comment.userId && (
                    <div className="flex space-x-2">
                      {editingId === comment.userId ? (
                        <>
                          <button onClick={() => handleSaveComment(comment.id)} className="text-green-500">
                            <MdCheck />
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-red-500">
                            <MdClose />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(comment.id, comment.comment)} className="text-blue-500">
                            <MdOutlineEdit />
                          </button>
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500">
                            <MdDelete />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {editingId === comment.userId ? (
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
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

export default RoadmapCommentsModal;