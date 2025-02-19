import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import ArticleCard from "./ArticleCard";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ncNewsApi
      .get("/articles")
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="h2-page-titles">Grab a cuppa, and read more news below...</h2>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
      {/* ^^ mapped {article} object is being passed to ArticleCard */}
    </>
  );
}
