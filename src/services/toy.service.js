
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import axios from 'axios'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabelsCount,
    getLabelsPrices,
    getEmptyMsg,
    addMsg,
    getEmptyReview,
    addReview
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}

async function query(filterBy = {}, sortBy) {
    const toys = await httpService.get(BASE_URL, filterBy)

    if (sortBy) {
        utilService.sortBy(toys, sortBy)
    }
    return toys

    //     return toys.filter(toy =>
    //         regExp.test(toy.vendor) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Oh no!')
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

async function addMsg(toyId, msg) {
    console.log(msg);

    // console.log('toyId',toyId , msg)
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { ...msg })
    return savedMsg
}
async function addReview(toyId, review) {
    console.log(review);

    // console.log('toyId',toyId , review)
    const savedReview = await httpService.post(`toy/${toyId}/review`, { ...review })
    return savedReview
}

function getEmptyToy() {
    let imgUrl
    return axios.get(`https://api.unsplash.com/search/photos?query=toy&client_id=fdYyDQ-ZI2NK6bXUbdCcF45RIy0Uj4r_UHNNScHxcZo`).then(res => { (imgUrl = res.data.results[utilService.getRandomIntInclusive(0, 9)].urls.full) }).then(_ => {
        return {
            name: 'Toy-' + (Date.now() % 1000),
            price: utilService.getRandomIntInclusive(100, 500),
            inStock: utilService.getBol(),
            labels: utilService.getRandomLabels(),
            img: imgUrl,
            createdAt: Date.now(),
            msgs: []
        }

    })
}
function getEmptyMsg() {
    return {
        id: utilService.makeId(),
        txt: '',
        by: {}
    }
}
function getEmptyReview() {
    return {
        userId: '',
        txt: '',
        toyId: ''
    }
}


function getDefaultFilter() {
    return { name: '', price: '', label: [], sort: '' }
}
async function getLabelsCount() {

    const toys = await query()
    var count = []
    for (let i = 0; i <= labels.length; i++) {
        toys.map(toy => {
            if (!toy.inStock) return
            if (toy.labels.includes(labels[i])) {
                count[i] ? count[i]++ : count[i] = 1
            }
        })
    }

    return count


}

async function getLabelsPrices() {
    const toys = await query()
    var sum = []
    for (let i = 0; i <= labels.length; i++) {
        var count = 0
        toys.map(toy => {
            if (toy.labels.includes(labels[i])) {
                count++
                sum[i] ? sum[i] += toy.price : sum[i] = toy.price
            }
        })
        sum[i] = sum[i] / count
    }

    return sum

}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


