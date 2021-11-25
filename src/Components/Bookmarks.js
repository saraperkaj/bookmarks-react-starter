import { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import Bookmark from "./Bookmark";
const API = apiURL();
function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/bookmarks`)
      .then(
        (response) => {
          setBookmarks(response.data);
        },
        (error) => console.log("get", error)
      )
      .catch((c) => console.warn("catch", c));
  }, []);
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
