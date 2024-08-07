// ReportModal.tsx 는 AsideBookmarkList.tsx 에서 더보기 메뉴의 '신고하기' 버튼을 눌렀을 때 출력되는 컴포넌트

import React, { useState } from "react";

// components
import ReportConfirmModal from "./ReportConfirmModal";
import ReportErrorModal from "./ReportErrorModal";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { authStore } from "../../../stores/authStore";
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatContent: string;
  id: number;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  whatContent,
  id,
}) => {
  const [reportType, setReportType] = useState<string>("");
  const [reportContent, setReportContent] = useState<string>("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
    const [isErrorModalOpen, setIsErrorModalOpen] =
    useState<boolean>(false);
    const [formCertified, setFormCertified] = useState(false)
    const { userId, token } = authStore();
  
  if (!isOpen) return null;

  const handleReport = () => {
    // 신고 처리 API
    if(reportType&&reportContent){
    if (whatContent === "북마크") {
      axios({
        method: "post",
        url: `${API_BASE_URL}/api/report/bookmark/${userId}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          category: reportType,
          reason: reportContent,
        },
      })
        .then(() => {
          setIsConfirmationModalOpen(true);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setIsErrorModalOpen(true)
          } 
          
        });
    } else {
      axios({
        method: "post",
        url: `${API_BASE_URL}/api/report/list/${userId}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          category: reportType,
          reason: reportContent,
        },
      })
        .then(() => {
          setIsConfirmationModalOpen(true);
        })
        .catch((err) => {
          console.log(err.response.status)
          if (err.response.status === 400) {
            setIsErrorModalOpen(true)
            
          } 
         
        });
    }} else{
      setFormCertified(true)
    }

    // 신고 처리 후 확인 모달
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
    onClose(); // 신고 모달 전부 닫기
  };
  const handleErrorClose = () => {
    setIsErrorModalOpen(false);
    onClose(); // 신고 모달 전부 닫기
  };

  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">신고하기</h3>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">신고내역</span>
            </label>
            <select
              className={(formCertified&&!reportType?"border-2 border-red-600": "") + " select select-bordered "}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option disabled value="">
                선택해주세요
              </option>
              <option value="AD">광고성 게시물</option>
              <option value="COPY_RIGHT">저작권 침해</option>
              <option value="ETC">기타</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">신고내용</span>
            </label>
            <textarea
              className={(formCertified&&!reportContent?"border-2 border-red-600": "") + " textarea textarea-bordered h-24 resize-none"}
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
            ></textarea>
          </div>
        <div className={formCertified?"my-2 text-red-600" : "hidden"}>
          <p>항목을 기입해주세요</p>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              취소
            </button>
            <button
              className="btn bg-sky-500 hover:bg-sky-700 text-slate-100"
              onClick={handleReport}
            >
              신고하기
            </button>
          </div>
        </div>
      </div>
      <ReportConfirmModal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationClose}
      />
      <ReportErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleErrorClose}
      />
    </>
  );
};

export default ReportModal;
