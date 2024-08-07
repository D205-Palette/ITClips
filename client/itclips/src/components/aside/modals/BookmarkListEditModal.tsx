// BookmarkListEditModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '수정하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
import { useEffect } from "react";
// icons
import { IoCloseOutline } from "react-icons/io5";

import darkModeStore from "../../../stores/darkModeStore";
import type { CategoryType } from "../../../types/BookmarkListType";
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const BookmarkListEditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const { userId, token } = authStore();
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const {isDark}= darkModeStore()
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/list/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          setTempTitle(res.data.title);
          setTempDescription(res.data.description);
          setTempTags(res.data.tags);
          setTempImage(res.data.image);
          // 이미지 없다
          const catArr = [];
          for (var ele of res.data.categories) {
            catArr.push(ele.categoryName);
          }
          setTempCategories(catArr);

          const userArr = [];
          for (var ele of res.data.users) {
            userArr.push(ele.nickName);
          }
          setTempUser(userArr);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchData();
  }, []);

  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempDescription, setTempDescription] = useState<string>("");
  const [tempTag, setTempTag] = useState("");
  const [tempTags, setTempTags] = useState<{ title: string }[]>([]);

  // 수정할 이미지?
  const [tempImage, setTempImage] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [tempUser, setTempUser] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tempTag.trim() !== "") {
      setTempTags([...tempTags, { title: tempTag.trim() }]);
      setTempTag("");
    }
  };

  const handleRemoveTag = (inputText: string) => {
    setTempTags(tempTags.filter((tag) => tag.title !== inputText));
  };
  
  const endEdit = () => {
    console.log("api때");
    console.log(tempCategories);
    const formData = {
      title: tempTitle,
      description: tempDescription,
      image: tempImage,
      isPublic: isPublic,
      categories: tempCategories,
      users: tempUser,
      tags: tempTags,
    };

    axios
      .put(`${API_BASE_URL}/api/list/update/${userId}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        onClose();
      })
      .catch((err) => console.log(err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-96 fixed z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">북마크 리스트 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-2">
            이미지
          </label>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            <button className="btn btn-outline btn-sm">찾아보기</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-2">
            유저
          </label>
          <input
            type="text"
            value="고양양"
            readOnly
            className={(isDark?  "bg-slate-600":"bg-gray-100" ) + " w-full px-3 py-2 border rounded-md "}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-2">
            리스트명
          </label>
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="리스트명을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            내용
          </label>
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md resize-none"
            placeholder="리스트 내용을 입력하세요"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mb-2">
            태그
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tempTags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag.title}
                <button
                  onClick={() => handleRemoveTag(tag.title)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <IoCloseOutline size={16} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tempTag}
              onChange={(e) => setTempTag(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-l-md"
              placeholder="새 태그 입력"
            />
            <button
              onClick={handleAddTag}
              className="btn bg-sky-500 hover:bg-sky-700 text-slate-100 rounded-l-none"
            >
              +
            </button>
          </div>
        </div>

        <button className="btn text-slate-100 bg-sky-500 hover:bg-sky-700 w-full" onClick={() => endEdit()}>
          수정
        </button>
      </div>
    </div>
  );
};

export default BookmarkListEditModal;
