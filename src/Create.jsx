import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const clearForm = () => {
    setTitle("");
    setBody("");
    setAuthor("");
    clearImage();
  };


  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const validateForm = () => {
    if (!title.trim() || !body.trim() || !author.trim()) {
      showNotification("Пожалуйста, заполните все поля!", "error");
      return false;
    }
    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showNotification("Пожалуйста, загрузите только изображения!", "error");
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    document.getElementById("file-upload").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const post = {
      title,
      body,
      author,
      image,
      timestamp: new Date().toISOString(),
    };

    setIsPending(true);

    setTimeout(() => {
      fetch("https://rzhurakovskiy-react-blog.vercel.app/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
          }
          showNotification("Пост успешно добавлен!", "success");
          setIsPending(false);
          clearForm();
          setTimeout(() => navigate("/"), 2000);
        })
        .catch((err) => {
          showNotification(
            err.message || "Произошла ошибка на сервере!",
            "error"
          );
          setIsPending(false);
        });
    }, 500);
  };

  return (
    <div className="create">
      <h2>Добавьте новый пост!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Заголовок поста:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок поста"
          />
        </div>

        <div className="form-group">
          <label>Текст поста:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Напишите текст поста"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Автор:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ваше имя"
          />
        </div>

        <div className="form-group custom-file-input">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="file-upload">
            {image ? "Изображение выбрано" : "Загрузить изображение"}
          </label>
        </div>

        {/* Превью изображения */}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Предпросмотр" />
            <button type="button" onClick={clearImage} className="btn-clear">
              Удалить изображение
            </button>
          </div>
        )}

        {/* Кнопка добавления поста */}
        <div className="form-actions">
          {!isPending && <button className="btn-primary">Создать пост</button>}
          {isPending && <button disabled>Добавление поста...</button>}
        </div>
      </form>

      {/* Snackbar для уведомлений */}
      {notification && (
        <div className={`snackbar ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Create;
