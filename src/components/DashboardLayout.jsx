import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "220px" }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
