import React from 'react'
import {Link} from "react-router-dom" 
import randIndex from './random'


export default function join() {
    return (
        <div>
            <h1>Welcome to Cards Agains Humanity</h1>
            <Link to={`/game/${randIndex(9999)}`}>
                <button>
                    Join Game
                </button>
            </Link>
        </div>
    )
}
