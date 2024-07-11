import "./Breadcrumb.css";
import React from "react";
import Dashboard from "../../../Pages/Dashboard_Pages/Pages/Dashboard";
import { Link } from "react-router-dom";

export default function Breadcrumb() {
  return (
    <div className="Breadcrumb">
      <div className="col-12 pb-3">
        <ul>
          <li>
            <Link to="/admin/dashboard" element={<Dashboard />}>
              dashboard
            </Link>
          </li>
          <span> / </span>
          <li>{window.location.pathname.replace("/admin/dashboard/", "")}</li>
        </ul>
      </div>
    </div>
  );
}
