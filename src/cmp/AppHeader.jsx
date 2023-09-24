import { NavLink } from "react-router-dom";



export function AppHeader() {

    return (
        <header className="app-header flex justify-between">
            <h3>Toys App</h3>

            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/inventory">Inventory</NavLink> |
                <NavLink to="/locations">Locations</NavLink> |

        
            </nav>


            
        </header>
    )
}