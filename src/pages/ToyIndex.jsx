import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmp/ToyList.jsx'
import { ToyFilter } from '../cmp/ToyFilter.jsx'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { Loader } from '../cmp/Loader.jsx'

export function ToyIndex() {
    const dispatch = useDispatch()
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const [toyToSave, setToyToSave] = useState()

    useEffect(() => {
        try {
            loadToys()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load toys')
        }
    }, [filterBy, sortBy])

    async function onRemoveToy(toyd) {
        // removetoy(toyd)

        try {
            removeToyOptimistic(toyd)

            showSuccessMsg('toy removed')
        } catch (error) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }

    }
    async function onAddToy() {
        try {
            const emptyToy = await toyService.getEmptyToy()
            setToyToSave(emptyToy)

            const savedToy = await saveToy(toyToSave)

            showSuccessMsg(`toy added (id: ${savedToy._id})`)
        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')
        }

    }
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <div>
            <main>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {user && <button onClick={onAddToy}>Add Toy </button>}

                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}

                />
                }

                {isLoading && <Loader />}
                <hr />
            </main>
        </div>
    )
}