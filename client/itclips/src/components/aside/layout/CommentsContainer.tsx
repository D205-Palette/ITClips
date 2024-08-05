import React, { useState,useEffect,FC } from "react";
import { MdOutlineEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import type { BookmarkListDetailType } from "../../../types/BookmarkListType";
// components
import CommentWrite from "../ui/CommentWrite";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
interface Tag {
  id: number;
  content: string;
}

interface Item {
  title: string;
  email: string;
  description: string;
  like: number;
  fav: number;
  tags: Tag[];
  comments: Comment[];
}
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
  id:number;
}
const CommentsContainer :FC<Props> = ({id}) => {
  const {userId, token} = authStore()
  const [comments, setComments] = useState<Comment[]>([])

  // 댓글 가져오기
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/comment/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        })
          .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSave = (id: number) => {
    // 수정한 댓글 저장 로직
    setEditingId(null);
  };

  const handleCancel = () => {
    // 댓글 수정 취소
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    // 댓글 삭제 로직
  };

  return (
    <div className="flex flex-col">
      <h3 className="ms-4 font-bold mb-2 text-lg">댓글</h3>
      <div className="w-full rounded-lg">
        <div
          className="max-h-32 overflow-y-auto space-y-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E0 #EDF2F7"
          }}
        >
          {comments.map((comment) => (
            <div key={comment.commentId} className="bg-base-100 p-3 rounded-lg shadow-sm flex items-center w-full">
              {editingId !== comment.commentId && (
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
              <div className="flex space-x-1">
                {editingId === comment.commentId ? (
                  <>
                    <button onClick={() => handleSave(comment.commentId)} className="p-1 hover:bg-gray-100 rounded-full">
                      <MdCheck className="h-4 w-4 text-green-500" />
                    </button>
                    <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded-full">
                      <MdClose className="h-4 w-4 text-red-500" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(comment.commentId, comment.comment)} className="p-1 hover:bg-gray-100 rounded-full">
                      <MdOutlineEdit className="h-4 w-4 text-gray-500" />
                    </button>
                    <button onClick={() => handleDelete(comment.commentId)} className="p-1 hover:bg-gray-100 rounded-full">
                      <MdDelete className="h-4 w-4 text-gray-500" />
                    </button>
                  </>
                )}
              </div>
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
