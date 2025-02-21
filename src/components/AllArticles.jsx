import { useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterQuery = searchParams.get("topic");
  const orderQuery = searchParams.get("order");
  const sortByQuery = searchParams.get("sort_by");

  const allButton = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("topic");
    newParams.delete("order");
    newParams.delete("sort_by");
    setSearchParams(newParams)
  };

  // ** Filter topics **
  const setFilter = (filter) => {
    const newParams = new URLSearchParams(searchParams);
    if (filter) {
      newParams.set("topic", filter);
      setSearchParams(newParams);
    }
  };

  //  ** Sort articles by order **
  const setSortOrder = (direction) => {
    const newOrderParams = new URLSearchParams(searchParams);
    if (direction) {
      newOrderParams.set("order", direction);
      setSearchParams(newOrderParams);
    }
  };

  //  ** Sort articles by greenlisted sort queries **
  const setSortBy = (sort) => {
    const newSortParams = new URLSearchParams(searchParams);
    if (sort) {
      newSortParams.set("sort_by", sort);
      setSearchParams(newSortParams);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    ncNewsApi
      .get("/articles", {
        params: { topic: filterQuery, sort_by: sortByQuery, order: orderQuery },
      })
      .then((res) => {
        setArticles(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [filterQuery, sortByQuery, orderQuery]);

  if (isLoading) return <p>Fetching articles...</p>;

  return (
    <>
      <h1>Northcoders News</h1>
      <h2 className="h2-page-titles">
        Grab a cuppa, and read more news below...
      </h2>
      <p>View all or filter by topic 👇 </p>
      <button className="red-button" onClick={() => allButton()}>
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
      <button className="pale-red-button" onClick={() => setSortOrder("desc")}>
        Newest
      </button>
      <button className="pale-red-button" onClick={() => setSortOrder("asc")}>
        Oldest
      </button>

      <p>Sort by comments 💬 </p>
      <button className="red-button" onClick={() => setSortBy("comment_count")}>
        Comments
      </button>
      <button className="pale-red-button" onClick={() => setSortOrder("desc")}>
        Most
      </button>
      <button className="pale-red-button" onClick={() => setSortOrder("asc")}>
        Least
      </button>
      <p>Sort by votes 👍 </p>
      <button className="red-button" onClick={() => setSortBy("votes")}>
        Votes
      </button>
      <button className="pale-red-button" onClick={() => setSortOrder("desc")}>
        Most
      </button>
      <button className="pale-red-button" onClick={() => setSortOrder("asc")}>
        Least
      </button>
      <br />
      <br />

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
