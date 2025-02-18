import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<AllArticles />} />
      <Route path="/articles/:article_id" element={<Article />} />
    </Routes>
    </>
  );
}

export default App;


