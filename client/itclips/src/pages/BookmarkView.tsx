import SearchBar from "../components/main/MainSearchBar";
import CategoryTab from "../components/main/CategoryTab";
import mainStore from "../stores/mainStore";
import Bookmark from "../components/main/Bookmark";
import AsideBookmarkList from "../components/aside/AsideBookmarkList";
import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";


const MyBookmark = () => {
  const bookmarks = mainStore((state) => state.bookmarks);
  const isMessageOpen = asideStore((state) => state.isMessageOpen);

  return (
    <>
      <div id="Body" className="grid grid-cols-12 gap-5">
        {/* aside 자리 */}
        <div id="aside" className="lg:col-start-3 lg:col-span-3 hidden lg:block ">
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-3 col-span-3 z-50">
            <div className="fixed">
              {isMessageOpen && <MessageLayout />}
            </div>
          </div>
          <div className="fixed">
            <AsideBookmarkList />
          </div>
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="lg:col-start-6 lg:col-span-6 col-start-3 col-span-8"
        >
          <CategoryTab />
          {bookmarks.map((bookmark) => <Bookmark bookmark={bookmark}/>)}
          
        </div>
      </div>
    </>
  );
};

export default MyBookmark;
