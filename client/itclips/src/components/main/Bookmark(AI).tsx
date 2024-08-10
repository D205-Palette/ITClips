import darkModeStore from "../../stores/darkModeStore";
import { useState,useEffect } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { RiRobot3Line } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { authStore } from "../../stores/authStore";

interface Props {
  bookmarkId: number;
  setIsAIOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AIContent: React.FC<Props> = ({ bookmarkId, setIsAIOpen }) => {
    const {userId, token} = authStore()

    useEffect(() => {
        async function fetchData() {
          axios({
            method: "get",
            url: `${API_BASE_URL}/api/bookmark/summary/${bookmarkId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            })
              .then((res) => {
                const answerList = res.data.summary.split('\n')
                setAIAnswer(answerList)
            })
            .catch((err) => {
              console.error(err);
            });
        }
        fetchData();
      }, []);


  const [AIAnswer, setAIAnswer] = useState<string[]>(["Loading..."]);

  const isDark = darkModeStore((state) => state.isDark);


  return (
    <>
      {/* main자리 */}
      <div className="flex flex-row justify-between mb-2">
        <RiRobot3Line size={24} />
        <div
          onClick={() => setIsAIOpen(false)}
          className="hover:cursor-pointer"
        >
          <IoIosArrowUp size={24} />
        </div>
      </div>
      {AIAnswer.map((answer) => <p>{answer}</p>)}
    </>
  );
};

export default AIContent;
