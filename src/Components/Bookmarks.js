import { useState, useEffect } from "react";
import axios from "axios";
import Bookmark from "./Bookmark";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${URL}/bookmarks`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setBookmarks(response.data);
      })
      .catch((e) => console.log("catch", e));
  }, [URL]);

  if (!bookmarks) {
    return null;
  }

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
