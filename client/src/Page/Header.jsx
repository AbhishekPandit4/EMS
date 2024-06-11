import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../Page/Heder.css"

const Header = () => {
  return (
    <header>
        <nav>
            <div className="logo">Employee Management</div>
            <ul className="nav-links">
              
                <li><a href="/employees">Employees</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login">Login</a></li>

            </ul>
        </nav>
    </header>
    
  );
};

export default Header;
