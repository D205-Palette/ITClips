import React, { useState, useEffect, FC } from "react";
import axios from "axios";

// icons
import { MdOutlineEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

// types
import type { BookmarkListDetailType } from "../../../types/BookmarkListType";

// components
import CommentWrite from "../ui/CommentWrite";

// stores
import { authStore } from "../../../stores/authStore";

// apis
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
}

const CommentsContainer :FC<Props> = ({ id }) => {

  const userInfo = authStore(state => state.userInfo);
  const [ comments, setComments ] = useState<Comment[]>([])
  const [ editingId, setEditingId ] = useState<number | null>(null);
  const [ editContent, setEditContent ] = useState("");
  const [ notification, setNotification ] = useState<{ message: string, type: 'success' | 'error' } | null>(null);


  // 댓글 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getBookmarkListComments(id);
        setComments(response.data.reverse()); // 댓글 목록을 역순으로 정렬
      } catch (error) {
        console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
      }
    };
  
    fetchComments();
  }, [id]);

  
  // 댓글 수정창
  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };
  
  // 댓글 작성 로직
  const handleCommentSubmit = async (content: string) => {
    if (!userInfo || !userInfo.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      const response = await writeBookmarkListComment(userInfo.id, id, content);
      // 서버 응답에 commentUser 정보가 없다고 가정하고, 클라이언트에서 추가 (자연스러운 댓글 추가를 위해, 실제 정보가 들어가는건 아님)
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
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
      if (axios.isAxiosError(error)) {
        console.error("에러 응답:", error.response?.data);
      }
    }
  };

  // 댓글 수정 로직
  const handleSaveComment = async (commentId: number) => {
    if (!userInfo || !userInfo.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      await editBookmarkListComment(userInfo.id, commentId, editContent);
      
      // 로컬 상태 업데이트
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.commentId === commentId 
            ? { ...comment, comment: editContent }
            : comment
        )
      );
      
      setEditingId(null);
      setEditContent("");
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
      if (axios.isAxiosError(error)) {
        console.error("에러 응답:", error.response?.data);
      }
    }
  };

  const handleEditCancelComment = () => {
    // 댓글 수정 취소
    setEditingId(null);
  };

  // 댓글 삭제 로직
  const handleDeleteComment = async (commentId: number) => {
    if (!userInfo || !userInfo.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    try {
      await deleteBookmarkListComment(userInfo.id, commentId);
      
      // 로컬 상태 업데이트
      setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
      
      // 토스트 메시지 설정
      setNotification({ message: "댓글이 삭제되었습니다.", type: 'success' });
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      if (axios.isAxiosError(error)) {
        console.error("에러 응답:", error.response?.data);
      }
      // 에러 토스트 메시지 설정
      setNotification({ message: "댓글 삭제에 실패했습니다.", type: 'error' });
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <h3 className="ms-4 font-bold  text-md text-slate-500">댓글</h3>
      <div className="w-full rounded-lg">
        <div
          className="max-h-32 overflow-y-auto space-y-2 my-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E0 #EDF2F7"
          }}
        >
          {comments.map((comment) => (
            <div key={comment.commentId} className="bg-base-100 p-3 rounded-lg shadow-sm flex items-center w-full">
              {editingId !== comment.commentId && comment.commentUser && (
                <p className="font-semibold text-sm w-1/5">{comment.commentUser.nickName}</p>
              )}
              {editingId === comment.commentId ? (
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="text-sm flex-grow px-4 rounded w-full"
                />
              ) : (
                <p className="text-sm flex-grow px-4">{comment.comment}</p>
              )}
              {userInfo && userInfo.id === comment.commentUser.id && (
                <div className="flex space-x-1">
                  {editingId === comment.commentId ? (
                    <>
                      <button onClick={() => handleSaveComment(comment.commentId)} className="p-1 hover:bg-gray-100 rounded-full">
                        <MdCheck className="h-4 w-4 text-green-500" />
                      </button>
                      <button onClick={handleEditCancelComment} className="p-1 hover:bg-gray-100 rounded-full">
                        <MdClose className="h-4 w-4 text-red-500" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(comment.commentId, comment.comment)} className="p-1 hover:bg-gray-100 rounded-full">
                        <MdOutlineEdit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button onClick={() => handleDeleteComment(comment.commentId)} className="p-1 hover:bg-gray-100 rounded-full">
                        <MdDelete className="h-4 w-4 text-gray-500" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* 댓글 작성 칸 */}
      <CommentWrite onCommentSubmit={handleCommentSubmit} />
      
      {notification && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white shadow-lg z-50 transition-opacity duration-300`}
          style={{
            opacity: notification ? 1 : 0,
            visibility: notification ? 'visible' : 'hidden',
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
