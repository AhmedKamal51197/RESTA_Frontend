import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import publicRoutes from '../../../Pages/Dashboard_Pages/store/publicRoutes';


export function Sidebar() {
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    const currentRoute = window.location.pathname.replace(
      "/admin/dashboard/",
      ""
    );
    setActiveRoute(currentRoute);
  }, [window.location]);

  const injectAppTitle = () => {
    let url = window.location.pathname.replace("/admin/dashboard/", "");
    let titleValue = "";

    if (window.location.pathname !== "/admin/dashboard")
      titleValue = "FoodScan - " + url;
    else titleValue = "FoodScan - QrCode Restaurant";

    document.title = titleValue;
  };

  const handleRouteClick = (route) => {
    setActiveRoute(route.replace("/admin/dashboard/", ""));
    injectAppTitle();

    document.getElementById("Loader").classList.add("show");
    setTimeout(() => {
      document.getElementById("Loader").classList.remove("show");
    }, 2000);
  };

  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");
  };

  return (
    <div className="Sidebar show" id="sidebar">
      <div className="closeSidebar">
        <FaXmark onClick={() => handleToggleClass("sidebar")} />
      </div>

      {publicRoutes.map((routeGroup, index) => (
        <div className="group" key={index}>
          {routeGroup.label && <label>{routeGroup.label}</label>}
          <ul>
            {routeGroup.items.map((route, id) => (
              <li
                key={id}
                className={`liRoute ${
                  activeRoute === route.path.replace("/admin/dashboard/", "")
                    ? "active"
                    : ""
                }`}
                onClick={() => handleRouteClick(route.path)}
              >
                <Link to={route.path}>
                  {React.createElement(route.icon)}
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
