// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import OrderHistory from './OrderHistory';

function App() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Food Delivery App</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/order-history">Order History</Nav.Link>
                </Nav>
            </Navbar>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </Routes>
        </Router>
    );
}

export default App;