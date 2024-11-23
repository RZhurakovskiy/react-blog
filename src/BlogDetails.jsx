import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isLoading, error } = useFetch('https://rzhurakovskiy-react-blog.vercel.app/api/posts/' + id);
    const navigate = useNavigate();


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="blog-details">
            {isLoading && <div className="loading">Загрузка...</div>}
            {error && <div className="error">{error}</div>}

            {blog && (
                <article className="blog-article">
                    <h2 className="blog-title">{blog.title}</h2>
                    <div className="meta">
                        <p className="author">
                            Опубликовал: <span>{blog.author}</span>
                        </p>
                        <p className="timestamp">Создано: {formatDate(blog.timestamp)}</p> 
                    </div>
                    <div className="blog-body">{blog.body}</div>
                
                    <button onClick={() => navigate('/')} className="btn-back">
                        Вернуться на главную
                    </button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
