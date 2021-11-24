import { useState, useEffect } from "react";
import { Link, useParams, useHistory, withRouter } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL";

<<<<<<< HEAD
const API = apiURL();
function BookmarkDetails(props) {
  const { deleteBookmark } = props;
=======
function BookmarkDetails() {
>>>>>>> bc83ae183e7b306187133b9262701fc2ed98d600
  const [bookmark, setBookmark] = useState([]);
  let { index } = useParams();

  useEffect(() => {
    axios.get(`${API}/bookmarks/${index}`).then(
      (response) => {
        setBookmark(response.data);
      },
      (error) => {
        history.push(`/not-found`);
      }
    );
  }, [index, history]);
  const handleDelete = () => {};
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

export default withRouter(BookmarkDetails);
