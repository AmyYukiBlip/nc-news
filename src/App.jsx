import { Routes, Route } from "react-router-dom";
// import { UserAccount } from "./context/UserAccount";
import Home from "./components/Home";
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";
import CommentCard from "./components/CommentCard";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route
          path="/articles/:article_id/comments"
          element={<CommentCard />}
        />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/articles?topic=:topic" element={<AllArticles />} /> */}
        <Route path="*" element={<p>404 Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
