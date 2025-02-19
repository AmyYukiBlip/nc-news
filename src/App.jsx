import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home"
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";
import CommentCard from "./components/CommentCard";
import NavBar from "./components/NavBar";


function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<AllArticles />} />
      <Route path="/articles/:article_id" element={<Article  />} />
      <Route path="/articles/:article_id/comments" element={<CommentCard />} />
    </Routes>
    </>
  );
}

export default App;


