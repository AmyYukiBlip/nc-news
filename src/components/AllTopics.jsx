import { useState, useEffect } from "react";
import { ncNewsApi } from "../api";
import TopicCard from "./TopicCard";

// This card is for the homepage, it is just showing the topic cards
// use axious to get array of topics and hold in state for other components

export default function AllTopics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    ncNewsApi
      .get("/topics")
      .then((res) => {
        setIsLoading(false);
        setTopics(res.data.topics);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(error)
      });
  }, []);
 
  

  if (isLoading) return <p>Waiting for topics...</p>;

  if (error) return <p>We're having trouble accessing topics, try again</p>

  return (
    <>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </>
  );
}
