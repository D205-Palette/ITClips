import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup을 사용하여 입력값 유효성 검사
import { navStore } from "../../../stores/navStore";
import PasswordResetCompleteModal from "./PasswordResetCompleteModal";
import {
  sendVerificationPassword,
  checkCodePassword,
} from "../../../api/authApi"; // 인증번호 전송 및 검증 API 함수

const PasswordResetModal: React.FC = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false); // 이메일 발송 여부를 추적하는 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 오류 메시지를 저장하는 상태
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] =
    useState<boolean>(false); // 비밀번호 재설정 성공 여부 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리

  // navStore를 사용하여 이메일 로그인 모달과 비밀번호 재설정 모달의 상태 관리
  const { setEmailLoginOpen, setPasswordResetOpen } = navStore();

  // Formik을 사용하여 이메일 폼 관리 및 유효성 검사 설정
  const emailFormik = useFormik({
    initialValues: { email: "" }, // 폼의 초기값 설정
    validationSchema: Yup.object({
      // Yup을 사용하여 이메일 필드에 대한 유효성 검사 설정
      email: Yup.string()
        .email("유효한 이메일 주소를 입력하세요.") // 이메일 형식 확인
        .required("이메일을 입력하세요."), // 필수 입력 항목
    }),
    onSubmit: async (values) => {
      // 폼 제출 시 처리할 로직
      setLoading(true); // 로딩 상태 설정
      setErrorMessage(""); // 에러 메시지 초기화

      try {
        await sendVerificationPassword(values.email); // 이메일 전송
        setIsEmailSent(true); // 이메일 발송 상태 업데이트
      } catch (error) {
        setErrorMessage("이메일 발송에 실패했습니다. 다시 시도해 주세요."); // 에러 발생 시 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    },
  });

  // Formik을 사용하여 인증번호 폼 관리 및 유효성 검사 설정
  const verificationFormik = useFormik({
    initialValues: { verificationCode: "" }, // 폼의 초기값 설정
    validationSchema: Yup.object({
      // Yup을 사용하여 인증번호 필드에 대한 유효성 검사 설정
      verificationCode: Yup.string().required("인증번호를 입력하세요."), // 필수 입력 항목
    }),
    onSubmit: async (values) => {
      // 폼 제출 시 처리할 로직
      setLoading(true); // 로딩 상태 설정
      setErrorMessage(""); // 에러 메시지 초기화

      try {
        await checkCodePassword(
          emailFormik.values.email,
          values.verificationCode
        );
        setIsPasswordResetSuccess(true); // 비밀번호 재설정 성공 상태 업데이트
      } catch (error) {
        setErrorMessage("인증번호 검증에 실패했습니다. 다시 시도해 주세요."); // 에러 발생 시 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    },
  });

  // 비밀번호 재설정 모달을 닫고 이메일 로그인 모달 열기
  const closePasswordResetModal = () => {
    setPasswordResetOpen(false); // 비밀번호 재설정 모달 닫기
    setEmailLoginOpen(true); // 이메일 로그인 모달 열기
  };

  // 입력 값 변경 시 에러 메시지 초기화
  const handleInputChange =
    (formikHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(""); // 에러 메시지 초기화
      formikHandleChange(e);
    };

  return (
    <div className="flex items-center justify-center bg-base-100">
      {!isPasswordResetSuccess && (<div className="text-center bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          비밀번호 찾기
        </h1>

        {/* 이메일 입력 폼 */}
        {!isEmailSent && (
          <form className="space-y-4 mb-4" onSubmit={emailFormik.handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  required
                  className="input input-bordered"
                  placeholder="이메일을 입력해주세요."
                  value={emailFormik.values.email}
                  onChange={handleInputChange(emailFormik.handleChange)} // 입력 값 변경 시 처리
                  onBlur={emailFormik.handleBlur} // 입력 필드에서 포커스 잃을 때 처리
                  name="email" // Formik이 인식할 수 있도록 name 속성 추가
                />
                {emailFormik.touched.email && emailFormik.errors.email ? (
                  <div className="text-red-500">{emailFormik.errors.email}</div>
                ) : null}{" "}
                {/* 이메일 입력 오류 메시지 표시 */}
              </div>
              <button
                type="submit"
                className="btn bg-sky-500 hover:bg-sky-700 text-slate-100 mt-4"
                disabled={loading}
              >
                {loading ? "발송중..." : "인증번호 발송"}
              </button>
            </div>
          </form>
        )}

        {/* 인증번호 입력 폼 */}
        {isEmailSent && (
          <form
            className="space-y-4"
            onSubmit={verificationFormik.handleSubmit}
          >
            <div className="form-control">
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="인증번호를 입력해주세요."
                value={verificationFormik.values.verificationCode}
                onChange={handleInputChange(verificationFormik.handleChange)} // 입력 값 변경 시 처리
                onBlur={verificationFormik.handleBlur} // 입력 필드에서 포커스 잃을 때 처리
                name="verificationCode" // Formik이 인식할 수 있도록 name 속성 추가
              />
              {verificationFormik.touched.verificationCode &&
              verificationFormik.errors.verificationCode ? (
                <div className="text-red-500">
                  {verificationFormik.errors.verificationCode}
                </div>
              ) : null}{" "}
              {/* 인증번호 입력 오류 메시지 표시 */}
            </div>

            <button
              type="submit"
              className="btn bg-sky-500 hover:bg-sky-700 text-slate-100 w-full"
              disabled={loading}
            >
              임시 비밀번호 발급 받기
            </button>
          </form>
        )}

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div
            className={`mt-4 ${
              errorMessage.includes("성공") ? "text-green-500" : "text-red-500"
            }`}
          >
            {errorMessage}
          </div>
        )}

        <button className="btn btn-ghost" onClick={closePasswordResetModal}>
          뒤로가기
        </button>
      </div>)}
      {/* 비밀번호 재설정 성공 시 모달 표시 */}
      {isPasswordResetSuccess && <PasswordResetCompleteModal />}
    </div>
  );
};

export default PasswordResetModal;
