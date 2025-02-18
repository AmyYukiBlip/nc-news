import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import CommentCard from "./CommentCard";
import FormatDate from "./FormatDate";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ncNewsApi.get(`/articles/${article_id}`).then((res) => {
      setArticle(res.data.articles);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <section className="articeContainer">
        <article className="article">

          <div className="img-box">
            <img className="articleImg" src={article.article_img_url} />
            <p>
              {article.votes } 👏🏼 | {article.comment_count} 🗩
            </p>
          </div>

          <div className="art-body">
            <h2>{article.title}</h2>
            <p>
              {FormatDate(article.created_at)}
            </p>
            <p>{article.body}</p>
            <p className="author">
                Written by {article.author} for {article.topic}
            </p>
          </div>

        </article>
        <CommentCard />
      </section>
      
      <Link className="red-button" to={`/articles/`}>
        Back to All
      </Link>
    </>
  );
}
