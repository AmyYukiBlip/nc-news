import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import ArticleCard from "./ArticleCard";
import NavBar from "./NavBar";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ncNewsApi
      .get("/articles")
      .then((res) => {
        setArticles(res.data.articles);
        console.log(res.data.articles, "< res");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "<< err");
        setIsLoading(fasle);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <h2>Grab a cuppa, and read more news below...</h2>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
      {/* mapped {article} object is being passed to ArticleCard */}
    </>
  );
}
