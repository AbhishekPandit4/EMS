import React from "react";
import Button from 'react-bootstrap/Button';
import emp from "../assets/emp.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const naviget=useNavigate()
  const navigetHome=()=>{
    naviget("/login")
  }
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1>Welcome to the Employee Management System</h1>
        <p>Manage your employees efficiently and effectively.</p>
        <Button variant="primary" onClick={navigetHome}> Get Started</Button>{" "}
      </div>
      <div className="hero-image">
        <img src={emp} alt="Employee Management" />
      </div>
    </section>
  );
};

export default Welcome;
