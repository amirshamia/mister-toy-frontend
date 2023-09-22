import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { utilService } from "../services/util.service"
import { ToySort } from "./ToySort"
import MultipleSelect from "./MultipleSelect"


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
            <label htmlFor="label">
         
                <MultipleSelect filterBy={filterByToEdit} handleChange={handleChange}/>
            </label >
            <label htmlFor="name">Search:
                <input value={filterByToEdit.name} onChange={handleChange} name="name" type="text" id="name" />
            </label>
            <label htmlFor="price">Price:
                <input onChange={handleChange} type="range" name="price" id="maxPrice" min={0} max={500} />
            </label>
            <ToySort/>
        </section>)
}
