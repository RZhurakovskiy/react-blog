import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navBar">
      <h1 className='logo'>React блог</h1>
      <div className="links">
        <Link to="/">Главная</Link>
        <Link to="/create">Новый пост</Link>
      </div>
    </nav>
  );
};

export default Navbar;



