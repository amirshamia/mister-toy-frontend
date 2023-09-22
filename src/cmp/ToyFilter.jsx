import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { utilService } from "../services/util.service"
import { ToySort } from "./ToySort"
import MultipleSelect from "./MultipleSelect"
import { RangeSlider } from "./rangeSlider"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter))
    const dispatch = useDispatch()
    const [labelName, setLabelName] = useState([]);
    const [rangeValue, setRangeValue] = useState([10, 20])



    useEffect(() => {
        // if (_.isEqual(filterByToEdit, filterBy)) return
        onSetFilterDebounced.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log(target);
        const field = target.name
        let value = target.value

        switch (target.name) {
            case 'label':
                setLabelName(
                    // On autofill we get a stringified value.
                    typeof value === 'string' ? value.split(',') : value,
                );
                break;

            case 'price':
                setRangeValue(value)
                break

            default:
                break;
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    return (
        <section className="toy-filter">
            <label htmlFor="label">
                <MultipleSelect labelName={labelName} filterBy={filterByToEdit} handleChange={handleChange} />
            </label >
            <label htmlFor="name">Search:
                <input value={filterByToEdit.name} onChange={handleChange} name="name" type="text" id="name" />
            </label>
            <label htmlFor="price">Price:
                <RangeSlider rangeValue={rangeValue} handleChange={handleChange} />                {/* <input onChange={handleChange} type="range" name="price" id="maxPrice" min={0} max={500} /> */}
            </label>
            <ToySort />
        </section>)
}
