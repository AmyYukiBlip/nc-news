import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserAccount } from "./components/UserAccount";
import Home from "./components/Home";
import AllArticles from "./components/AllArticles";
import Article from "./components/Article";
import CommentCard from "./components/CommentCard";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";


function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <>
      <UserAccount.Provider value={{loggedInUser, setLoggedInUser}}>
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
        </Routes>
      </UserAccount.Provider>
    </>
  );
}

export default App;
