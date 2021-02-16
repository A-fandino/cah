import React from 'react'
import {Link} from "react-router-dom"

export default function navBar() {
    return (
        <nav>
            <Link to="/">
                    Home
            </Link>
            <Link to="/join">
                    Join
            </Link>
        </nav>
    )
}
