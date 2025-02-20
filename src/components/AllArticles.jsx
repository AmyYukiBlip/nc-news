import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterQuery = searchParams.get("topic");

  const setFilter = (filter) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", filter);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    ncNewsApi
      .get("/articles", { params: { topic: filterQuery } })
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [filterQuery]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Northcoders News</h1>
      <h2 className="h2-page-titles">
        Grab a cuppa, and read more news below...
      </h2>
      <p>View all or filter by topic 👇 </p>
      <button className="red-button" onClick={() => setFilter("")}>
        All
      </button>
      <button className="red-button" onClick={() => setFilter("football")}>
        Football
      </button>
      <button className="red-button" onClick={() => setFilter("coding")}>
        Coding
      </button>
      <button className="red-button" onClick={() => setFilter("cooking")}>
        Cooking
      </button>
      <section className="article-card-row" >
        <div className="article-card-column">
          {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
        {/* ^^ mapped {article} object is being passed to ArticleCard */}
        </div>
      </section>
    </>
  );
}
