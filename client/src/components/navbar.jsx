import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Property.png'

const navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt='' width={100}/>
        <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/properties"><li>Properties</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
        </ul>
        <button>Sign up</button>
    </div>
  )
}

export default navbar