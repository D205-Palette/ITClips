  // 북마크리스트 세부 보기 창에서 + 버튼을 누르면 뜨는 북마크 생성용 모달

import React from "react";
import { FC, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
import mainTabStore from "../../../stores/mainTabStore";
import mainStore from "../../../stores/mainStore";

interface move {
  tabModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: React.Dispatch<React.SetStateAction<boolean>>;
  listId: number;
  categoryId:number
}

interface tagType {
    title: string;
  }
  
const AddBookmarkModal: FC<move> = ({
  tabModal,
  toggleMode,
  listId,
  categoryId,
}) => {


  const { userId, token } = authStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const whatCategory = mainTabStore((state) => state.whatCategory);
  const changeCategory = mainTabStore((state) => state.changeCategory)

  function clickCreateBtn() {
    if (inputRef.current !== null) {
      inputRef.current.disabled = false; //input 비활성화 해제
      inputRef.current.focus(); //input에 focus
    }
  }

  const [tempTitle, setTempTitle] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [tempTags, setTempTags] = useState<tagType[]>([]);

  const [createMode, changeCreateMode] = useState(false);

  const handleSubmit = () => {
    console.log(whatCategory);

    axios({
      method: "post",
      url: `${API_BASE_URL}/api/bookmark/add/${listId}/${categoryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        url: tempUrl,
        title: tempTitle,
        tags: tempTags,
        content: tempContent,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
      // 모달 다 끄기
      tabModal(false);
      toggleMode(false);
      // 카테고리 초기화
      changeCategory({categoryId:0, categoryName:""})
  };

  // 태그 추가하는 input 컨포넌트
  const CreateTagSection = () => {
    const [inputValue, changeInputValue] = useState("");

    const createTag = (): void => {
      setTempTags([...tempTags, { title: inputValue }]);
      changeCreateMode(false);
    };

    return (
      <form onSubmit={createTag} className="w-1/2">
        <input
          ref={inputRef}
          onChange={(e) => changeInputValue(e.target.value)}
          type="text"
          name=""
          id=""
          value={inputValue}
          className="m-2 border border-slate-300 rounded-lg w-11/12 ps-2 h-8"
        />
      </form>
    );
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {/* 닫기 버튼 */}
        <div className="flex flex-row justify-end">
          <button onClick={() => tabModal(false)}>
            <IoClose size={20} />
          </button>
        </div>

        <h3 className="font-bold text-xl flex flex-row justify-center">
          북마크 추가
        </h3>

        {/* 입력받는 형식들 */}
        <div className="flex flex-col justify-start items-start h-32 mt-5">
          <form className="flex flex-col w-full">
            <label className="w-full mb-3 flex flex-row">
              <div className="w-1/5 flex flex-row justify-center">URL:</div>
              <input
                type="text"
                name="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="border border-slate-400 w-3/5 ms-3 p-1"
              />
            </label>
            <label className="w-full mb-3 flex flex-row">
              <div className="w-1/5 flex flex-row justify-center">이름:</div>
              <input
                type="text"
                name="title"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="border border-slate-400  w-3/5 ms-3 p-1"
              />
            </label>
            <label className="w-full mb-3 flex flex-row">
              <div className="w-1/5 flex flex-row justify-center">내용:</div>
              <input
                type="text"
                name="content"
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="border border-slate-400  w-3/5 ms-3 p-1 "
              />
            </label>
          </form>
        </div>
        {/* 태그 입력란은 따로 */}
        <label className="w-full my-3 flex flex-row h-60 ">
          <div className="w-1/5 flex flex-row justify-center ">태그 :</div>
          <div className="border border-slate-400  w-3/5 ms-3  flex flex-row flex-wrap items-start h-48 gap-1 overflow-y-scroll">
            {tempTags.map((tag) => (
              <div className="m-2 bg-slate-200 rounded-lg py-1 px-3 h-min">
                {tag.title}
              </div>
            ))}

            {createMode ? (
              <CreateTagSection />
            ) : (
              <div className="m-2 h-min w-min flex flex-row items-center">
                <FaPlus
                  size={28}
                  onClick={() => {
                    changeCreateMode(true);
                    clickCreateBtn();
                  }}
                  className="hover:cursor-pointer "
                />
              </div>
            )}
          </div>
        </label>

        {/* 완료 버튼 */}
        <div className="flex flex-row justify-end">
          <button
            className="bg-sky-500 text-slate-100 rounded-2xl py-2 px-4 font-bold hover:bg-sky-600 me-7"
            onClick={handleSubmit}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
