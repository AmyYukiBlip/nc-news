import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link className="home-link" to="/">
        Home
      </Link>
    </nav>
  );
}
