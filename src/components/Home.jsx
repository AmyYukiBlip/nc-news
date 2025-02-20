import { Link } from "react-router-dom";
import AllTopics from "./AllTopics";

export default function Home(){

    return (
        <div >
            <h1>Northcoders News</h1>
            <h2>Spilling all the tea ☕</h2>
            <p>coming soon... Latest</p>
    
            <AllTopics/>

            <Link className="red-button" to="/articles">All Articles</Link>
        </div>
    )

}   