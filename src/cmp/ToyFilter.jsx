import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { utilService } from "../services/util.service"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter))
    const dispatch = useDispatch()

    useEffect(() => {
        // if (_.isEqual(filterByToEdit, filterBy)) return
        onSetFilterDebounced.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    return (
        <section className="toy-filter">
            <label htmlFor="label">lalbel:
                <select value={filterByToEdit.label} onChange={handleChange} name="label" id="label">
                    <option value=""></option>
                    <option value="On wheels">On wheels</option>
                    <option value="Box game">Box game</option>
                    <option value="Art">Art</option>
                    <option value="Baby">Baby</option>
                    <option value="Doll">Doll</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Battery Powered">Battery Powered</option>
                </select>
            </label>
            <label htmlFor="name">Search:
                <input value={filterByToEdit.name} onChange={handleChange} name="name" type="text" id="name" />
            </label>
            <label htmlFor="price">Price:
                <input onChange={handleChange} type="range" name="price" id="maxPrice" min={0} max={500} />
            </label>
        </section>)
}