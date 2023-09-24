import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article >
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock && <h3>inStock</h3>}
            <div>Labels:</div> <p className="labels-container">{toy.labels.map(label => {
                if (!label) return
                const labelTag = (label).split(' ').join('-')
                return <span className={labelTag} key={label}>{label}  </span>
            })} </p>
            <img src={toy.img} alt="" />
        </article >

    )
}