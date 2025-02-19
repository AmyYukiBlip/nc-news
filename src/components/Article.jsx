import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import CommentCard from "./CommentCard";
import FormatDate from "../utils/FormatDate";
// import incrementCount from "../utils/incrementCount";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [currVote, setVote] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

  //  ** Getting article info by ID **
  useEffect(() => {
    ncNewsApi.get(`/articles/${article_id}`).then((res) => {
      setArticle(res.data.articles);
      setIsLoading(false);
      setVote(res.data.articles.votes);
    });
  }, [article_id]);

  //  ** Voting on article **
  function incrementCount(increment) {
    ncNewsApi
      .patch(`/articles/${article_id}`, { inc_votes: increment })
      .then((res) => {
        setVote(res.data.articles[0].votes)
      })
      .catch((err) => {
        setError(true)
      })
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oops, we have an error</p>

  return (
    <>
      <section className="articeContainer">
        <article className="article">
          <div className="img-box">
            <img className="articleImg" src={article.article_img_url} />
            <p>
              {currVote} 👏🏼 |  {article.comment_count} 🗩
            </p>
          </div>

          <div className="art-body">
            <h2>{article.title}</h2>
            <p>{FormatDate(article.created_at)}</p>
            <p>{article.body}</p>
            <p className="author">
              Written by {article.author} for {article.topic}
            </p>
            <button className="red-button" onClick={() => incrementCount(1)}>
              + 👏🏼
            </button>
            <button className="red-button" onClick={() => incrementCount(-1)}>
              - 👏🏼
            </button>
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
