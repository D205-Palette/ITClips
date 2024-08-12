/* global chrome */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL;

const Login = ({ onLoginSuccess }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력하세요.'),
            password: Yup.string().required('비밀번호를 입력하세요.'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMessage('');

            try {
                const response = await emailLogin(values.email, values.password);
                console.log(response);

                const accessToken = response.accessToken;
                const userId = response.userId;

                // Chrome storage에 유저 정보 저장
                chrome.storage.sync.set({ accessToken, userId }, () => {
                    onLoginSuccess(userId); // 성공적으로 로그인했을 때 콜백 호출
                });
                  
            } catch (error) {
                console.error(error);
                setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
            } finally {
                setLoading(false);
            }
        },
    });

    const handleInputChange = (e) => {
        setErrorMessage('');
        formik.handleChange(e);
    };

    return (
        <div className="login-modal">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email  </label>
                <br/>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력해주세요."
                    value={formik.values.email}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                />
                <br/>
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}

                <br/>
                <label htmlFor="password">PW  </label>
                <br/>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={formik.values.password}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}

                {errorMessage && (
                    <p className="error">{errorMessage}</p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? '로그인중...' : '로그인'}
                </button>
            </form>
        </div>
    );
};

// 로그인 API 호출 함수
export const emailLogin = (email, password) => {
    return fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: 'cors'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        });
};

export default Login;
