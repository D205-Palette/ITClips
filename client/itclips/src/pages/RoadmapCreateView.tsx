import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FaRegStar, FaRegBookmark, FaTrashAlt } from "react-icons/fa";
import { MdOutlineBookmarks } from "react-icons/md";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";
import { BookmarkListSumType } from "../types/BookmarkListType";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import noImg from "../assets/images/noImg.gif";

// 타입 정의
interface Item extends BookmarkListSumType {
  originalId?: string; // 원본 아이디를 저장할 수 있는 필드
}

// 각 탭의 초기값 (더미데이터는 이제 빈 배열로 초기화)
const initialItems: { [key: string]: Item[] } = {
  bookmarks: [],
  groupBookmarks: [],
  favorites: [],
};

const RoadmapCreateView: React.FC = () => {
  const navigate = useNavigate();
  const { userId, token } = authStore();
  const [activeTab, setActiveTab] = useState<string>("bookmarks");
  const [items, setItems] = useState<Item[]>(initialItems[activeTab]);
  const [roadmap, setRoadmap] = useState<Item[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [roadmapImage, setRoadmapImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const activeButton = "text-sky-500";

  // API로부터 데이터 불러오기
  const fetchData = async () => {
    try {
      // 개인 북마크리스트 조회
      const personalResponse = await axios.get(
        `${API_BASE_URL}/api/list/personal/${userId}?viewerId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // 그룹 북마크리스트 조회
      const groupResponse = await axios.get(
        `${API_BASE_URL}/api/list/group/${userId}?viewerId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // 즐겨찾기 조회
      const scrapResponse = await axios
        .get(`${API_BASE_URL}/api/list/scrap/${userId}?viewerId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => {
          // 즐겨찾기 한 글 없으면 404 에러뜸
          console.log(err);
        });

      // 데이터 가공하여 설정
      const processItems = (data: any[]): Item[] =>
        data.map((item) => ({
          id: item.id,
          originalId: item.id, // 원본 ID 저장
          title: item.title,
          description: item.description,
          bookmarkCount: item.bookmarkCount,
          likeCount: item.likeCount,
          image: item.image,
          isLiked: item.isLiked,
          tags: item.tags.map((tag: any) => ({
            id: tag.id,
            title: tag.title,
          })),
          users: item.users.map((user: any) => ({
            id: user.id,
            nickName: user.nickName,
          })),
        }));

      initialItems.bookmarks = processItems(personalResponse.data);
      initialItems.groupBookmarks = processItems(groupResponse.data);
      initialItems.favorites = processItems(scrapResponse?.data);

      console.log(initialItems);
      // 활성화된 탭에 따라 items 설정
      setItems(initialItems[activeTab]);

      setDataLoaded(true); // 데이터가 로드되었음을 표시
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  // 선택된 이미지 내리기
  const handleImageRemove = () => {
    setRoadmapImage(null);
    setPreviewImageUrl(null);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === "sourceList" &&
      destination.droppableId === "roadmapList"
    ) {
      // 왼쪽에서 오른쪽으로 복사 (원본은 변경되지 않음)
      const item = items.find((i) => i.id.toString() === draggableId);
      if (item) {
        // 이미 존재하는 아이템인지 확인
        const isAlreadyInRoadmap = roadmap.some(
          (r) => r.originalId?.toString() === item.originalId?.toString()
        );
        if (isAlreadyInRoadmap) {
          alert("이미 추가되어 있습니다."); // 알림 메시지 출력
          return;
        }

        // 동일한 아이템을 여러 번 복사할 수 있도록 새로운 객체 생성
        const updatedRoadmap = Array.from(roadmap);
        updatedRoadmap.splice(destination.index, 0, {
          ...item,
          id: item.id + Date.now(), // 고유한 id로 복사
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

  // 로드맵 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 파일이 선택되지 않았을 때 null 처리
    if (file) {
      setRoadmapImage(file); // 파일 자체를 상태에 저장

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setRoadmapImage(null);
      setPreviewImageUrl(null);
    }
  };

  // 아이템 삭제 핸들러
  const handleDeleteItem = (id: string) => {
    const updatedRoadmap = roadmap.filter((item) => item.id.toString() !== id);
    setRoadmap(updatedRoadmap);
  };

  // 로드맵 생성 버튼 클릭
  const handleCreateRoadmap = async (values: {
    title: string;
    description: string;
  }) => {
    const roadmapData = {
      title: values.title,
      description: values.description,
      image: roadmapImage ? `${values.title}-${userId}` : "default",
      isPublic: isPublic ? 1 : 0,
      stepList: roadmap.map((item) => Number(item.originalId)),
    };
    try {
      const roadmapCreateResponse = await axios.post(
        `${API_BASE_URL}/api/roadmap/${userId}`,
        roadmapData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (roadmapImage) {
        await axios.put(`${roadmapCreateResponse.data.url}`, roadmapImage, {
          headers: {
            "Content-Type": roadmapImage.type,
          }, // 파일의 MIME 타입 설정
        });
      }

      window.alert("로드맵을 생성하였습니다.");
      navigate(`/user/${userId}/roadmap`);
    } catch (error) {
      window.alert("로드맵을 생성을 실패하였습니다.");
      console.error(error);
    }
  };

  // 초기 값과 validation schema
  const initialValues = { title: "", description: "" };
  const validationSchema = Yup.object({
    title: Yup.string().required("로드맵 제목을 입력해주세요."),
    description: Yup.string().optional(),
  });

  return (
    <div className="grid grid-cols-12 flex-col justify-center gap-x-6 gap-y-5">
      <h1 className="col-start-3 col-span-3 text-3xl font-bold">로드맵 생성</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* 좌측 */}
        <div className="aside col-start-3 col-span-3 flex flex-col w-full">
          {/* 왼쪽 탭 */}
          <div className="flex justify-center space-x-5 mb-4 font-bold text-xs">
            <button
              onClick={() => handleTabChange("bookmarks")}
              className={`tab-button ${
                activeTab === "bookmarks" ? `${activeButton}` : ""
              }`}
            >
              <div className="flex gap-1 items-center">
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
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
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
                        <div className="flex items-center">
                          {item.image?.trim() !== "" ? (
                            <img
                              src={item.image}
                              alt="img"
                              className="w-16 h-16 border object-cover mr-4"
                            />
                          ) : (
                            <div className="w-16 h-16 border bg-base-100 mr-4"></div>
                          )}
                          <div className="flex w-full items-center justify-between me-3">
                            <div>
                              <h4 className="text-lg font-bold">
                                {item.title}
                              </h4>
                              <p className="line-clamp-1">{item.description}</p>
                            </div>
                            <div className="flex w-40 gap-1 overflow-hidden whitespace-nowrap">
                              {/* <div className="flex-grow overflow-hidden text-ellipsis">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag.id}
                                    className="text-sm text-gray-500"
                                  >
                                    #{tag.title}
                                  </span>
                                ))}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* 우측 */}
        {/* 로드맵 생성 */}
        <div className="main flex flex-col gap-5 col-start-6 col-span-5 w-full">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateRoadmap}
          >
            {({ handleSubmit, isValid, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-2">
                  {/* 로드맵 Info 입력 */}
                  <div className="flex justify-center items-center gap-x-6 w-full">
                    {/* 로드맵 이미지 설정 */}
                    <div className="flex flex-col gap-x justify-center">
                      <div className="flex flex-col gap-y-2">
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

                        {previewImageUrl && (
                          <button
                            type="button"
                            onClick={handleImageRemove}
                            className="btn btn-outline btn-xs mt-2"
                          >
                            이미지 삭제
                          </button>
                        )}

                        <label className="btn btn-primary btn-outline btn-xs">
                          이미지 업로드
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* 로드맵 타이틀 & 내용 입력 */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between">
                        <h2 className="font-bold">로드맵 제목</h2>
                        <div className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                            className="checkbox"
                          />
                          <span className="ml-2">공개 여부</span>
                        </div>
                      </div>
                      <Field
                        name="title"
                        type="text"
                        placeholder="로드맵 제목을 입력해주세요."
                        className="input input-bordered w-full"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500"
                      />
                      <h2 className="font-bold">로드맵 설명</h2>
                      <Field
                        name="description"
                        as="textarea"
                        placeholder="로드맵 내용을 입력해주세요. (선택)"
                        className="textarea textarea-bordered w-full h-24"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  {/* 오른쪽 드롭 리스트 */}
                  <div>
                    <h2 className="font-bold mb-2">로드맵 Step 목록</h2>
                    <p>1개 이상의 북마크리스트를 등록해주세요.</p>
                    <Droppable droppableId="roadmapList">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex-grow p-4 bg-base-100 border border-gray-300 rounded-lg overflow-y-auto"
                          style={{
                            maxHeight: "450px",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {roadmap.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
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
                                  <div className="flex items-center">
                                    <div className="me-3 font-bold">
                                      {index + 1}
                                    </div>
                                    {item.image?.trim() !== "" ? (
                                      <img
                                        src={item.image}
                                        alt="img"
                                        className="w-16 h-16 border object-cover mr-4"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 border bg-base-100 mr-4"></div>
                                    )}
                                    <div className="flex w-full items-center justify-between me-3">
                                      <div>
                                        <h4 className="text-lg font-bold">
                                          {item.title}
                                        </h4>
                                        <p className="line-clamp-1">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleDeleteItem(item.id.toString())
                                      }
                                      className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                      <FaTrashAlt />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-outline ms-auto"
                    disabled={!isValid || !values.title || roadmap.length === 0} // 필수 요소가 없을 때 비활성화
                  >
                    로드맵 생성하기
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DragDropContext>

      {/* 뒤로가기 버튼 */}
      <button
        className="fixed bottom-10 right-10"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoClose size={56} />
      </button>
    </div>
  );
};

export default RoadmapCreateView;
