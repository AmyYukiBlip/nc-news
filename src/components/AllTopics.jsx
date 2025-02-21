import { useState, useEffect } from "react";
import { ncNewsApi } from "../api";
import TopicCard from "./TopicCard";

// This card is for the homepage, it is just showing the topic cards
// use axious to get array of topics and hold in state for other components

export default function AllTopics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ncNewsApi
      .get("/topics")
      .then((res) => {
        setTopics(res.data.topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
 
  

  if (isLoading) return <p>Waiting for topics...</p>;

  return (
    <>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </>
  );
}
