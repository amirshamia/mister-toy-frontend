import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"


export function ToyEdit() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadtoy()
    }, [toyId])

    async function loadtoy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }
    async function editToy(ev) {
        ev.preventDefault()
        try {
           await saveToy(toy)
            navigate(`/toy/${toyId}`)

        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot save toy')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    if (!toy) return <div> loading</div>
    const { name, price, inStock } = toy
    return (
        <form className="edit-form" onSubmit={editToy}>
            <label htmlFor="name">Name</label>
            <input onChange={handleChange} type="text" value={name} name="name" id="name" />
            <label htmlFor="price">Price</label>

            <input onChange={handleChange} type="number" value={price} name="price" id="price" />
            <div>

                <input onChange={handleChange} type="checkbox" checked={inStock} name="inStock" id="inStock" />
                <label htmlFor="inStock">in Stock</label>
            </div>
            <button>edit</button>
        </form>
    )
}



