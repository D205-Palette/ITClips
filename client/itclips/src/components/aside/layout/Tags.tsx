// Tags.tsx 는 AsideBookmarkList.tsx 에서 태그를 출력하는 컴포넌트
import type { BookmarkListDetailType } from "../../../types/BookmarkListType";
interface Comment {
  id: number;
  username: string;
  content: string;
}

interface Tag {
  id: number;
  content: string;
}

interface Item {
  title: string;
  email: string;
  description: string;
  like: number;
  fav: number;
  tags: Tag[];
  comments: Comment[];
}

const Tags = (data: BookmarkListDetailType) => {

  return (
    <div className="mb-3 flex flex-wrap justify-center items-center w-full text-sm text-slate-500">
      {data.tags.map((tag, index) => (
        <span className="mx-1">
          #{tag.title}
        </span>
      ))}
    </div>
  );
};

export default Tags;