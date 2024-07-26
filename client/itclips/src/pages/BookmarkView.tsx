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
      <div id="Body" className="grid grid-cols-8 gap-4">
        {/* aside 자리 */}
        <div id="aside" className="col-start-2 col-span-2 hidden xl:block ">
          {/* 메세지 뜨는 위치 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
            {isMessageOpen && <MessageLayout />}
          </div>
          <AsideBookmarkList />
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="lg:col-start-4 lg:col-span-4 md:col-start-3 md:col-span-5 sm:col-start-2 sm:col-span-6"
        >
          <CategoryTab />

          <Bookmark />
        </div>
      </div>
    </>
  );
};

export default MyBookmark;
