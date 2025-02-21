import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ncNewsApi } from "../api";
import FormatDate from "../utils/FormatDate";
// import { UserAccount } from "../context/UserAccount";

export default function CommentCard() {
  // const loggedInUser = useContext(UserAccount);
  // const [loggedInUser, setLoggedInUser] = useState("");
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [currLikes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  // __ don't need to split out - comments gets all info!__

  useEffect(() => {
    ncNewsApi
      .get(`/articles/${article_id}/comments`)
      .then((res) => {
        setIsLoading(false);
        setComments(res.data.comments);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  }, [article_id]);

  //  ** Delete a comment from an article **
  function deleteComment(comment_id, loggedInUser) {
    // if (loggedInUser === comments.author) {
    ncNewsApi
      .delete(`/comments/${comment_id}`)
      .then((res) => {
        alert("Comment has been deleted");
        setDeleteMsg(true);
      })
      .catch((err) => {
        setError(true);
      });
    // }
  }

  //  ** Voting on comment **
  function handleClickUp() {
    setLikes(currLikes + 1);
  }
  function handleClickDown() {
    setLikes(currLikes - 1);
  }

  if (isLoading) return <p className="loading">Waiting for comments...</p>;

  if (comments.length === 0) {
    return (
      <p>Oh dear, this article has no comments yet! Add yours above 😎 </p>
    );
  }

  if (deleteMsg) return <CommentCard />;

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
                <button className="thumb-button" onClick={handleClickUp}>
                  👍🏼 {currLikes}
                </button>
                <button className="thumb-button" onClick={handleClickDown}>
                  👎🏼
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteComment(comment.comment_id)}
                >
                  ⤬
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
