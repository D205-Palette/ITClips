import { FC } from "react";

interface Props {
  whatSearch: string
  filterText : string
  changeFilterText : React.Dispatch<React.SetStateAction<string>>
}

const SearchBar : FC<Props> = ({whatSearch, filterText,changeFilterText})  => {

  return (
    <>
      <label className="input flex items-center gap-2 my-5 bg-gray-100 rounded-xl ">
        <input
          type="text"
          className="grow"
          placeholder={whatSearch + "의 이름을 검색합니다"}
          value={filterText}
          onChange={(e)=>changeFilterText(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70 hover:cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      
    </>
  );
}

export default  SearchBar;