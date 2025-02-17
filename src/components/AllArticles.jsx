import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import ArticleCard from "./ArticleCard";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    ncNewsApi
      .get("/articles")
      .then((res) => {
        setArticles(res.data.articles);
        console.log(res.data.articles, "< res");
      })
      .catch((err) => {
        console.log(err, "<< err");
      });
  }, []);

  return (
    <>
      <h2>Grab a cuppa, and read more news below...</h2>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
}
