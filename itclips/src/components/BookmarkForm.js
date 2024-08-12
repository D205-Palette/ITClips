import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookmarkForm = ({ onAddBookmark, loading }) => {
  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().url('유효한 URL을 입력하세요.').required('URL을 입력하세요.'),
    }),
    onSubmit: (values) => {
      onAddBookmark(values.url);
    },
  });

  return (
    <div className="bookmark-form">
      <h2>북마크 추가</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="URL을 입력해주세요."
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.url && formik.errors.url ? (
          <div className="error">{formik.errors.url}</div>
        ) : null}

        <button type="submit" disabled={loading}>
          {loading ? '추가 중...' : '추가'}
        </button>
      </form>
    </div>
  );
};

export default BookmarkForm;
