import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { navStore } from "../../../stores/navStore";
import { authStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { emailLogin, checkUserInfo } from "../../../api/authApi";
import toastStore from "../../../stores/toastStore";

const EmailLoginModal: React.FC = () => {
  const navigate = useNavigate();
  const { setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen } =
    navStore();
  const {
    login,
    fetchUserInfo,
    fetchUserToken,
    fetchRefreshToken,
    fetchUserId,
  } = authStore();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { globalNotification, setGlobalNotification } = toastStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("유효한 이메일 주소를 입력하세요.")
        .required("이메일을 입력하세요."),
      password: Yup.string().required("비밀번호를 입력하세요."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await emailLogin(values.email, values.password);

        if (response.status === 200) {
          fetchUserToken(response.data.accessToken); // 로컬 스토리지에 액세스 토큰 업데이트
          fetchRefreshToken(response.data.refreshToken); // 로컬 스토리지에 리프레시 토큰 업데이트
          fetchUserId(response.data.userId); // 로컬 스토리지에 유저 아이디 업데이트
          const userInfoResponse = await checkUserInfo(
            response.data.userId,
            response.data.userId
          );
          fetchUserInfo(userInfoResponse.data); // 로컬 스토리지에 유저 정보 업데이트
          login(); // 로그인 상태 업데이트
          navigate(`/user/${response.data.userId}`); // 로그인 후 페이지 이동
          setGlobalNotification({
            message: `환영합니다 ${userInfoResponse.data.nickname}님!`,
            type: "success",
          });
        } else {
          throw new Error("로그인에 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
      } finally {
        setLoading(false);
      }
    },
  });

  // This function resets the error message when input values change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    formik.handleChange(e);
  };

  const closeEmailLoginModal = () => {
    setEmailLoginOpen(false);
    setLoginListOpen(true);
  };

  const openPasswordResetModal = () => {
    setPasswordResetOpen(true);
    setEmailLoginOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-100">
      <div className="border bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl text-center font-bold mb-4">이메일 로그인</h2>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="label">
            <span className="label-text">아이디</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            className="input input-bordered w-full mb-4"
            value={formik.values.email}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password" className="label">
            <span className="label-text">비밀번호</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            className="input input-bordered w-full mb-4"
            value={formik.values.password}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          {/* 로그인 실패 시 에러 메시지 표시 */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <button
            className="btn btn-info w-full mb-2 text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "로그인중..." : "이메일 로그인"}
          </button>
        </form>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
          <button className="btn bg-base-100" onClick={openPasswordResetModal}>
            비밀번호 찾기
          </button>

          <button
            className="btn bg-base-100"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-ghost mt-2" onClick={closeEmailLoginModal}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailLoginModal;
