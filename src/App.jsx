import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { HomePage } from './pages/HomePage'
import { store } from './store/store'
import { AppHeader } from './cmp/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './cmp/ToyEdit'
import { Inventory } from './pages/Inventory'
import { Locations } from './pages/Locations'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/edit/:toyId" />
                            <Route element={<Inventory />} path="/inventory" />
                            <Route element={<Locations />} path="/locations" />


                        </Routes>
                    </main>
            
                </section>
            </Router>
        </Provider>
    )
}