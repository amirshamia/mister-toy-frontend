import { socketService } from "../../services/socket.service.js";
import { userService } from "../../services/user.service.js";
import { SET_USER} from "../reducers/user.reducer.js";
import { store } from "../store.js";



export async function login(credentials) {
    try {
        const user = await userService.login(credentials)

        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)

        return user
    } catch (error) {
        console.log('user actions -> Cannot login', err)
        throw err
    }



}


export async function signup(credentials) {

    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)

        return user
    }
    catch (error) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }


}


export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        socketService.logout()
        
    } catch (error) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
}


