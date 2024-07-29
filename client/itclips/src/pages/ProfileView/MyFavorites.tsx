import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";

const MyFavorites = () => {       
  return (
    <>
    <MainTab />
    <SearchBar whatSearch={'즐겨찾기'} />
    </>
  );
};

export default MyFavorites;
