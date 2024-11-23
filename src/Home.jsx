import { useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const { data, isLoading, error } = useFetch(
    "https://rzhurakovskiy-react-blog.vercel.app/api/posts",
    updateFlag
  );

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <h3 className="download-data-message">Загрузка...</h3>}

      {data && data.length === 0 && <h3 className="nodata-message">Список постов пуст.</h3>}

      {data && data.length > 0 && (
        <BlogList
          updateFlag={updateFlag}
          setUpdateFlag={setUpdateFlag}
          posts={data}
        />
      )}
    </div>
  );
};

export default Home;
