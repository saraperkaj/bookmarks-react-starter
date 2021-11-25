import { useState, useEffect } from "react";
import { useParams, Link, useHistory, withRouter } from "react-router-dom";
import axios from "axios";

import { apiURL } from "../util/apiURL";

const API = apiURL();

function BookmarkEditForm(props) {
  let { index } = useParams();
  let history = useHistory();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  useEffect(() => {
    axios.get(`${API}/bookmarks/${index}`).then(
      (response) =>
        setBookmark(() => {
          return response.data;
        }),
      (error) => history.push(`/not-found`)
    );
  }, [index, history]);

  const updateBookmark = (updatedBookmark, index) => {
    axios
      .put(`${API}/bookmarks/${index}`, updatedBookmark)
      .then(
        (response) => {
          setBookmark(response.data);
          history.push(`/bookmarks/${index}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateBookmark(bookmark, index);
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default withRouter(BookmarkEditForm);
