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


const RoadmapView = () => {
  const bookmarks = mainStore((state) => state.bookmarks);
  const lists = mainStore((state) => state.lists);
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const navigate = useNavigate();

  const BackButton = (): any => {
    return (
      <button className="me-5  " onClick={() => navigate(-1)}>
        <IoIosArrowBack size="40px" />{" "}
      </button>
    );
  };

  return (
    <>
      <div className="grid  grid-cols-6">
        <div className="col-span-6">
          <MainTab />
        </div>

        <div className="col-span-6 flex flex-row justify-between my-9">
          <div ><BackButton /></div> 
          <div className="flex items-center text-sky-500 text-3xl font-bold ">58.1%</div>
        </div>

        {lists.map((list)=> <ListItem list={list} />)}
        
        
      

      </div>
    </>
  )
};

export default RoadmapView;
