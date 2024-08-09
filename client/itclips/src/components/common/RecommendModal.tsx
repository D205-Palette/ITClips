import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { authStore } from "../../stores/authStore";

interface RecommendModalProps {
  recommendMessage: string | null;
  setRecommendMessage: (message: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const RecommendModal: React.FC<RecommendModalProps> = ({
  recommendMessage,
  setRecommendMessage,
  loading,
  setLoading,
}) => {
  const { userId, token } = authStore();

  // 키워드로 북마크리스트 추천
  const handleRecommend = async (keyWord: string) => {
    try {
      setRecommendMessage(null);
      setLoading(true);
      const recommendResponse = await axios.get(
        `${API_BASE_URL}/api/roadmap/recommend/step/${keyWord}`,
        {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // recommendResponse 처리 로직 추가
      setRecommendMessage(recommendResponse.data.summary);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="absolute bg-base-100 border rounded-xl p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const keywordInput = form.elements.namedItem(
            "keyword"
          ) as HTMLInputElement;
          const keyword = keywordInput.value;
          handleRecommend(keyword);
        }}
      >
        <input
          id="keyword"
          name="keyword"
          className="input w-full mb-4"
          type="text"
          placeholder="키워드를 입력하여 로드맵 생성 목록을 추천 받아보세요."
        />
        <button type="submit" className="btn btn-outline w-full">
          추천 받기
        </button>
      </form>
      <div>
        <p className="text-red-500 text-sm">
          ※ 참조할 데이터가 충분하지 않으면 추천 결과의 정확도가 떨어질 수
          있습니다.
        </p>
      </div>
      <div className="mt-5">
        <div className="flex justify-center">
          {loading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>
        {recommendMessage && (
          <div className="flex flex-col gap-y-1 text-lg">
            {recommendMessage === "관련 북마크리스트가 없습니다." ? (
              <p>{recommendMessage}</p>
            ) : (
              recommendMessage.split("->").map((item, index) => (
                <div key={index} className="text-left border rounded-md p-1">
                  {`${index + 1}. ${item.trim()}`}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendModal;
