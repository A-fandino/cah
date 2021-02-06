import React from 'react'
import {Link} from "react-router-dom" 


export default function join() {
    return (
        <div>
            <h1>Welcome to Cards Agains Humanity</h1>
            <Link to="/game">
                <button>
                    Join Game
                </button>
            </Link>
        </div>
    )
}
