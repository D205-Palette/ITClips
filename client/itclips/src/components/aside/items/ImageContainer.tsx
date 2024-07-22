interface ImageSrc {
  src: string;
}

const ImageContainer = () => {

  // 더미 데이터
  const image: ImageSrc = {
    src: "profile_image.png"
  }

  return (
    <div className="mb-4">
      <img src={require(`../../../assets/${image.src}`)} className="w-16 h-16 bg-gray-200 rounded-full mb-4"></img>
    </div>
  );
};

export default ImageContainer;