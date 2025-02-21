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
  const [error, setError] = useState(false);

  //  ** Getting article info by ID **
  useEffect(() => {
    ncNewsApi.get(`/articles/${article_id}`).then((res) => {
      setArticle(res.data.articles);
      setIsLoading(false);
      setVote(res.data.articles.votes);
    }).catch((err) => {
      setIsLoading(false);
      setError(true)
    })
  }, [article_id]);

  //  ** Voting on article **
  function incrementCount(increment) {
    ncNewsApi
      .patch(`/articles/${article_id}`, { inc_votes: increment })
      .then((res) => {
        setVote(res.data.articles[0].votes);
      })
      .catch((err) => {
        setError(true);
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
        setPostMsg(true);
        alert("Comment succesfully posted!");
      })
      .catch((err) => {
        setError(true);
      });
  }

  // ** Errors & Messages **
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oops, we have an error, please try again!</p>;
  if (postMsg) return <Article />;

  return (
    <>
      <section className="articeContainer">
        <article className="article">
          <div className="img-box">
            <img className="articleImg" src={article.article_img_url} />
            <p>
              {error ? <p>{error}</p> : null}
              {article.comment_count} 💬
            </p>
          </div>

          <div className="art-body">
            <h2>{article.title}</h2>
            <p>{FormatDate(article.created_at)}</p>
            <p>{article.body}</p>
            <p className="author">
              Written by {article.author} for {article.topic}
            </p>
            <div className="vote-container">
              <button className="red-button" onClick={() => incrementCount(1)}>
                👍🏼
              </button>
              {currVote}
              <button className="red-button" onClick={() => incrementCount(-1)}>
                👎🏼
              </button>
            </div>
          </div>
        </article>

        <section className="comment-section">
          <h2>Join the convo!</h2>
          <p>Post your comment below...</p>
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
