import React from "react";
import Header from "./Page/Header";
import Footer from "./Page/Footer";
import "./App.css";
import Welcome from "./Components/Welcome";
import EmpLogin from "./Components/EmpLogin/EmpLogin";
import Empolyee from "./Components/Empolyee/EmpolyeeList";
// import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Footer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<EmpLogin />} />
          <Route path="/employees" element={<Empolyee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
