import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmp/ToyList.jsx'
import { ToyFilter } from '../cmp/ToyFilter.jsx'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import axios from 'axios'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const [toyToSave, setToyToSave] = useState()

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyd) {
        // removetoy(toyd)
        removeToyOptimistic(toyd)
            .then(() => {
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }
    function onAddToy() {
        toyService.getEmptyToy()
            .then(setToyToSave)
            .then(saveToy(toyToSave))
            .then(savedToy => {
                showSuccessMsg(`toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }
    function onSetFilter(filterBy) {
        console.log(filterBy);
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
    return (
        <div>
            <main>
                <button onClick={onAddToy}>Add Toy </button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}

                />
                }

                {isLoading && <div>Loading...</div>}
                <hr />
                {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
            </main>
        </div>
    )
}