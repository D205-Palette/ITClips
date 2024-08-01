import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import FollowerList from '../../components/follow/FollowerList'
import FollowItem from '../../components/follow/FollowItem'

const users = [
    {
        pk: 1,
        image: "/profile_image.png",
        tags:[
            "관심사 1",
            "관심사 2"
        ],
        name: "고양친구",
      },
      {
        pk: 2,
        image: "/profile_image.png",
        tags:[
            "관심사 1",
            "관심사 2"
        ],
        name: "고양친친구",
      },
      {
        pk: 3,
        image: "/profile_image.png",
        tags:[
            "관심사 1",
            "관심사 2"
        ],
        name: "고양고양친구",
      },
]

const Follower = () => {       
  return (
    <>
    {/* {users.map((user) =><FollowItem user={user} isFollower={true} /> )} */}
    
      <FollowerList />
    </>
  );
};

export default Follower;
