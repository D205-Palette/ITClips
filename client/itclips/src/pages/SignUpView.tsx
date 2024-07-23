import React from "react";
import ageImg from "../assets/images/signup/age.png";
import idImg from "../assets/images/signup/Id.svg";
import passwordImg from "../assets/images/signup/password.png";
import mailImg from "../assets/images/signup/mail.svg";
import maleImg from "../assets/images/signup/male.svg";
import femaleImg from "../assets/images/signup/female.svg";
import genderImg from "../assets/images/signup/gender.png";
import nickNameImg from "../assets/images/signup/nickName.png";
import jobImg from "../assets/images/signup/job.png";

import { FaTransgender  } from 'react-icons/fa';

// 공통 입력 필드 컴포넌트
interface InputFieldProps {
  placeholder: string;
  iconSrc?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  iconSrc,
  type = "text",
}) => (
  <div className="relative flex items-center gap-2.5 w-full max-w-md sm:max-w-lg md:max-w-xl h-12 px-4 py-3 bg-base-100 border border-gray-300 rounded-lg">
    {iconSrc && <img src={iconSrc} alt="icon" className="w-12 h-12" />}
    <input
      type={type}
      placeholder={placeholder}
      className="flex-1 bg-transparent text-gray-900 text-lg outline-none"
    />
  </div>
);

// 공통 버튼 컴포넌트
interface ButtonProps {
  text: string;
  className: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  type = "button",
}) => (
  <button
    type={type}
    className={`flex justify-center items-center gap-2.5 p-2.5 rounded-lg ${className}`}
  >
    <span className="text-center text-sm">{text}</span>
  </button>
);

const SignUpView: React.FC = () => {
  return (
    <div>
      <div className="justify-center items-center min-h-screen bg-base-100 rounded-lg shadow-lg p-4">
        <div className="text-center text-3xl font-bold">
          회원가입
        </div>

        <div className="flex justify-center">
          <form className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-6 space-y-6">
            <div className="flex items-center gap-4">
              <img className="w-12 h-12" src={idImg} alt="icon" />
              <InputField placeholder="아이디를 입력해주세요." />
              <div className="absolute top-6 right-6">
                <Button
                  text="중복 확인"
                  className="w-24 h-10 text-[#4498fa] border border-[#4498fa]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img className="w-12 h-12" src={passwordImg} alt="icon" />
              <InputField
                placeholder="비밀번호를 입력해주세요."
                type="password"
              />
              <InputField
                placeholder="비밀번호를 한번 더 입력해주세요."
                type="password"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <img src={mailImg} alt="" />
                <InputField placeholder="이메일을 입력해주세요." />
                <Button
                  text="인증번호 받기"
                  className="p-2.5 bg-[#4498fa] text-[#f2f6fb]"
                />
              </div>
              <div className="flex gap-3 items-center">
                <InputField placeholder="인증번호를 입력해주세요." />
                <Button
                  text="인증 확인"
                  className="w-24 h-10 text-[#4498fa] border border-[#4498fa]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img className="w-12 h-12" src={nickNameImg} alt="icon" />
              <InputField placeholder="닉네임을 입력해주세요." />
            </div>
            <div className="flex items-center gap-4">
              <img className="w-12 h-12" src={ageImg} alt="age" />
              <InputField placeholder="생년월일을 입력해주세요." />
            </div>
            <div className="flex items-center gap-4">
              <img className="w-12 h-12" src={jobImg} alt="icon" />
              <InputField placeholder="직업을 입력해주세요." />
            </div>

            <div className="flex gap-4">
              {/* <img className="w-12 h-12" src={genderImg} alt="icon" /> */}
              <FaTransgender className="w-12 h-12"/>
              <button className="flex items-center justify-center w-full max-w-xs h-12 bg-base-100 border border-gray-300 rounded-lg">
                <img className="w-6 h-6" src={maleImg} alt="" />
              </button>
              <button className="flex items-center justify-center w-full max-w-xs h-12 bg-base-100 border border-gray-300 rounded-lg">
                <img className="w-6 h-6" src={femaleImg} alt="" />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <Button
                text="가입 하기"
                className="btn w-full max-w-xs "
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
