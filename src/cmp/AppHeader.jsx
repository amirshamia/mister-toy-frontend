import { NavLink } from "react-router-dom";



export function AppHeader() {

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">toys</NavLink> |
        
            </nav>
        </header>
    )
}