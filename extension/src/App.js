/* global chrome */
import React, { useState, useEffect } from "react";
import BookmarkList from "./components/BookmarkList";
import BookmarkForm from "./components/BookmarkForm";
import Login from "./components/Login";
import BookmarkSelector from "./components/BookmarkSelector";
import GlobalStyle from "./globalStyles";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [bookmarkLists, setBookmarkLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Chrome storage에서 사용자 ID와 액세스 토큰을 가져옴
    const fetchUserIdFromStorage = () => {
      if (chrome?.storage) {
        chrome.storage.sync.get(["userId", "accessToken"], (result) => {
          if (result.userId && result.accessToken) {
            setUserId(result.userId);
          }
        });
      }
    };

    fetchUserIdFromStorage();
  }, []);

  useEffect(() => {
    const fetchBookmarkLists = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/list/personal/${userId}?viewerId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setBookmarkLists(data);
        } else {
          console.error("Failed to fetch bookmark lists");
        }
      } catch (error) {
        console.error("Error fetching bookmark lists:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookmarkLists();
    }
  }, [userId]);

  const addBookmark = async (url) => {
    if (selectedListId && userId) {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/bookmark/add/${selectedListId}?userId=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: url,
              title: "",
              content: "",
            }),
          }
        );

        if (response.ok) {
          const newBookmark = await response.json();
          setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
        } else {
          console.error("Failed to add bookmark", await response.text());
        }
      } catch (error) {
        console.error("Error adding bookmark:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoginSuccess = (loggedInUserId) => {
    setUserId(loggedInUserId);
  };
  const handleSelectList = (listId) => {
    setSelectedListId(listId);
    console.log("Selected list ID:", listId);
  };

  return (
    <>
      <GlobalStyle />
      <div className="App rounded-lg justify-center text-center">
        <div className="font-bold">
          <h3>
            <span className="text-sky-500">IT</span> Clips
          </h3>
        </div>
        {userId ? (
          <div className="flex flex-col gap-y-3">
            {bookmarkLists.length > 0 ? (
              <BookmarkSelector
                lists={bookmarkLists}
                onSelectList={handleSelectList}
                loading={loading}
              />
            ) : (
              <p>등록된 북마크가 없습니다.</p>
            )}


            {selectedListId && (
              <>
                <BookmarkForm onAddBookmark={addBookmark} loading={loading} />
                <BookmarkList bookmarks={bookmarks} />
              </>
            )}
          </div>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
