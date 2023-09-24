
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadtoy()
    }, [toyId])

    function loadtoy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>loading</div>

    return (
        <section className="details-container">
            <h3> Toy: {toy.name}</h3>
            <h2>Price: {toy.price}$</h2>
            {toy.inStock && <h1>In Stock</h1>}
            {!toy.inStock && <h1>Out Of Stock</h1>}
            
           <p className="labels-preview"> <div>Labels:</div> {toy.labels.map(label => {
                if (!label) return
                const labelTag = (label).split(' ').join('-')
                return <span className={labelTag} key={label}>{label}  </span>
            })} </p>
            <button><Link to="/toy">Back</Link></button>
            <img style={{width:'50vw'}} src={toy.img} alt="a" />
        </section>
    )
}

