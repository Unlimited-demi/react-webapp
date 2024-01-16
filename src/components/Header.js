import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  const logMeOut = async () => {
    try {
      await axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/logout',
      });
      props.token();
      localStorage.removeItem('email');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  const logged = localStorage.getItem('email');

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Unlimiteddemi
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
          {!logged ? (
            <button className="btn btn-outline-success">Login</button>
          ) : (
            <button className="btn btn-outline-danger" onClick={logMeOut}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
