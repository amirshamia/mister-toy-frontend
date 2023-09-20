


import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button> <Link to={`/edit/${toy._id}`}>edit</Link>  </button>
                    </div>
                </li>
            )}
        </ul>
    )
}