import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function AllArticlesCopy() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const filterQuery = searchParams.get("topic");
  const orderQuery = searchParams.get("order");
  const sortByQuery = searchParams.get("sort_by");

  useEffect(() => {
    setIsLoading(true);
    ncNewsApi
      .get("/articles", {
        params: { topic: filterQuery, sort_by: sortByQuery, order: orderQuery },
      })
      .then((res) => {
        setIsLoading(false);
        setArticles(res.data.articles);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setError(true);
      });
  }, [filterQuery, sortByQuery, orderQuery]);

  // Update Search Params
  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    // removes topic= from url
    if (key === "topic" && value === "all") {
      newParams.delete("topic");
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  if (isLoading) return <p>Fetching articles...</p>;

  if (error) return <p>404 Not Found</p>;

  return (
    <>
      <h1>Northcoders News</h1>
      <h2 className="h2-page-titles">
        Grab a cuppa, and read more news below...
      </h2>
      <div >
        <form className="filterform" >
          <div>
            {/* filter drop down */}
            <span className="filterlabel">Choose topic:</span>
            <select className="filterselect"
              value={filterQuery}
              onChange={(e) => updateParams("topic", e.target.value)}
            >
              <option value="all">All</option>
              <option value="football">Football</option>
              <option value="coding">Coding</option>
              <option value="cooking">Cooking</option>
            </select>
            <select className="filterselect"
              value={orderQuery}
              onChange={(e) => updateParams("order", e.target.value)}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          {/* sort drop down */}
          <div>
            <span className="filterlabel">or sort by:</span>
            <select className="filterselect"
              value={sortByQuery}
              onChange={(e) => updateParams("sort_by", e.target.value)}
            >
               <option value="">None</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Comments</option>
            </select>
            <select className="filterselect"
              value={orderQuery}
              onChange={(e) => updateParams("order", e.target.value)}
            >
              <option value="desc">Most</option>
              <option value="asc">Least</option>
            </select>
          </div>
          <button className="filterclear"
          onClick={(e) => {
            e.preventDefault()
            setSearchParams(new URLSearchParams())
          }}
          >Clear Filters</button>
        </form>
      </div>
      <section className="article-card-row">
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
