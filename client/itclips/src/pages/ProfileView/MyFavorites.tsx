import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import { useState } from "react";
const MyFavorites = () => {       
  const [filterText, changeFilterText] = useState("")
  return (
    <>
    <MainTab />
    <SearchBar whatSearch={'즐겨찾기'} filterText={filterText} changeFilterText={changeFilterText}/>
    </>
  );
};

export default MyFavorites;
