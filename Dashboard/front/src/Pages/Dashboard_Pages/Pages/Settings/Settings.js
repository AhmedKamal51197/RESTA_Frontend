import "./Settings.css";
import React from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "../../Pages/Dashboard";
import routesSetting from "../../store/routesSettings";
import SubSidebar from "./SubSidebar/SubSidebar";

export default function Settings() {
  return (
    <div className="Settings">
      {/* Breadcrumb */}
      <div className="Breadcrumb">
        <div className="col-12 pt-1 pb-4">
          <ul>
            <li>
              <Link to="/dashboard" element={<Dashboard />}>
                dashboard
              </Link>
            </li>
            <span> / </span>
            <li>setting</li>
            <span> / </span>
            <li>
              {window.location.pathname.replace(
                "/admin/dashboard/settings/",
                ""
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="contentSettings">
        <SubSidebar />

        <Switch>
          {routesSetting.map((route) => (
            <Route path={route.path} component={route.component} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

// key={route.path}
