import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let { index } = useParams();
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/bookmarks/${index}`).then((response) => {
      setBookmark(response.data);
    });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${URL}/bookmarks/${index}`)
      .then(() => navigate("/bookmarks"));
  };

  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
