import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import { useState } from "react";
import mainStore from "../../stores/mainStore";

const MyGroupBookmarkList = () => {      
  
  const [filterText, changeFilterText] = useState("")
  const lists = mainStore((state) => state.lists);


  
  const filterdLists = lists.filter((list) => list.title.includes(filterText)||list.tags.includes(filterText))

  return (
    <>
<MainTab />
    <SearchBar whatSearch={'그룹 북마크 리스트'} filterText={filterText} changeFilterText={changeFilterText}/>
    </>
  );
};

export default MyGroupBookmarkList;
