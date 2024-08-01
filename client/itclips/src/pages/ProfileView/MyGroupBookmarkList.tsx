import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import { useState } from "react";
const MyGroupBookmarkList = () => {      
  
  const [filterText, changeFilterText] = useState("")
  return (
    <>
<MainTab />
    <SearchBar whatSearch={'그룹 북마크 리스트'} filterText={filterText} changeFilterText={changeFilterText}/>
    </>
  );
};

export default MyGroupBookmarkList;
