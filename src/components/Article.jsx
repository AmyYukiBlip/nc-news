import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import CommentCard from "./CommentCard";
import FormatDate from "../utils/FormatDate";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [currVote, setVote] = useState(0);
  const [post, setPost] = useState({
    username: "",
    body: "",
  });
  const [postMsg, setPostMsg] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setVote(res.data.articles[0].votes);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }

  // ** Post a comment to article **
  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    ncNewsApi
      .post(`/articles/${article_id}/comments`, post)
      .then((res) => {
        setError(null);
        setPostMsg(true);
      })
      .catch((err) => {
        setError(err);
      });
  }

  // ** Errors & Messages **
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oops, we have an error, please try again!</p>;
  if (postMsg)
    return (
      <>
        <p>Comment succesfully posted!</p>
        <Article />
      </>
    );


  return (
    <>
      <section className="articeContainer">
        <article className="article">
          <div className="img-box">
            <img className="articleImg" src={article.article_img_url} />
            <p>
              {error ? <p>{error}</p> : null}
              {currVote} 👏🏼 | {article.comment_count} 🗩
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
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What's your username?"
              name="username"
              onChange={handleInput}
              required
            />
            <input
              type="text"
              placeholder="What you saying?"
              name="body"
              onChange={handleInput}
              required
            />
            <button className="red-button">Add Comment</button>
          </form>
          <CommentCard />
        </section>
      </section>

      <Link className="red-button" to={`/articles/`}>
        Back to All
      </Link>
    </>
  );
}
