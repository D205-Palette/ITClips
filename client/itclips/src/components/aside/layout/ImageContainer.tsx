// ImageContainer.tsx는 유저, 북마크리스트, 로드맵의 프로필 이미지를 출력하는 컴포넌트

interface ImageSrc {
  src: string;
  whatContent: string;
  id: number;
}

const ImageContainer: React.FC<ImageSrc> = ({ src, whatContent, id }) => {
  const imageSrc =
    whatContent === "프로필"
      ? src === "default" || src === null || src === undefined
        ? require(`../../../assets/images/noProfile${id % 6}.jpg`)
        : src
      : src === "default" || src === null || src === undefined
      ? require(`../../../assets/images/noContent${id % 6}.png`)
      : src;

  const containerClass =
    whatContent === "프로필"
      ? "w-24 h-24 md:w-32 md:h-32 rounded-full"
      : "w-24 h-24 md:w-32 md:h-32 rounded-xl";

  return (
    <div
      className={`${containerClass} border overflow-hidden bg-gray-200 mb-4`}
    >
      <img src={imageSrc} className="w-full h-full object-cover"></img>
    </div>
  );
};

export default ImageContainer;
