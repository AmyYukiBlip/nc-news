import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="nav-container">
      <li className="nav-item-left"><Link className="nav-link-left" to="/">
        Home
      </Link></li>
      <li className="nav-item-left"><Link className="nav-link-left" to="/articles">
        Articles
      </Link></li>
      <li className="nav-item-right"><p className="nav-link-right">Login</p></li>
    </ul>
  );
}
