import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const [img, setImg] = useState(null);
  const [title, seTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [author, setAuthor] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (article) {
      setImg(article.article_img_url);
      seTitle(article.title);
      setTopic(article.topic);
      setAuthor(article.author);
      setVoteCount(article.votes);
      setCommentCount(article.comment_count);
    }
  }, []);

  return (
    <>
      <ul className="articeCardContainer">
        <li className="articleCard">
          <img className="articleCardImg" src={img} />
          <p>{topic}</p>
          <h2>{title}</h2>
          <p>Written by {author}</p>
          <p>
            {voteCount} 👏🏼 | {commentCount} 🗩{" "}
          </p>
          <Link
            className="articleCardLink"
            to={`/articles/${article.article_id}`}
          >
            Read More
          </Link>
        </li>
      </ul>
    </>
  );
}

// const [count, setCount] = useState(0)

//  <button onClick={() => setCount((count) => count + 1)}>
// count is {count}
// </button>
