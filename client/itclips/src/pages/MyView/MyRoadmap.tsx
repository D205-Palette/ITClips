import SearchBar from "../../components/main/MainSearchBar";
import { FC } from "react";

const MyRoadmap : FC = () => {       
  return (
    <>
    <a href="/SignUpView" className="transition-colors duration-300 hover:text-gray-400"></a>

    <SearchBar whatSearch={'로드맵'}/>
    </>      
  );
};

export default MyRoadmap;
