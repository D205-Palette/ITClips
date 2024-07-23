interface Info {
  title: string;
  email: string;
  description: string;
}

const DetailInfo = () => {

  // 더미 데이터
  const data: Info = {
    title: "고양양",
    email: "abc@gmail.com",
    description: "안녕하세요 고양양입니다. 재미있는 IT정보를 클립할거에여~"
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-1">{data.title}</h2>
      <p className="text-gray-500 mb-2">{data.email}</p>
      <p className="text-center text-sm mb-6">{data.description}</p>
    </div>
  );
};

export default DetailInfo;