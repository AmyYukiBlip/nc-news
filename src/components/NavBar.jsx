import { useContext, React } from "react";
import { Link } from "react-router-dom";
import { UserAccount } from "./UserAccount";

export default function NavBar() {
  const loggedInUser = useContext(UserAccount);
  console.log("User logged in is:", loggedInUser);

  return (
    <ul className="nav-container">
      <li className="nav-item-left">
        <Link className="nav-link-left" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item-left">
        <Link className="nav-link-left" to="/articles">
          Articles
        </Link>
      </li>
      <li className="nav-item-right">
        <Link className="nav-link-right" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
}
