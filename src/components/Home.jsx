import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home(){

    return (
        <div >
            <NavBar />
            <h1>Northcoders News</h1>
            <h2>Spilling all the tea ☕</h2>
            <Link className="red-button" to="/articles">All Articles</Link>
        </div>
    )

}   