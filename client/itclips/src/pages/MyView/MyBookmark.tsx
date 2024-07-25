import SearchBar from "../../components/main/MainSearchBar";
import CategoryTab from '../../components/main/CategoryTab'
import mainStore from "../../stores/mainStore";
import Bookmark from '../../components/main/Bookmark'



const MyBookmark = () => {      
  const bookmarks = mainStore((state) => state.bookmarks) 
  return (
    <>
    <CategoryTab />

    <Bookmark />

    </>
  );
};

export default MyBookmark;
