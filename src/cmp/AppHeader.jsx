import { NavLink, useNavigate } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { logout } from "../store/actions/user.actions";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";



export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()
    async function onLogout() {
        try {
            navigate('/')
            await logout()
            showSuccessMsg('Logout successfully')
        } catch (error) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }


    return (
        <header className="app-header flex justify-between">
            <h3>Toys App</h3>
            {user && <section className="flex user-info">
                <h3>Welcome {user.fullname} </h3>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}
            {user && <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy/">Toys</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
                <NavLink to="/locations">Locations</NavLink> |

            </nav>}



        </header>
    )
}