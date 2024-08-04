import React from "react";
import { FC, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

interface move {
  moveBookmarks: number[];
  tabModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBookmarkListModal: FC<move> = ({
  moveBookmarks,
  tabModal,
  toggleMode,
}) => {
  // 편의상 하나만 했지만, 나중에 내 북리, 그룹 북리 다 가져와서 선택해서 넣게


  const inputRef = useRef<HTMLInputElement>(null)

  function clickCreateBtn() {
      if (inputRef.current !== null) {
        inputRef.current.disabled = false; //input 비활성화 해제
        inputRef.current.focus(); //input에 focus
      }
    }

  function endMoving(): any {
    // moveBookmarks.map((bookmark) => )
    tabModal(false);
    toggleMode(false);
    ///여기에 api호출로 북마크 생성
  }

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    tags: [{ title: "" }],
    content: "",
  });

  interface tagType {
    title: string;
  }
  interface tagsType extends Array<tagType> {}

  const [tagsForm, changeTagsForm] = useState<tagsType>([]);
  const [createMode, changeCreateMode] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const postData = new FormData();

    // formData.tags.map((tag) => postData.append("tags[]", tag.title));

    postData.append("url", formData.url);
    postData.append("title", formData.title);
    postData.append("tags", JSON.stringify(tagsForm));
    postData.append("content", formData.content);

    fetch("/api/endpoint", {
      method: "POST",
      body: postData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data

      })
      .catch((error) => {
        // Handle any errors

      });
  };

  // 태그 추가하는 input 컨포넌트
  const CreateTagSection = () => {
    const [inputValue, changeInputValue] = useState("");

    const createTag = (event: React.FormEvent): void => {
      event.preventDefault();

      changeTagsForm([...tagsForm, { title: inputValue }]);
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
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <label className="w-full mb-3 flex flex-row">
              <div className="w-1/5 flex flex-row justify-center">URL:</div>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="border border-slate-400 w-3/5 ms-3 p-1"
              />
            </label>
            <label className="w-full mb-3 flex flex-row">
              <div className="w-1/5 flex flex-row justify-center">이름:</div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-slate-400  w-3/5 ms-3 p-1"
              />
            </label>
            <label className="w-full mb-3 flex flex-row">
              <div className="w-1/5 flex flex-row justify-center">내용:</div>
              <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="border border-slate-400  w-3/5 ms-3 p-1 "
              />
            </label>
          </form>
        </div>
        {/* 태그 입력란은 따로 */}
        <label className="w-full my-3 flex flex-row h-60 ">
          <div className="w-1/5 flex flex-row justify-center ">태그 :</div>
          <div className="border border-slate-400  w-3/5 ms-3  flex flex-row flex-wrap items-start h-48 gap-1 overflow-y-scroll">
            {tagsForm.map((tag) => (
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
                  onClick={() => {changeCreateMode(true); clickCreateBtn();}}
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
            onClick={endMoving}>
            생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkListModal;
