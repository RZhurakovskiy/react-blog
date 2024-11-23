import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Извините</h2>
            <p>Данная страница не найдена</p>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
}

export default NotFound;