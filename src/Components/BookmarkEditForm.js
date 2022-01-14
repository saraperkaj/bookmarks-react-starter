import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";

function BookmarkEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${URL}/bookmarks/${index}`).then((response) => {
      console.log(response.data);
      setBookmark({
        name: response.data.name,
        url: response.data.url,
        category: response.data.category,
        description: response.data.description,
        isFavorite: response.data.isFavorite,
      });
    });
  }, []);

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    //updates our state
    axios
      .put(`${URL}/bookmarks/${index}`, bookmark)
      .then(() => navigate(`/bookmarks/${index}`));
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

export default BookmarkEditForm;
