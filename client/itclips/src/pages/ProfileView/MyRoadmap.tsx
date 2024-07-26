import SearchBar from "../../components/main/MainSearchBar";
import { FC } from "react";
import Roadmap from '../../components/main/Roadmap'
import Roadmap1 from '../../components/main/Roadmap1'
import Roadmap2 from '../../components/main/Roadmap2'
const MyRoadmap : FC = () => {       
  return (
    <>
    <a href="/SignUpView" className="transition-colors duration-300 hover:text-gray-400"></a>
   
    <SearchBar whatSearch={'로드맵'}/>
    <div className="mb-2"><br /></div>
    <Roadmap />
    <Roadmap1 />
    <Roadmap2 />
    </>      
  );
};

export default MyRoadmap;
