import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { FaRegStar } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineBookmarks } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa"; // 삭제 아이콘 추가

// 타입 정의
interface Item {
  id: string;
  content: string;
}

// 각 탭의 초기값 (더미데이터)
const initialItems: { [key: string]: Item[] } = {
  bookmarks: [
    { id: "1", content: "Bookmark 1" },
    { id: "2", content: "Bookmark 2" },
    { id: "3", content: "Bookmark 3" },
    { id: "4", content: "Bookmark 4" },
    { id: "5", content: "Bookmark 5" },
    { id: "6", content: "Bookmark 6" },
    { id: "7", content: "Bookmark 7" },
    { id: "8", content: "Bookmark 8" },
    { id: "9", content: "Bookmark 9" },
    { id: "10", content: "Bookmark 10" },
    { id: "11", content: "Bookmark 11" },
    { id: "12", content: "Bookmark 12" },
    { id: "13", content: "Bookmark 13" },
    { id: "14", content: "Bookmark 14" },
    { id: "15", content: "Bookmark 15" },
  ],
  groupBookmarks: [
    { id: "16", content: "Group Bookmark 1" },
    { id: "17", content: "Group Bookmark 2" },
    { id: "18", content: "Group Bookmark 3" },
  ],
  favorites: [
    { id: "19", content: "Favorite 1" },
    { id: "20", content: "Favorite 2" },
    { id: "21", content: "Favorite 3" },
  ],
};

const RoadmapCreateView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("bookmarks");
  const [items, setItems] = useState<Item[]>(initialItems[activeTab]);
  const [roadmap, setRoadmap] = useState<Item[]>([]);
  const activeButton = "text-sky-500";

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === "sourceList" &&
      destination.droppableId === "roadmapList"
    ) {
      // 왼쪽에서 오른쪽으로 복사 (원본은 변경되지 않음)
      const item = items.find((i) => i.id === draggableId);
      if (item) {
        const isAlreadyInRoadmap = roadmap.some(
          (r) => r.content === item.content
        );
        if (isAlreadyInRoadmap) {
          alert("이미 추가되어 있습니다."); // 알림 메시지 출력
          return;
        }

        // 동일한 아이템을 여러 번 복사할 수 있도록 새로운 객체 생성
        const updatedRoadmap = Array.from(roadmap);
        updatedRoadmap.splice(destination.index, 0, {
          ...item,
          id: `${item.id}-${Date.now()}`,
        });
        setRoadmap(updatedRoadmap);
      }
    } else if (
      source.droppableId === "roadmapList" &&
      destination.droppableId === "roadmapList"
    ) {
      // 오른쪽의 순서 변경
      const updatedRoadmap = Array.from(roadmap);
      const [removed] = updatedRoadmap.splice(source.index, 1);
      updatedRoadmap.splice(destination.index, 0, removed);
      setRoadmap(updatedRoadmap);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setItems(initialItems[tab]);
  };
  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);
  // 프로필 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 아이템 삭제 핸들러
  const handleDeleteItem = (id: string) => {
    const updatedRoadmap = roadmap.filter((item) => item.id !== id);
    setRoadmap(updatedRoadmap);
  };

  return (
    <div className="grid grid-cols-12 flex-col justify-center gap-x-6 gap-y-5">
      <h1 className="xl:col-start-3 xl:col-span-3 text-3xl font-bold">
        로드맵 생성
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="aside xl:col-start-3 xl:col-span-3 flex flex-col w-full">
          {/* 왼쪽 탭 */}

          <div className="flex justify-center space-x-10 mb-4 font-bold">
            <button
              onClick={() => handleTabChange("bookmarks")}
              className={`tab-button ${
                activeTab === "bookmarks" ? `${activeButton}` : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <FaRegBookmark />
                <span>북마크리스트</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange("groupBookmarks")}
              className={`tab-button ${
                activeTab === "groupBookmarks" ? `${activeButton}` : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <MdOutlineBookmarks />
                <span>그룹 북마크리스트</span>
              </div>
            </button>
            <button
              onClick={() => handleTabChange("favorites")}
              className={`tab-button ${
                activeTab === "favorites" ? `${activeButton}` : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <FaRegStar />
                <span>즐겨찾기</span>
              </div>
            </button>
          </div>

          {/* 왼쪽 리스트 */}
          <Droppable droppableId="sourceList">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full p-4 bg-base-100 border border-gray-300 rounded-lg overflow-y-auto"
                style={{
                  maxHeight: "655px",
                  scrollbarWidth: "thin",
                }}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mx-1 mb-2 p-2 bg-base-100 border border-gray-300 rounded-lg shadow-sm"
                        style={{
                          ...provided.draggableProps.style,
                          ...(snapshot.isDragging
                            ? { backgroundColor: "#e2e8f0" }
                            : {}),
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* 로드맵 생성 */}
        <div className="main flex flex-col gap-5 xl:col-start-6 xl:col-span-5 w-full">
          {/* 로드맵 Info 입력 */}
          <div className="flex justify-center items-center gap-x-10 w-full">
            {/* 로드맵 이미지 설정 */}
            <div className="flex flex-col gap-3 justify-center">
              <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-sky-100 text-center"></div>
                )}
              </div>
              <label className="btn btn-primary btn-outline btn-sm">
                변경
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col gap-y-3 w-3/4">
              <div className="flex flex-col gap-y-2 ">
                <label className="font-bold">로드맵 이름</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="로드맵 이름을 입력해주세요."
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="font-bold">로드맵 설명</label>
                <textarea
                  className="input input-bordered w-full h-20"
                  placeholder="로드맵 설명을 입력해주세요."
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              로드맵에 포함되는 북마크리스트 목록
            </h2>
            {/* 생성할 로드맵에 포함되는 북마크리스트 목록*/}
            <Droppable droppableId="roadmapList">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 border bg-base-100 border-gray-300 rounded-lg overflow-y-auto"
                  style={{
                    maxHeight: "435px",
                    scrollbarWidth: "thin",
                  }}
                >
                  {roadmap.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mx-1 mb-2 p-2 bg-base-100 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center"
                          style={{
                            ...provided.draggableProps.style,
                            ...(snapshot.isDragging
                              ? { backgroundColor: "#e2e8f0" }
                              : {}),
                          }}
                        >
                          <div>
                            <span className="ms-2 mx-5 font-bold">
                              {index + 1}
                            </span>
                            <span>{item.content}</span>
                          </div>

                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary "
              onClick={() => console.log(roadmap)}
            >
              로드맵 생성
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default RoadmapCreateView;
