// src/components/NavBar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Logout from './Logout';

const NavBar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="mb-4">
      {isAuthenticated ? (
        <>
          <Link to="/automobiles" className="mr-4">Automobiles</Link>
          <Link to="/add-automobile" className="mr-4">Add Automobile</Link>
          <Logout />
        </>
      ) : (
        <>
          <Link to="/signup" className="mr-4">Sign Up</Link>
          <Link to="/signin" className="mr-4">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;