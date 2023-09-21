import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_SORT_BY } from "../store/reducers/toy.reducer"


export function ToySort() {
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const dispatch = useDispatch()

    function handleChange({ target }) {
     const sortByToEdit=target.value
     console.log(sortByToEdit);
        dispatch({type: SET_SORT_BY, sortByToEdit})
    }


    return (
        <select value={sortBy} onChange={handleChange} name="sortBy" id="sortBy">
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="createdAt">Time</option>

        </select>
    )
}