// AsideBookmarkList.tsx 는 북마크리스트 정보를 출력하는 컴포넌트

// components
import AsideKebabDropdown from "./ui/AsideKebabDropdown";
import ImageContainer from "./layout/ImageContainer";
import ItemDetailInfo from "./layout/ItemDetailInfo";
import LikesFavoritesCount from "./layout/LikesFavoritesCount";
import Tags from "./layout/Tags";
import CommentsContainer from "./layout/CommentsContainer(Roadmap)";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { FC } from "react";

// stores
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";

interface ItemProps {
  roadmap: {
    id: number;
    userId: number;
    userName: string;
    title: string;
    description: string;
    createdAt: string;
    image: string;
    isPublic: number;
    stepList: {
      id: number;
      roadmapId: number;
      bookmarkListResponseDTO: {
        id: number;
        title: string;
        description: string;
        bookmarkCount: number;
        likeCount: number;
        image: string;
        tags: {
          title: string;
        }[];
        users: {
          id: number;
          nickName: string;
        }[];
      };
      check: number;
      order: number;
    }[];

    commentList: {
      id: number;
      comment: string;
      userId: number;
      userName: string;
      createdAt: string;
      roadmapId: number;
    }[];
    likeCnt: number;
    scrapCnt: number;
  };
}

const ProfileCard: FC<ItemProps> = ({ roadmap }) => {

  const isDark = darkModeStore((state) => state.isDark);
  const isMessageOpen = asideStore((state) => state.isMessageOpen);

  return (
    <div
      className={`${
        isDark ? "bg-aside-dark" : "bg-aside-light"
      } rounded-3xl w-80 p-8 flex flex-col items-center`}
    >
      {/* 더보기 버튼 */}
      {!isMessageOpen && <AsideKebabDropdown isRoadmap={true} />}
      {/* 북마크리스트 썸네일 */}
      <ImageContainer />
      {/* 북마크리스트 정보 */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-1">{roadmap.title}</h2>
        <p className="text-center text-sm mb-6">{roadmap.description}</p>
      </div>
      {/* 좋아요, 즐겨찾기 칸 */}
      <div className="grid grid-cols-6">
        <div className="col-start-2 flex">
          <div>
            <FaRegHeart />
          </div>
          <div>
            <span>{roadmap.likeCnt}</span>
          </div>
        </div>
        <div className="col-start-5 flex">
          <div>
            <FaRegStar />
          </div>
          <div>
            <span>{roadmap.scrapCnt}</span>
          </div>
        </div>
      </div>

      {/* 댓글 창 */}
      <CommentsContainer commentList={roadmap.commentList} />
    </div>
  );
};

export default ProfileCard;
