import { Link } from "react-router-dom";
import FormatDate from "../utils/FormatDate";

export default function ArticleCard({ article }) {
  // {article} comes from AllArticles map from api fetch
  return (
    <>
      <ul className="articeCardContainer">
        <li className="articleCard">
          <img className="articleCardImg" src={article.article_img_url} />
          <p>{article.topic}</p>
          <h2>{article.title}</h2>
          <p>Written by {article.author} on {FormatDate(article.created_at)}</p>
          <p>{article.votes} 👍 | {article.comment_count} 💬</p> 
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
