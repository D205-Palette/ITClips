interface Tag {
  username: string;
  content: string;
}

const Tags = () => {

  // 더미 데이터
  const data: Tag[] = [
    { username: "고양양", content: "#태그" },
    { username: "고양양", content: "#태그2" },
    { username: "고양양", content: "#태그3" },
  ]

  return (
    <div className="m-6 flex">
      {data.map((tag) => (
        <p>{tag.content}&nbsp;</p>
      ))}
    </div>
  );
};

export default Tags;