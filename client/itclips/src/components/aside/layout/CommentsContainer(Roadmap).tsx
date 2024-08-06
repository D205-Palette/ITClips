// CommentsContainer.tsx 는 댓글들을 리스트로 출력하는 컴포넌트
import React, { useState, useEffect, FC } from "react";
import axios from "axios";

// apis
import { getRoadmapComments } from "../../../api/roadmapApi";

// components
import CommentWrite from "../ui/CommentWrite";

// stores
import { authStore } from "../../../stores/authStore";

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

  const userInfo = authStore(state => state.userInfo);
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ editingId, setEditingId ] = useState<number | null>(null);
  const [ editContent, setEditContent ] = useState("");

  // 댓글 수정 로직(임시)
  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  // 댓글 가져오기
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await getRoadmapComments(id);
  //       setComments(response.data);
  //     } catch (error) {
  //       console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
  //     }
  //   };

  //   fetchComments();
  // }, [id]);

  // 댓글 작성 로직
  const handleCommentSubmit = async (content: string) => {
    // try {
    //   const response = await writeBookmarkListComment(userId, id, content);
    //   // API 응답에 따라 새로운 댓글을 comments 배열에 추가
    //   const newComment: Comment = response.data;
    //   setComments(prevComments => [...prevComments, newComment]);
    // } catch (error) {
    //   console.error("댓글 작성 중 오류가 발생했습니다:", error);
    // }
  };

  const handleSaveComment = (id: number) => {
    // 수정한 댓글 저장 로직
    setEditingId(null);
  };

  const handleEditCancelComment = () => {
    // 댓글 수정 취소
    setEditingId(null);
  };

  const handleDeleteComment = (id: number) => {
    // 댓글 삭제 로직
  };

  // 임시
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
      <CommentWrite onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentsContainer;