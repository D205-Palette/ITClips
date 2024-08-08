// BookmarkListEditModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '수정하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
import { useEffect } from "react";
// icons
import { IoCloseOutline } from "react-icons/io5";

// 기본 이미지
import noImg from "../../../assets/images/noImg.gif";

import darkModeStore from "../../../stores/darkModeStore";
import type { CategoryType } from "../../../types/BookmarkListType";
import mainStore from "../../../stores/mainStore";
import FileResizer from "react-image-file-resizer";

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
  // 이미지 업로드 상태 관리
  const [bookmarklistImage, setBookmarklistImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const {setIsBookmarkListChange} = mainStore()
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
          setPreviewImageUrl(res.data.image);
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
      image: bookmarklistImage ? `${tempTitle}-${userId}` : "default",
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
        if (bookmarklistImage) {
          axios.put(`${res.data.url}`, bookmarklistImage, {
            headers: {
              "Content-Type": bookmarklistImage.type,
            }, // 파일의 MIME 타입 설정
          });

        }
        console.log(res.data.url)
        window.alert("북마크리스트를 수정하였습니다.");
        setIsBookmarkListChange(true)
        onClose();
      })      
      .catch((err) => console.log(err));
  };
  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      FileResizer.imageFileResizer(
        file,
        200, // 이미지 너비
        200, // 이미지 높이
        'SVG', // 파일 형식 - SVG 대신 JPEG로 변경
        100, // 이미지 퀄리티
        0,
        (uri) => {
          if (uri) {
            resolve(uri as File); // Promise를 사용하여 비동기 처리
          } else {
            reject(new Error('Resizing failed'));
          }
        },
        'file' // 출력 타입
      );
    });
  // 북마크리스트 이미지 변경 핸들러
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 파일이 선택되지 않았을 때 null 처리
    
    if (file) {
      const compressedFile = await resizeFile(file);
      await setBookmarklistImage(compressedFile); // 파일 자체를 상태에 저장

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    } else {
      setBookmarklistImage(null);
      setPreviewImageUrl(null);
    }
  };

  // 선택된 이미지 내리기
  const handleImageRemove = () => {
    setBookmarklistImage(null);
    setPreviewImageUrl(null);
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
          {/* 북마크리스트 이미지 설정 */}
          <div className="flex flex-col justify-center">
            <div className="flex gap-x-5">
              {/* 이미지 */}
              <div className="border w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                {previewImageUrl === "default" || previewImageUrl === null ? (
                  <img
                    src={noImg}
                    alt="noImg"
                    className=" w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={previewImageUrl || ""}
                    alt="roadmapImg"
                    className="border w-full h-full object-cover"
                  />
                )}
              </div>
              {/* 이미지 컨트롤러 */}
              <div className="flex flex-col gap-y-2">
                <label className="btn bg-sky-500 hover:bg-sky-700 text-slate-100 btn-outline">
                  이미지 업로드
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {previewImageUrl && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="btn btn-outline"
                  >
                    이미지 삭제
                  </button>
                )}
              </div>
            </div>
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
          {/* <label className="block text-sm font-medium  mb-2"> */}
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
