// DeleteBookmarkListModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '삭제하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import mainStore from "../../../stores/mainStore";
import { useEffect } from "react";
import toastStore from "../../../stores/toastStore";
import type { BookmarkType } from "../../../types/BookmarkType";
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  // 삭제할게 북마크인지 리스트인지 로드맵인지 구분용
  whatContent: string;
  // 북마크들 단체 삭제용 prop들 
  id?: number;
  bookmarks?:BookmarkType[]
  changeEditBookmarksIndex?: React.Dispatch<React.SetStateAction<number[]>>
  toggleMode?: React.Dispatch<React.SetStateAction<boolean>>
  changeEditBookmarks?: React.Dispatch<React.SetStateAction<BookmarkType[]>>
}

const DeleteContentModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  whatContent,
  id,
  bookmarks,
  changeEditBookmarksIndex,
  toggleMode,
  changeEditBookmarks,
}) => {


  const navigate = useNavigate();
  const { setIsBookmarkListChange } = mainStore();
  const { setIsRoadmapChange } = mainStore();
  const { userId, token } = authStore();
const {setGlobalNotification} = toastStore()
  function deleteApi(): void {
    if (whatContent === "리스트"||whatContent === "리스트상세") {
      axios
        .delete(`${API_BASE_URL}/api/list/delete/${userId}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsBookmarkListChange(true);
          setGlobalNotification({
            message: "북마크리스트 삭제완료",
            type: "error",
          });
          navigate(`/user/${userId}`);
        });
    } 
    else if (whatContent === "북마크" && bookmarks) {
      bookmarks?.map((bookmark) => { axios
        .delete(`${API_BASE_URL}/api/bookmark/delete/${bookmark.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
          },
        })
        .then(() => {
          setIsBookmarkListChange(true);
          setGlobalNotification({
            message: "북마크 삭제완료",
            type: "error",
          });
          changeEditBookmarksIndex&&changeEditBookmarksIndex([])
          toggleMode&&toggleMode(false)
          if (          changeEditBookmarks){
          changeEditBookmarks([])}
        });})
     
    }else if (whatContent === "북마크") {
      axios
        .delete(`${API_BASE_URL}/api/bookmark/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
          },
        })
        .then(() => {
          setIsBookmarkListChange(true);
          setGlobalNotification({
            message: "북마크 삭제완료",
            type: "error",
          });
        });
    } else if (whatContent === "즐겨찾기") {
      axios
        .delete(`${API_BASE_URL}/api/list/scrap/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsBookmarkListChange(true);
          setGlobalNotification({
            message: "즐겨찾기 삭제완료",
            type: "error",
          });
        });
    } else if (whatContent === "로드맵") {
      axios
        .delete(`${API_BASE_URL}/api/roadmap/${id}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsRoadmapChange(true);
          setGlobalNotification({
            message: "로드맵 삭제완료",
            type: "error",
          });
          navigate(`/user/${userId}/roadmap`);
        });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal modal-open ">
      <div className="modal-box">
        <h3 className="font-bold text-lg">삭제하시겠습니까?</h3>
        <div className="modal-action">
         

          <button
            className="btn bg-red-500 hover:bg-red-700 text-slate-100"
            onClick={() => {
              // 삭제 로직 구현
              deleteApi();
              onClose();
            }}
          >
            예
          </button>
          <button className="btn" onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContentModal;
