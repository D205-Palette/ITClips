import SearchBar from "../components/main/MainSearchBar";
import CategoryTab from "../components/main/CategoryTab";
import mainStore from "../stores/mainStore";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import MainTab from "../components/main/MainTab";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ListItem from "../components/main/ListsItem(Roadmap)";
import { useEffect, useState } from "react";
import darkModeStore from "../stores/darkModeStore";
import AsideRoadmap from "../components/aside/AsideRoadmap";
import { useParams } from "react-router-dom";
import type { RoadmapDetailType } from "../types/RoadmapType";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { authStore } from "../stores/authStore";
import FileResizer from "react-image-file-resizer";
import NoContent from "./ProfileView/NoContent";
import AsideMobileContent from "../components/aside/AsideRoadmap(Mobile)";
import Lottie from "lottie-react";
import CompleteAnimation from "../assets/lottie/Complete.json";
import CongratulationAnimation from "../assets/lottie/Congratulation.json";
const RoadmapView = () => {
  const params = useParams();
  const { userId, token } = authStore();
  const [roadmap, setRoadmap] = useState<RoadmapDetailType>();

  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    async function fetchData() {
      axios({
        method: "get",
        url: `${API_BASE_URL}/api/roadmap/${params.roadmapId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          viewId: userId,
        },
      })
        .then((res) => {
          setRoadmap(res.data);
          setCheckCount(
            res.data.stepList.filter((list: any) => list.check === true).length
          );
          setTotalCount(res.data.stepList.length);
          if (res.data.userId === userId) {
            setCanEdit(true);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 401) {
            setCanView(false);
          }
        });
    }
    fetchData();
  }, []);

  const bookmarkLists = roadmap?.stepList;

  const checkedList = bookmarkLists?.filter((list: any) => list.check === true);

  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const navigate = useNavigate();
  const isDark = darkModeStore((state) => state.isDark);

  const [checkCount, setCheckCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [percentage, setPercentage] = useState("0");
  const [congratulation, setCongratulation] = useState(false);
  // 내꺼 남꺼 조회 여부
  const [canView, setCanView] = useState(true);

  // 체크된 개수 바뀔때마다 갱신
  useEffect(() => {
    if (totalCount === 0) {
      setPercentage("No List");
    } else {
      setPercentage(`${((checkCount * 100) / totalCount).toFixed(1)}%`);
    }
  }, [checkCount, totalCount]);

  useEffect(() => {
    if (percentage === "100.0%") {
      setCongratulation(true);

      const timer = setTimeout(() => {
        setCongratulation(false);
      }, 3000);

    }
    }
  , [percentage]);

  const BackButton = (): any => {
    return (
      <button
        className="me-5  "
        onClick={() => navigate(`/user/${roadmap?.userId}/roadmap/`)}
      >
        <IoIosArrowBack size="40px" />{" "}
      </button>
    );
  };

  return (
    <>
      {canView ? (
        <>
          <div id="Body" className="grid grid-cols-12 gap-4">
            {/* aside 자리 */}
            <div
              id="aside"
              className="md:col-start-2 md:col-span-3 md:pe-20 col-start-2 col-span-10 "
            >
              <div className="md:block sticky hidden top-16 z-20">
                {roadmap && <AsideRoadmap roadmap={roadmap} />}
              </div>
              <div className="md:hidden static top-16 z-20">
                {roadmap && <AsideMobileContent data={roadmap} />}
              </div>
            </div>

            {/* main자리 */}
            <div
              id="Main"
              className="md:col-start-5 md:col-span-7 col-start-2 col-span-10 gap-4"
            >
              {/* <MainTab /> */}
              <div className="grid  grid-cols-7 ">
                <div className="sticky top-16 z-10 col-start-1 col-span-7 bg-base-100 py-1">
                  <MainTab userId={roadmap?.userId!} />
                </div>
                <div className="col-span-7 flex flex-row justify-between my-12 ">
                  <div className="static z-10 ">
                    <BackButton />
                  </div>
                  <div
                    className={
                      (canEdit ? "" : "hidden ") +
                      (!isDark
                        ? percentage === "100.0%"
                          ? "text-green-300"
                          : "text-sky-500"
                        : percentage === "100.0%"
                        ? "text-green-700"
                        : "text-sky-400") +
                      " flex items-center text-3xl font-bold"
                    }
                  >
                    {percentage}
                  </div>
                  {/* 퍼센트 계산 방법이.... 전체 필터걸어서 isCompleted된거 구하는거긴한데... */}
                </div>

                {roadmap?.stepList.map((list: any) => (
                  <ListItem
                    list={list}
                    count={checkCount}
                    changeCount={setCheckCount}
                    canEdit={canEdit}
                  />
                ))}
              </div>

              <div
                className={ " fixed top-0 right-0 "}
              >
                {congratulation&&<Lottie
                loop={true}
                  animationData={CongratulationAnimation}
                  height={300}
                  width={300}
                  initialSegment={[8,100]}
                />}
                
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <NoContent content="비공개로드맵" />{" "}
        </>
      )}
    </>
  );
};

export default RoadmapView;
