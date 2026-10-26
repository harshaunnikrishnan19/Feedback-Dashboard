import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Course Feedback Admin</div>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/add-feedback" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Add Feedback
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;