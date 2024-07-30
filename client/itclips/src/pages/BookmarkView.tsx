import SearchBar from "../components/main/MainSearchBar";
import CategoryTab from "../components/main/CategoryTab";
import mainStore from "../stores/mainStore";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import mainTabStore from '../stores/mainTabStore'

const MyBookmark = () => {


  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const filter = mainTabStore((state)=>state.whatCategory)

  const bookmarks = (filter==='' ?  mainStore((state) => state.bookmarks) :  mainStore((state) => state.bookmarks).filter((bookmark) => bookmark.category === filter))

  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-5">
        {/* aside 자리 */}
        <div id="aside" className="xl:col-start-3 xl:col-span-3 hidden xl:block ">
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-3 col-span-3">
            {isMessageOpen && <MessageLayout />}
          </div>
          <AsideBookmarkList />
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="xl:col-start-6 xl:col-span-6 col-start-3 col-span-8 gap-4"
        >
          <CategoryTab />
          {bookmarks.map((bookmark) => <Bookmark bookmark={bookmark}/>)}
          
        </div>
      </div>
    </>
  );
};

export default MyBookmark;
