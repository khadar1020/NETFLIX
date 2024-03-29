import React from 'react'
import logo from '../../logo.png'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'

const Header = () => {
  return (
    <nav className='header'>
      <img src={logo} alt="logo" />

      <div>
        <Link to="/toshows">TV shows</Link>
        <Link to="/toshows">Movies</Link>
        <Link to="/toshows">Recently Added</Link>
        <Link to="/toshows">MyList</Link>
      </div>

      <ImSearch />
    </nav>
  )
}

export default Header
