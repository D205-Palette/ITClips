import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookmarkForm = ({ onAddBookmark, loading }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().url('유효한 URL을 입력하세요.').required('URL을 입력하세요.'),
    }),
    onSubmit: (values, { resetForm }) => {
      onAddBookmark(values.url);
      setSuccessMessage('북마크를 추가하였습니다.');
      resetForm(); // 입력 필드를 초기화합니다.
      setTimeout(() => setSuccessMessage(''), 3000); // 3초 후 성공 메시지 제거
    },
  });

  return (
    <div className="bookmark-form">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="url" className="font-bold">URL</label>
        <hr />
        <input
          type="text"
          id="url"
          name="url"
          placeholder="URL을 입력해주세요."
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {formik.touched.url && formik.errors.url ? (
          <div className="error text-red-500 text-xs">{formik.errors.url}</div>
        ) : null}

        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-md mt-2"
          disabled={loading}
        >
          {loading ? '추가 중...' : '추가'}
        </button>
      </form>

      {/* 성공 메시지 */}
      {successMessage && (
        <div className="text-green-500 text-sm mt-2">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default BookmarkForm;
