import React, { useState } from "react";
import { Link } from "react-router-dom";
import deletePost from "./deletePost";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const BlogList = ({ posts, setUpdateFlag, updateFlag }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDelete = (postId) => {
    deletePost(postId);
    setUpdateFlag(!updateFlag);
    setSnackbarMessage("Пост успешно удален!");
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  };

  return (
    <div className="blog-container">
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-content-container">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-meta">
              Автор: {post.author} | создано:{" "}
              <span className="post-date">
                {post.timestamp ? formatDate(post.timestamp) : "Неизвестно"}
              </span>
            </p>
            <p className="post-body">
              {post.body && post.body.slice(0, 200)}...
            </p>
            {/* Кнопка "Читать далее..." */}
            <div className="read-more-container">
              <Link to={`/blogs/${post.id}`} className="read-more-link">
                Читать далее...
              </Link>
            </div>
          </div>
          <div className="post-image-container">
            <img
              src={
                post.image ||
                "https://via.placeholder.com/300x200?text=Изображение+отсутствует"
              }
              alt={post.title || "Заглушка изображения"}
              className="post-image"
            />
          </div>
          <div className="post-footer">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(post.id);
              }}
              className="btn-delete"
            >
              Удалить
            </button>
          </div>
        </div>
      ))}

      {snackbarVisible && <div className="snackbar">{snackbarMessage}</div>}
    </div>
  );
};

export default BlogList;
