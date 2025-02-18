import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import NavBar from "./NavBar";

export default function Article() {
  const { article_id } = useParams();
  const [img, setImg] = useState(null);
  const [title, seTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (article_id) {
      ncNewsApi.get(`/articles/${article_id}`).then((res) => {
        console.log(res.data.articles, "<< Article Res");
        setImg(res.data.articles.article_img_url);
        seTitle(res.data.articles.title);
        setBody(res.data.articles.body);
        setTopic(res.data.articles.topic);
        setAuthor(res.data.articles.author);
        setDate(res.data.articles.created_at);
        setVoteCount(res.data.articles.votes);
        setCommentCount(res.data.articles.comment_count);
        setIsLoading(false)
      });
    }
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>
  
  return (
    <>
      <NavBar />
      <ul className="articeContainer">
        <li className="article">
          <div className="img-box">
            <img className="articleImg" src={img} />
            <p>
              {voteCount} 👏🏼  |  {commentCount} 🗩
            </p>
          </div>

          <div className="art-body">
            <h2>{title}</h2>
            <p>
              <strong>{date}</strong>
            </p>
            <p>{body}</p>
            <p>
              <strong>
                Written by {author} for {topic}
              </strong>
            </p>
          </div>
        </li>
      </ul>
      <Link className="red-button" to={`/articles/`}>
        Back to All
      </Link>
    </>
  );
}
