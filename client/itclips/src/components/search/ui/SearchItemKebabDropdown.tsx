import { useState, useEffect, useRef, FC } from "react";

// icons
import { VscKebabVertical } from "react-icons/vsc";

// components
import UrlCopyModal from "../../common/UrlCopyModal";
import ReportModal from "../../aside/modals/ReportModal";
import AddToFavorites from "../../common/AddToFavoritesModal";

interface Props {
  id: number;
  whatContent: string;
}

const SearchItemKebabDropdown: FC<Props> = ({id, whatContent}) => {
  const [isUrlCopyModalOpen, setIsUrlCopyModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddToFavModalOpen, setIsAddToFavModalOpen] =
    useState<boolean>(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories: string[] = ["url복사", "신고하기", "즐겨찾기"];
  
  const handleMenu = (menu: string) => {
    if (menu === "url복사") {
      setIsUrlCopyModalOpen(true);
    } else if (menu === "신고하기") {
      setIsReportModalOpen(true);
    } else if (menu === "즐겨찾기") {
      setIsAddToFavModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="btn btn-ghost btn-circle text-center"
        type="button"
      >
        <VscKebabVertical />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 z-50">
          <ul className="py-2 text-sm text-gray-700">
            {categories.map((category) => (
              <li key={category} onClick={() => handleMenu(category)}>
                <div className="text-center block px-4 py-2 hover:bg-gray-100">
                  {category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 모달 컴포넌트들 */}
      <UrlCopyModal
        isOpen={isUrlCopyModalOpen}
        onClose={() => setIsUrlCopyModalOpen(false)}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        whatContent={whatContent}
        id={id}
      />
      <AddToFavorites
        isOpen={isAddToFavModalOpen}
        onClose={() => setIsAddToFavModalOpen(false)}
      />
    </div>
  );
};

export default SearchItemKebabDropdown;
