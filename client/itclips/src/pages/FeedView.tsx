import React, { useEffect } from "react";
import { useFeedStore } from "../stores/feedStore";
import axios from "axios";

import { asideStore } from "../stores/asideStore";
import MessageLayout from "../components/aside/MessageLayout";
import ListItem from "../components/main/ListsItem(List)";
import Roadmap from "../components/main/Roadmap";
import AsideProfile from "../components/aside/AsideProfile";

export default function FeedView() {
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const { user, feedPosts, setFeedPosts } = useFeedStore();

  // 나의 팔로우, 팔로잉 유저가 쓴 새 북마크리스트
  const FeedBookMarkLists = [];
  // 나의 팔로우, 팔로잉 유저가 쓴 새 로드맵
  const FeedRoadmaps = [];

  const fetchFeedPosts = (userId: string) => {
    return axios
      .get(`/${userId}/feed`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching feed posts:", error);
        throw error;
      });
  };

  useEffect(() => {
    if (user) {
      fetchFeedPosts(user.id)
        .then((posts) => setFeedPosts(posts))
        .catch((error) => {
          console.error("Failed to load feed posts:", error);
        });
    }
  }, [user, setFeedPosts]);

  // if (!user) {
  //   return <div>Please log in to see your feed.</div>;
  // }

  return (
    <>
      <div id="Body" className="grid grid-cols-8 gap-4">
        <div className="feed-page">          
          <div className="feed-posts">
            {feedPosts.map((post) => (
              <div key={post.id} className="feed-post">
                <p>{post.content}</p>
                <small>
                  By {post.author.username} on{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>

        <div id="aside" className="col-start-2 col-span-2 hidden xl:block ">
          {/* aside 자리 */}
          <AsideProfile />
          {/* 여기에 프로필이나 메세지일때 넣기 */}
          <div id="aside" className="absolute col-start-2 col-span-2">
            {isMessageOpen && <MessageLayout />}
          </div>
        </div>

        {/* main자리 */}
        <div
          id="Main"
          className="lg:col-start-4 lg:col-span-4 md:col-start-3 md:col-span-5 sm:col-start-2 sm:col-span-6"
        >
          {/* <h1>NEW 북마크리스트</h1>
          <ListItem />
          <h1>NEW 로드맵</h1>
          <Roadmap /> */}
        </div>
      </div>
    </>
  );
}
