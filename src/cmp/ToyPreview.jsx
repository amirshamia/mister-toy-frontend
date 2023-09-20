import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock && <h3>inStock</h3>}
            <Link to={`/toy/${toy._id}`}>Details</Link>
           

        </article>
        
    )
}