// BookmarkListEditModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '수정하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
import mainStore from "../../../stores/mainStore";
// icons
import { IoCloseOutline } from "react-icons/io5";

// 기본 이미지
import noImg from "../../../assets/images/noImg.gif";

import FileResizer from "react-image-file-resizer";
import toastStore from "../../../stores/toastStore";
import darkModeStore from "../../../stores/darkModeStore";
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookmarkListCreateModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempDescription, setTempDescription] = useState<string>("");
  const [tempTag, setTempTag] = useState("");
  const [tempTags, setTempTags] = useState<{ title: string }[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);

  // user 설정이랑 isPublic 해ㅇ줘야하나?
  const [isPublic, setIsPublic] = useState<any>(true);
  const [imageToS3FileName, setImageToS3FileName] = useState("");
  const { userId, token } = authStore();
  // 이미지 업로드 상태 관리
  const [bookmarklistImage, setBookmarklistImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const { isBookmarkListChange, setIsBookmarkListChange } = mainStore();
  const [tagsLengthWarning, setTagsLengthWarning] = useState(false);

  const { setGlobalNotification } = toastStore();
  const { isDark } = darkModeStore();
  const darkButton =
    " bg-sky-600 hover:bg-sky-800 text-slate-200 hover:text-slate-300  border-sky-600 hover:border-sky-800 ";
  const lightButton =
    " bg-sky-500 hover:bg-sky-700 text-slate-100  border-sky-500 hover:border-sky-700 ";
  const handleAddTag = () => {
    if (tempTag.trim() !== "") {
      setTempTags([...tempTags, { title: tempTag.trim() }]);
      setTempTag("");
    }
  };

  const handleRemoveTag = (inputText: string) => {
    setTempTags(tempTags.filter((tag) => tag.title !== inputText));
  };

  const handleCloseModal = () => {
    onClose();
    setBookmarklistImage(null);
    setPreviewImageUrl(null);
  };

  // 태그 3개 이상되면 경고
  useEffect(() => {
    if (tempTags.length >= 3) {
      setTagsLengthWarning(true);
    } else {
      setTagsLengthWarning(false);
    }
  }, [tempTags.length]);

  const endCreate = () => {
    // if(isPublic){
    //   setIsPublic(1)
    // } else{
    //   setIsPublic(0)
    // }
    axios({
      method: "post",
      url: `${API_BASE_URL}/api/list/add/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: tempTitle,
        description: tempDescription,
        image: bookmarklistImage ? `${tempTitle}-${userId}` : "default",
        isPublic: isPublic,
        categories: ["새 카테고리"],
        users: [],
        tags: tempTags,
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
        setIsBookmarkListChange(true);
        // 입력값들 초기화
        setTempTitle("");
        setTempTags([]);
        setTempTag("");
        setTempDescription("");
        // setTemp
        handleImageRemove();
        setGlobalNotification({
          message: "북마크 리스트 생성 완료",
          type: "success",
        });
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      FileResizer.imageFileResizer(
        file,
        200, // 이미지 너비
        200, // 이미지 높이
        "SVG", // 파일 형식 - SVG 대신 JPEG로 변경
        100, // 이미지 퀄리티
        0,
        (uri) => {
          if (uri) {
            resolve(uri as File); // Promise를 사용하여 비동기 처리
          } else {
            reject(new Error("Resizing failed"));
          }
        },
        "file" // 출력 타입
      );
    });

  // 북마크리스트 이미지 변경 핸들러
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      <div className="bg-base-100 rounded-lg p-8 w-1/2  flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">북마크 리스트 생성</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        
        <div className="flex flex-row justify-between gap-6">
          {/* 왼쪽칸 */}
          <div className="flex flex-col w-1/2">
            {/* 이미지 */}
            <div className="mb-4">
              <label
                className={
                  (isDark ? "text-geay-400" : " text-gray-700") +
                  " block text-sm font-medium mb-2"
                }
              >
                이미지
              </label>
              {/* 북마크리스트 이미지 설정 */}
              <div className="flex flex-col justify-center ">
                <div className="flex gap-x-5 ">
                  {/* 이미지 */}
                  <div className="border w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                    {previewImageUrl === "default" ||
                    previewImageUrl === null ? (
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
                  <div className="flex flex-col justify-start py-2 gap-y-2">
                    <label
                      className={
                        (isDark ? darkButton + " " : lightButton + " ") +
                        " btn "
                      }
                    >
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
            {/* 태그 */}
            <div className="mb-4 w-full">
              <label
                className={
                  (isDark ? "text-geay-400" : " text-gray-700") +
                  " block text-sm font-medium mb-2"
                }
              >
                태그
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tempTags.map((tag, index) => (
                  <span
                    key={index}
                    className={
                      (isDark ? "bg-black" : "bg-gray-200") +
                      " px-2 py-1 rounded-full text-sm flex items-center"
                    }
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
              <div className="flex w-full">
                <input
                  type="text"
                  value={tempTag}
                  onChange={(e) => setTempTag(e.target.value)}
                  className={" flex-grow px-3 py-2 border rounded-l-md  w-2/3"}
                  placeholder={
                    tagsLengthWarning
                      ? "태그는 3개까지 가능합니다"
                      : "새 태그 입력"
                  }
                  disabled={tagsLengthWarning}
                  maxLength={20}
                />
                <button
                  onClick={handleAddTag}
                  className={
                    (isDark
                      ? darkButton + " border-sky-600 hover:border-sky-800 "
                      : lightButton + " border-sky-500 hover:border-sky-700 ") +
                    "btn rounded-l-none border-2 "
                  }
                  disabled={tagsLengthWarning}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 오른칸 */}
          <div className="flex flex-col w-1/2 justify-start">

            <div className="mb-4 h-1/3">
              <label className={" block text-sm font-medium mb-2"}>
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

            <div className="mb-4 h-2/3">
              <label
                className={
                  (isDark ? "text-geay-400" : " text-gray-700") +
                  " block text-sm font-medium  mb-2"
                }
              >
                내용
              </label>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md resize-none h-2/3"
                placeholder="리스트 내용을 입력하세요"
                rows={3}
              />
            </div>
            
          </div>
        </div>
        <div className="w-full flex flex-row justify-end gap-4">
          <div className="form-control flex flex-row items-center justify-end my-3">
            <label htmlFor="">공개 여부</label>
            <input
              type="checkbox"
              checked={isPublic}
              onClick={() => setIsPublic(!isPublic)}
              className="checkbox checkbox-info  [--chkfg:white] mx-2 "
            />
          </div>

          <button
            className={(isDark ? darkButton : lightButton) + " btn w-20 "}
            onClick={() => endCreate()}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkListCreateModal;
