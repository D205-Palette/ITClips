import './App.css';
import AsideProfile from "./components/AsideProfile"
// import AsideBookmarkList from "./components/AsideBookmarkList"

const comments = [
  { id: 1, text: "좋아요1~"},
  { id: 2, text: "좋아요2~"},
  { id: 3, text: "좋아요3~"},
  { id: 4, text: "좋아요4~"},
  { id: 5, text: "좋아요5~"},
]

function App() {
  return (
    <div className="App">
      <AsideProfile 
        username="고양양"
        email="@gogoingcat"
        description="안녕하세요 고양양입니다. 재미있는 IT정보를 클립할거에여~"
        followers={16}
        following={365}
        listCount={12}
        bookmarkCount={3} />
      
      {/* <AsideBookmarkList 
        listName="생성된 리스트 01"
        username="gogoingcat"
        description="MY FIRST LIST"
        likeCount={3}
        starCount={2}
        comments={comments} /> */}
    </div>
  );
}

export default App;
