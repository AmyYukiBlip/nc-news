import { Link } from "react-router-dom"
import Home from "./Home"

export default function NavBar() {

    return (
        
        <nav>
        <Link className="home-link" to="/">Home</Link>
        </nav>
        
    )
}  