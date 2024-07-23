import SearchBar from "../../components/main/MainSearchBar";

const MyFavorites = () => {       
  return (
    <>
    <a href="/SignUpView" className="transition-colors duration-300 hover:text-gray-400"></a>

    <SearchBar whatSearch={'즐겨찾기'} />
    </>
  );
};

export default MyFavorites;
