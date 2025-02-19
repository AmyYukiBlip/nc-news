import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ncNewsApi } from "../api";
import FormatDate from "../utils/FormatDate";

export default function CommentCard() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [currLikes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  // __ don't need to split out - comments gets all info!__

  useEffect(() => {
    ncNewsApi
      .get(`/articles/${article_id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, [article_id]);

  //  ** Voting on comment **
  function handleClickUp(){
    setLikes(currLikes + 1) 
  }
  function handleClickDown(){
    setLikes(currLikes - 1)
  }

  if (isLoading) return <p className="loading">Waiting for comments...</p>;

  if (comments.length === 0) {
    return <p>Oh dear, this article has no comments yet!</p>;
  }

  return (
    <>
      <div className="comment-container">
        <h2>Comments</h2>
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li key={index}>
              <p>"{comment.body}"</p>
              <p className="comment-author">
                Posted by {comment.author} on {FormatDate(comment.created_at)}
              </p>
              <span className="thumb-container">
                  <button
                    className="thumb-button"
                    onClick={handleClickUp}
                  >
                    👍🏼 {currLikes}
                  </button>
                  <button
                    className="thumb-button"
                    onClick={handleClickDown}
                  >
                    👎🏼
                  </button>
                </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
