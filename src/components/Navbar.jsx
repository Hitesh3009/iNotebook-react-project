import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { isDropdownOpen: false };
  }
  handleLogout=()=>{
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }
  toggleDropdown = () => {
    this.setState((prevstate) => ({ isDropdownOpen: !prevstate.isDropdownOpen }));
  }
  render() {
    return (
      <>
        <nav className='bg-gray-800 p-1.5 flex items-center'>
          <div id="hamburger" className='md:hidden p-1 flex items-center'>
            <button className='cursor-pointer' onClick={this.toggleDropdown}>
              <div className="line border-2 border-white w-7 my-1"></div>
              <div className="line border-2 border-white w-7 my-1"></div>
              <div className="line border-2 border-white w-7 my-1"></div>
            </button>
          </div>
          <p className='text-xl md:text-2xl ml-2 md:ml-5 text-blue-500'>iNotebook</p>
          <ul className='hidden md:flex md:space-x-5 text-white lg:space-x-8 xl:space-x-10 p-2 text-lg'>
            <li></li>
            <li><NavLink exact to='/' activeClassName='bg-red-500 py-[0.4rem] px-2.5 rounded-md'>Home</NavLink></li>
          </ul>


          {!localStorage.getItem('token')?<div className='md:flex space-x-8 absolute right-2 md:right-4 lg:right-7 xl:right-10'>
            <button id="signUpBtn" className='bg-blue-500 py-1 px-2 rounded-md text-white text-sm md:text-base'>
              <Link to='/signup'>SignUp</Link>
            </button>
            <button id="loginBtn" className='bg-green-500 py-1 px-2 rounded-md text-white text-sm md:text-base'>
              <Link to='/login'>Login</Link>
            </button>
          </div>:<div className='flex items-center space-x-5 md:space-x-10 absolute right-2 md:right-4 lg:right-7 xl:right-10'>
            <p className='text-white text-lg md:text-xl'>{localStorage.getItem('message')}</p>
            <button id="logoutBtn" className='bg-cyan-500 py-1 px-2 rounded-md text-white text-sm md:text-base' onClick={this.handleLogout}>
              Logout
            </button></div>}
        </nav>
        {this.state.isDropdownOpen && (
          <div className="md:hidden">
            <ul className='text-sm bg-gray-600 text-white p-2 space-y-3'>
              <li></li>
              <li><NavLink exact to='/' activeClassName='bg-red-500 p-1.5 rounded-md block text-base'>Home</NavLink></li>
              <li></li>
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Navbar);
