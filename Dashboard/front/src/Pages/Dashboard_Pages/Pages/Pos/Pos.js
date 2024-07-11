import "./Pos.css";
import "../DataTable.css";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiFillShopping } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";

import subMenuItems from "../../store/subMenu";
import subMainMenu from "../../store/mainMenu";

import Add from "./Features/Add";
import CartItems from "./Features/CartItems";
import DetailsItem from "./Features/DetailsItem";

export default function Pos() {
  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");
  };

  const [cartItem, setCartItem] = useState(null);

  const addToCart = (item) => {
    setCartItem(item);
  };

  return (
    <div className="Pos">
      <div className="posMenuItem">
        <div className="posSearch">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search by menu item"
            />
            <button
              className="btn btn-outline-secondary iconSearch"
              type="button"
            >
              <IoIosSearch />
            </button>
          </div>
        </div>

        <div className="posContent">
          <div className="subMenu mb-4">
            <div className="cards">
              {subMenuItems.map((item) => (
                <a href="#" className="card">
                  <img src={item.image} alt={item.title} />
                  <small className="card-title">{item.title}</small>
                </a>
              ))}
            </div>
          </div>

          <div className="mainMenu">
            <div className="cards">
              {subMainMenu.map((item) => (
                <div className="card" id={item.id}>
                  <div className="card-img">
                    <img src={item.image} alt={item.image} />
                  </div>
                  <div className="card-body p-2">
                    <p className="fw-bold pb-2">{item.title}</p>
                    <div>
                      <span className="fw-bold price">${item.price}</span>
                      <button
                        type="button"
                        className="addCartBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#detailsItem"
                        onClick={() => addToCart(item)}
                      >
                        <FaShoppingBag /> add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary openPosCartItems"
          onClick={() => handleToggleClass("posCartItems")}
        >
          <AiFillShopping />
          <span className="fs-6 fw-bold">items - </span>
          <span className="fs-6 fw-bold">${"0.00"}</span>
        </button>
      </div>

      <CartItems />
      {cartItem && <DetailsItem cartItem={cartItem} />}
      <Add />
    </div>
  );
}
