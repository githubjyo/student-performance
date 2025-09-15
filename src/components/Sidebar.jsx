import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { FaTachometerAlt, FaUserGraduate, FaChartLine, FaBriefcase, FaTools, FaBars } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar d-flex flex-column ${isOpen ? "expanded" : "collapsed"} shadow`}>
      {/* Toggle Button */}
      <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
        {isOpen && <h4 className="fw-bold m-0">Dashboard</h4>}
        <FaBars className="toggle-btn" onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column mt-3">
        <Nav.Link href="/" className="nav-item">
          <FaTachometerAlt className="me-2" /> {isOpen && "Overview"}
        </Nav.Link>
        <Nav.Link href="/students" className="nav-item">
          <FaUserGraduate className="me-2" /> {isOpen && "Students"}
        </Nav.Link>
        <Nav.Link href="/portfolio" className="nav-item">
          <FaBriefcase className="me-2" /> {isOpen && "Portfolio"}
        </Nav.Link>
        <Nav.Link href="/business" className="nav-item">
          <FaChartLine className="me-2" /> {isOpen && "Analytics"}
        </Nav.Link>
        <Nav.Link href="/settings" className="nav-item">
          <FaTools className="me-2" /> {isOpen && "Settings"}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
