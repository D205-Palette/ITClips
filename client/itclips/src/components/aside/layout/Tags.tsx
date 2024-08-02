// Tags.tsx 는 AsideBookmarkList.tsx 에서 태그를 출력하는 컴포넌트

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

const Tags = (data: Item) => {

  return (
    <div className="m-2 flex">
      {data.tags.map((tag) => (
        <p>{tag.content}&nbsp;</p>
      ))}
    </div>
  );
};

export default Tags;