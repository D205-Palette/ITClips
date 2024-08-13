// BookmarkListEditModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '수정하기' 버튼을 눌렀을 때 출력되는 컴포넌트
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import FileResizer from "react-image-file-resizer";

// icons
import { IoCloseOutline } from "react-icons/io5";

// 기본 이미지
import noImg from "../../../assets/images/noImg.gif";

// stores
import darkModeStore from "../../../stores/darkModeStore";
import mainStore from "../../../stores/mainStore";
import { authStore } from "../../../stores/authStore";
import toastStore from "../../../stores/toastStore";

// types
import type { CategoryType } from "../../../types/BookmarkListType";

// apis
import { userSearch } from "../../../api/searchApi";

interface SearchUser {
  id: number;
  email: string;
  nickname: string;
  birth: string;
  job: string;
  gender: boolean;
  bio: string;
  image: string;
  bookmarkListCount: number;
  roadmapCount: number;
  followerCount: number;
  followingCount: number;
  following: boolean;
  followers: boolean;
}

interface SelectedUser {
  nickname: string;
  email: string;
}

interface tempUserInfo {
  id: number;
  nickName: string;
  email: string;
}

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
  const [imageState, setImageState] = useState<string>("edit"); // 이미지 변경 상태 체크
  
  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempDescription, setTempDescription] = useState<string>("");
  const [tempTag, setTempTag] = useState("");
  const [tempTags, setTempTags] = useState<{ title: string }[]>([]);
  
  const [isPublic, setIsPublic] = useState(true);
  const [tagsLengthWarning, setTagsLengthWarning] = useState(false)
  const darkButton = " bg-sky-600 hover:bg-sky-800 text-slate-200 hover:text-slate-300  border-sky-600 hover:border-sky-800 "
  const lightButton =  " bg-sky-500 hover:bg-sky-700 text-slate-100  border-sky-500 hover:border-sky-700 "
  const {setGlobalNotification} = toastStore()

  const [tempUser, setTempUser] = useState<SelectedUser[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  
  // 유저검색
  useEffect(() => {
    const searchUsers = async () => {
      if (searchInput.trim() && userId) {
        try {
          const results = await userSearch(userId, 1, searchInput);
          setSearchResults(results.data);
        } catch (error) {
          console.error("검색 중 오류 발생:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchInput, userId]);

  // 관리자 추가
  const handleAddUser = (user: SearchUser) => {
    if (!tempUser.some(selectedUser => selectedUser.email === user.email)) {
      setTempUser([...tempUser, { nickname: user.nickname, email: user.email }]);
      setSearchInput("");
      setSearchResults([]);
    }
  };

  // 관리자 제거
  const handleRemoveUser = (email: string) => {
    setTempUser(tempUser.filter(user => user.email !== email));
  };

  // 기본 데이터 조회
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
          setIsPublic(res.data.isPublic)
          // 이미지 없다
          const catArr = [];
          for (var ele of res.data.categories) {
            catArr.push(ele.categoryName);
          }
          setTempCategories(catArr);

          const userArr = res.data.users
          .filter((ele: tempUserInfo) => ele.id !== userId)
          .map((ele: tempUserInfo) => ({
            nickname: ele.nickName,
            email: ele.email
          }));
        setTempUser(userArr);

        })
        .catch((err) => {
          console.error(err);
        });
    }
  fetchData();
  console.log()
  }, []);
// 태그 3개 이상되면 경고
useEffect(()=>{
  if(tempTags.length >= 3){
    setTagsLengthWarning(true)
  } else{
    setTagsLengthWarning(false)
  }
},[tempTags.length] )

  // 태그 추가
  const handleAddTag = () => {
    if (tempTag.trim() !== "") {
      setTempTags([...tempTags, { title: tempTag.trim() }]);
      setTempTag("");
    }
  };

  const handleRemoveTag = (inputText: string) => {
    setTempTags(tempTags.filter((tag) => tag.title !== inputText));
  };

  // 수정 완료 로직
  const endEdit = () => {

    const formData = {
      title: tempTitle,
      description: tempDescription,
      image:
        imageState === "edit" // 이미지가 변경되지 않았다면 백서버에 edit 메세지 전송 (DB 이미지 변경사항 없음)
          ? "edit"
          : bookmarklistImage 
          ? `${tempTitle}-${userId}` // 변경할 로드맵 이미지가 등록 되어있다면 '제목-유저아이디'로 이미지 생성 URL 요청
          : "default", // 없다면 DB에서 이미지 삭제 요청
      isPublic: isPublic,
      categories: tempCategories,
      users: tempUser.map(user => user.email),
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
          axios.put(`${res.data.url}`, bookmarklistImage, { // 리스폰스 받은 S3 URL로 이미지 등록 요청
            headers: {
              "Content-Type": bookmarklistImage.type,
            }, // 파일의 MIME 타입 설정
          });

        }        
        setGlobalNotification({
          message: "북마크리스트 수정.",
          type: "success",
        });
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
      setImageState("new"); // 새로운 이미지로 변경하려고 할 때 상태 변경

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
    setImageState("delete"); // 등록할 이미지 상태 변경
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
                <label className={(isDark? darkButton: lightButton ) +" btn btn-outline"}>
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
          <label className={(isDark? "text-gray-400":"text-gray-700") + " block text-sm font-medium mb-2"}>
            관리자
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tempUser.map((user, index) => (
              <span
                key={index}
                className={(isDark? "bg-black" : "bg-gray-200") + " px-2 py-1 rounded-full text-sm flex items-center"}
              >
                {user.nickname}
                <button
                  onClick={() => handleRemoveUser(user.email)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <IoCloseOutline size={16} />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="관리자 검색"
          />
          {searchResults.length > 0 && (
            <div className="mt-2 border rounded-md max-h-40 overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleAddUser(user)}
                >
                  <img 
                    src={user.image || noImg} 
                    alt={user.nickname} 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <div className="font-semibold">{user.nickname}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          {/* <label className="block text-sm font-medium  mb-2"> */}
          <label className={(isDark? "text-geay-400":" text-gray-700") + " block text-sm font-medium mb-2"}>
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
          <label className={(isDark? "text-geay-400":" text-gray-700") +  " block text-sm font-medium mb-2"}>
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
          <label className={(isDark? "text-geay-400":" text-gray-700") + " block text-sm font-medium  mb-2"}>
            태그
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tempTags.map((tag, index) => (
              <span
                key={index}
                className={(isDark? "bg-black" : "bg-gray-200") + " px-2 py-1 rounded-full text-sm flex items-center"}
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
              placeholder={tagsLengthWarning? "태그는 3개까지 가능합니다" :"새 태그 입력"}
              disabled={tagsLengthWarning}
              maxLength={20}
            />
            
            <button
              onClick={handleAddTag}
              className={(isDark? darkButton: lightButton ) +" btn rounded-l-none"}
              disabled={tagsLengthWarning}
            >
              +
            </button>
          </div>
        </div>

        <div className="form-control flex flex-row items-center justify-end my-3">
              <label>공개 여부</label>
              <input
                type="checkbox"
                checked={isPublic? true: false}
                onClick={() => setIsPublic(!isPublic)}
                className="checkbox checkbox-info  [--chkfg:white] mx-2 "
              />
            </div>
        <button className={(isDark? darkButton: lightButton ) + " btn w-full"} onClick={() => endEdit()}>
          수정
        </button>
      </div>
    </div>
  );
};

export default BookmarkListEditModal;
