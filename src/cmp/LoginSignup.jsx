
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'

import { useState } from "react"

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function LoginSignup() {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        if (isSignupState) {
            signup(credentials)
                .then((user) => {
                    showSuccessMsg(`Welcome ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('Cannot signup')
                })
        } else {
            login(credentials)
                .then((user) => {
                    showSuccessMsg(`Hi again ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('Cannot login')
                })
        }
    }

    function onToggleSignupState() {
        setIsSignupState(isSignupState => !isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button>{isSignupState ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a >
            </div>
        </div >
    )
}

