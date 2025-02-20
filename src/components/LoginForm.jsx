import { useContext, useEffect, useState } from "react";
import { ncNewsApi } from "../api";
import { UserAccount } from "./UserAccount";

export default function userLogin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserAccount);

  useEffect(() => {
    ncNewsApi
      .get(`/users`)
      .then((res) => {
        console.log("All users: ", res.data.users);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInput = (event) => {
    const foundUser = users.find(
      (user) => user.username === event.target.value
    );
    console.log("founduser: ", foundUser);
    setSelectedUser(foundUser);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedUser) {
      setLoggedInUser(selectedUser);
    } else {
      alert("username not found!");
    }
  }

  return (
    <>
      <h1>Northcoders News</h1>
      <h2>Spilling all the tea ☕</h2>
      <br></br>
      <h3>Login to vote & comment!</h3>

      <section className="login-form">
        {loggedInUser ? (
          <p>Hello, {loggedInUser.username}, you're now logged in! 😄 </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What's your username?"
              name="username"
              onChange={handleInput}
              required
            />
            <button className="red-button">Login</button>
          </form>
        )}
      </section>
    </>
  );
}
