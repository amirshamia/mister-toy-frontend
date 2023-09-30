import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_SORT_BY } from "../store/reducers/toy.reducer"
import { SelectLabels } from "./Selectlabels"


export function ToySort() {
    const sortBy = useSelector(storeState => storeState.toyModule.filterBy.sort)
    const dispatch = useDispatch()

    function handleChange({ target }) {
     const sortByToEdit=target.value
        dispatch({type: SET_SORT_BY, sortByToEdit})
    }


    return (

        <SelectLabels handleChange={handleChange} sortBy={sortBy}/>
      
    )
}