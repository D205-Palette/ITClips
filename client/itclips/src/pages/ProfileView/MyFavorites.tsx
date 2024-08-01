import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import { useState } from "react";
import mainStore from "../../stores/mainStore";

const MyFavorites = () => {       
  const [filterText, changeFilterText] = useState("")

  const lists = mainStore((state) => state.lists);
  
  const filterdLists = lists.filter((list) => list.title.includes(filterText)||list.tags.includes(filterText))

  return (
    <>
    <MainTab />
    <SearchBar whatSearch={'즐겨찾기'} filterText={filterText} changeFilterText={changeFilterText}/>
    </>
  );
};

export default MyFavorites;
