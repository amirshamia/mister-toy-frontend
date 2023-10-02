
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useSelector } from "react-redux"
import { saveToy } from "../store/actions/toy.actions.js"
import { ChatApp } from "./Chat.jsx"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [msg, setMsg] = useState(toyService.getEmptyMsg())
    const [review, setReview] = useState(toyService.getEmptyReview())

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setMsg(prevMsg => ({ ...prevMsg, by: user }))
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
    function handleChangeMsg({ target }) {
        setMsg(prevMsg => ({ ...prevMsg, txt: target.value }))
    }

    async function submitMsg(ev) {
        ev.preventDefault()
       const msgSaved= await toyService.addMsg(toy._id, msg)
       console.log(msgSaved, msg);
        setToy(prevToy => ({ ...prevToy,  msgs:[  ...prevToy.msgs ||[], msg ] }))
        saveToy(toy)
        setMsg(toyService.getEmptyMsg())

    }
    function handleChangeReview({ target }) {
        setReview(prevReview => ({ ...prevReview, txt: target.value }))
    }

    async function submitReview(ev) {
        ev.preventDefault()
        setReview(prevReview => ({ ...prevReview, userId:user._id, toyId:toy._id}))
        await toyService.addReview(toy._id,review)
        setReview(toyService.getEmptyReview())

    }

    if (!toy) return <div>loading</div>

    return (
        <>
            <section className="details-container">
                <h3> Toy: {toy.name}</h3>
                <h2>Price: {toy.price}$</h2>
                {toy.inStock && <h1>In Stock</h1>}
                {!toy.inStock && <h1>Out Of Stock</h1>}

                <p className="labels-preview"> <span>Labels:</span> {toy.labels.map(label => {
                    if (!label) return
                    const labelTag = (label).split(' ').join('-')
                    return <span className={labelTag} key={label}>{label}  </span>
                })} </p>
                <button><Link to="/toy">Back</Link></button>
                <img style={{ width: '50vw' }} src={toy.img} alt="a" />
            { toy.msgs && <ul>
                    {toy.msgs.map(msg=> <li key={msg.id}> {msg.txt} </li> )}
                </ul>}
            </section>
            <section className="reviews">
                <form onSubmit={submitMsg}>

                    <label htmlFor="msg">
                        <input value={msg.txt} onChange={handleChangeMsg} type="textarea" name="msg" id="msg" />
                        <button >add message</button>
                    </label>
                </form>
            </section>
            <section className="reviews">
                <form onSubmit={submitReview}>

                    <label htmlFor="review">
                        <input value={review.txt} onChange={handleChangeReview} type="textarea" name="review" id="review" />
                        <button >add review</button>
                    </label>
                </form>
            </section>
            <section>
                <ChatApp toy={toy}/>
            </section>
        </>
    )
}

