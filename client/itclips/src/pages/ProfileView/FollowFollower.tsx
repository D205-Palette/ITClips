import SearchBar from "../../components/main/MainSearchBar";
import MainTab from "../../components/main/MainTab";
import FollowerList from '../../components/follow/FollowerList'
const Follower = () => {       
  return (
    <>
    {/* {users.map((user) =><FollowItem user={user} isFollower={true} /> )} */}
    
      <FollowerList />
    </>
  );
};

export default Follower;
