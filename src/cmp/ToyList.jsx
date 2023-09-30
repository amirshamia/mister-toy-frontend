


import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"
import { useSelector } from "react-redux"

export function ToyList({ toys, onRemoveToy }) {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="bottom flex justify-center">
                        {user.isAdmin && <><button onClick={() => onRemoveToy(toy._id)}>x</button>
                            <button> <Link to={`/edit/${toy._id}`}>edit</Link>  </button></>}
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>

                    </div>
                </li>
            )}
        </ul>
    )
}