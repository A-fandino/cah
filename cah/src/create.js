import React from 'react'
import {Link} from "react-router-dom" 
import randIndex from './random'


export default function create() {
    return (
        <div className="centered-container">
            <h1>Welcome to Cards Agains Humanity</h1>
            <Link to={`/game/${randIndex(9999)}`}>
                <button className="create-button">
                    Create Game
                </button>
            </Link>
        </div>
    )
}
