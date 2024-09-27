import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"

const Navbar = () => {
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img src="https://static.wixstatic.com/media/80c3b4_b75dffc38d5c47cdaa7d1ac115168adf~mv2.png/v1/fill/w_71,h_71,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/80c3b4_b75dffc38d5c47cdaa7d1ac115168adf~mv2.png" width="120" height="75" style={{borderRadius: "100px"}} className="d-inline-block align-top" alt="image path not found" />
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/add_teacher">Add Teacher</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/teachers_list">Teacher List</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
