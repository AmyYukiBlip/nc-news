import { Link } from "react-router-dom";


export default function TopicCard({ topic }) {
  return (
    <>
      <ul className="topicCardContainer">
        <li className="topicCard">
          <h3>{topic.slug}</h3>
          <p>{topic.description}</p>
          <Link
            className="topicCardLink"
            to={`/articles?topic=${topic.slug}`} 
          >
            Read More
          </Link>
        </li>
      </ul>
    </>
  );
}
