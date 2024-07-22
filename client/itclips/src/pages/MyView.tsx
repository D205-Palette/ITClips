import ListItem from "../components/ListsItem(List)";
import AlbumItem from "../components/ListsItem(Album)";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { HiOutlineSquares2X2, HiMiniSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { CiBoxList } from "react-icons/ci";
import SearchBar from "../components/MainSearchBar";

export default function MyView() {
  const [tab, setTab] = useState(false);
  function tabChange(): void {
    setTab(!tab);
  }
  return (
    <>
      <SearchBar />

      <div className="flex justify-end">
        <div role="tablist" className="tabs" onClick={tabChange}>
          {tab ? (
            <>
              <Link to="/list" role="tab" className="tab mx-3">
                <CiBoxList />
              </Link>
              <Link to="/album" role="tab" className="tab tab-active">
                {" "}
                <HiMiniSquares2X2 />{" "}
              </Link>{" "}
            </>
          ) : (
            <>
              {" "}
              <Link to="/list" role="tab" className="tab tab-active mx-3">
                <FaList />
              </Link>{" "}
              <Link to="/album" role="tab" className="tab">
                {" "}
                <HiOutlineSquares2X2 />
              </Link>
            </>
          )}
        </div>
      </div>

      {tab ? <AlbumItem /> : <ListItem />}
    </>
  );
}
