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
  const [accessToken, setAccessToken] = useState(null);
  const [bookmarkLists, setBookmarkLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_SERVER_URL;

  const fetchBookmarkLists = async (userId, accessToken) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/list/personal/${userId}?viewerId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
          },
        }
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

  useEffect(() => {
    const fetchUserIdFromStorage = () => {
      if (chrome?.storage) {
        chrome.storage.sync.get(["userId", "accessToken"], (result) => {
          if (result.userId && result.accessToken) {
            setUserId(result.userId);
            setAccessToken(result.accessToken);
            // userId와 accessToken이 있으면 바로 북마크 리스트를 가져옴
            fetchBookmarkLists(result.userId, result.accessToken);
          }
        });
      }
    };

    fetchUserIdFromStorage();
  }, []);

  const addBookmark = async (url) => {
    if (selectedListId && userId && accessToken) {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/bookmark/add/${selectedListId}?userId=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
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

    // 로그인 성공 후 accessToken을 chrome storage에서 가져옴
    chrome.storage.sync.get(["accessToken"], (result) => {
      if (result.accessToken) {
        setAccessToken(result.accessToken);
        // userId와 accessToken이 설정된 후에 북마크 리스트를 가져옴
        fetchBookmarkLists(loggedInUserId, result.accessToken);
      }
    });
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
