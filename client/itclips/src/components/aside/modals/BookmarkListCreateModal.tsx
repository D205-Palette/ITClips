// BookmarkListEditModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '수정하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";

// icons
import { IoCloseOutline } from "react-icons/io5";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookmarkListEditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempDescription, setTempDescription] = useState<string>("");
  const [tempTag, setTempTag] = useState("")
  const [tempTags, setTempTags] = useState<{title:string}[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  // user 설정이랑 isPublic 해ㅇ줘야하나?
  const [isPublic, setIsPublic] = useState(false)
  const [imageToS3FileName, setImageToS3FileName] = useState("")
  const { userId, token } = authStore();

  const handleAddTag = () => {
    if (tempTag.trim() !== "") {
      setTempTags([...tempTags, {title:tempTag.trim()}]);
      setTempTag("");
    }
  };

  const handleRemoveTag = (inputText: string) => {
    setTempTags(tempTags.filter((tag) => tag.title !== inputText));
  };

  const endCreate = () => {
    axios({
      method: "post",
      url: `${API_BASE_URL}/api/list/add/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: tempTitle,
        description: tempDescription,
        image: "string",
        isPublic: isPublic,
        categories: tempCategories,
        users: [],
        tags: tempTags,
        imageToS3FileName: imageToS3FileName,
      },
    })
      .then((res) => {
        onClose()
      })
      .catch((err) => {
        console.error(err);
      });

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">북마크 리스트 생성</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지
          </label>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            <button className="btn btn-outline btn-sm">찾아보기</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            유저
          </label>
          <input
            type="text"
            value="고양양"
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="btn btn-primary rounded-l-none"
            >
              +
            </button>
          </div>
        </div>

        <button className="btn btn-primary w-full" onClick={() => endCreate()}>
          생성
        </button>
      </div>
    </div>
  );
};

export default BookmarkListEditModal;
