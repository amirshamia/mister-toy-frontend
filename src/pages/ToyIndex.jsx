import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect } from 'react'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmp/ToyList.jsx'

export function ToyIndex(){
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

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
        const toyToSave = toyService.getEmptyToy()

        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button onClick={onAddToy}>Add Toy </button>
                {/* <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}

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