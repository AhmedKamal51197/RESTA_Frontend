import "./Header.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { AiFillShop } from "react-icons/ai";
import { IoBookmarks } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";

import Logo from "../../../assets/global/logo.png";
import Profile from "./Profile";

export function Header() {
  const history = useHistory();

  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");

    if (element === "sidebar") {
      var container = document.getElementById("container");
      container.classList.toggle("full-width");
    }
  };

  const injectAppTitle = () => {
    document.title = "FoodScan - QrCode Restaurant";
    history.push("/admin/dashboard");
  };

  return (
    <div className="Header">
      <Link to="#" onClick={injectAppTitle}>
        <img src={Logo} className="logo" alt="logo" />
      </Link>

      <div className="navbar">
        <div className="customRow">
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => handleToggleClass("branch")}
            >
              <AiFillShop className="icon-shop" />
              <div className="details">
                <span>Branch</span>
                <b>{"Mirpur-1 (main)"}</b>
              </div>
            </button>
            <ul className="dropdown-menu" id="branch">
              <li>
                <input
                  type="radio"
                  id="branch_id_1"
                  name="branch"
                  value="1"
                  checked
                />
                <label for="branch_id_1">{"Mirpur-1 (main)"}</label>
              </li>
              <li>
                <input type="radio" id="branch_id_2" name="branch" value="1" />
                <label for="branch_id_2">{"Gulshan-1"}</label>
              </li>
            </ul>
          </div>

          <div className="customBtn">
            <Link to="/admin/dashboard/pos" className="pos">
              <IoBookmarks />
            </Link>

            <button
              className="menu"
              onClick={() => handleToggleClass("sidebar")}
            >
              <RiMenu2Line />
            </button>
          </div>
        </div>

        <Profile />
      </div>
    </div>
  );
}
