import React, { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import Invoice from "./Invoice";

export default function CartItems() {
  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");
  };

  const [items, setItems] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadStoreItems = () => {
      const storeItems = JSON.parse(localStorage.getItem("storeItems")) || [];
      setItems(storeItems);

      let newTotal = storeItems.reduce(
        (prev, item) => prev + item.price * item.quantity,
        0
      );
      setFinalTotal(newTotal);

      if (storeItems.length < 1) {
        document.querySelector(".discountType").style.display = "none";
        document.querySelector(".paymentOption").style.display = "none";
      } else {
        document.querySelector(".discountType").style.display = "flex";
        document.querySelector(".paymentOption").style.display = "flex";
      }
    };

    loadStoreItems();
    window.addEventListener("storageUpdated", loadStoreItems);

    return () => {
      window.removeEventListener("storageUpdated", loadStoreItems);
    };
  }, []);

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem("storeItems", JSON.stringify(updatedItems));
    updateFinalTotal(updatedItems);

    const event = new Event("storageUpdated");
    window.dispatchEvent(event);
  };

  const applyDiscount = () => {
    let newFinalTotal = finalTotal;
    let discountAmount = 0;

    if (discountType === "percentage") {
      discountAmount = (newFinalTotal * discountValue) / 100;
    } else if (discountType === "fixed") {
      discountAmount = discountValue;
    }

    newFinalTotal -= discountAmount;
    setFinalTotal(newFinalTotal > 0 ? newFinalTotal : 0);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOrder = () => {
    Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, place order",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Order Placed!",
          "Your order has been successfully placed.",
          "success"
        );
        handleResetCart();
      }
    });
  };

  const handleResetCart = () => {
    localStorage.removeItem("storeItems");
    setItems([]);

    const event = new Event("storageUpdated");
    window.dispatchEvent(event);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("storeItems", JSON.stringify(updatedItems));
    setItems(updatedItems);
    updateFinalTotal(updatedItems);
  };

  const increaseQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      handleQuantityChange(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      handleQuantityChange(id, item.quantity - 1);
    }
  };

  const updateFinalTotal = (items) => {
    let newTotal = items.reduce(
      (prev, item) => prev + item.price * item.quantity,
      0
    );
    setFinalTotal(newTotal);
  };

  return (
    <div className="posCartItems show" id="posCartItems">
      <div className="CartItems">
        <div
          className="closePosCartItems"
          onClick={() => handleToggleClass("posCartItems")}
        >
          <FaXmark />
        </div>

        <form>
          <div className="input-group gap-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search customers"
            />
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addPosCustomer"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <RiAddCircleLine />
              add
            </button>
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="token no"
            />
          </div>
        </form>

        <div className="table-responsive mt-3">
          <table className="table text-center tableItems">
            <thead>
              <tr>
                <th>C</th>
                <th>item</th>
                <th>qty</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr id={item.id} key={item.id}>
                  <td>
                    <FaTrash onClick={() => handleDeleteItem(item.id)} />
                  </td>
                  <td
                    className="c-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.title}
                  </td>
                  <td className="quantityActions">
                    <AiOutlinePlusCircle
                      className="pr-1"
                      onClick={() => increaseQuantity(item.id)}
                    />
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                    />
                    <AiOutlineMinusCircle
                      className="pl-1"
                      onClick={() => decreaseQuantity(item.id)}
                    />
                  </td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="discountType mb-3">
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
          />
          <button onClick={applyDiscount}>Apply</button>
        </div>

        <ul className="payment-details">
          <li className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">sub total</span>
            <span className="fw-semibold">${"0.00"}</span>
          </li>
          <li className="d-flex justify-content-between mb-2">
            <span>discount</span>
            <span>${"0.00"}</span>
          </li>
          <li className="d-flex justify-content-between">
            <span className="fw-bold">total</span>
            <span className="fw-bold">${finalTotal}</span>
          </li>
        </ul>

        <div className="paymentOption mt-3">
          <button className="btn btn-danger" onClick={handleResetCart}>
            cancel
          </button>
          <button className="btn btn-success" onClick={handleOrder}>
            order
          </button>
        </div>
      </div>

      <Invoice show={showModal} onClose={closeModal} item={activeItem} />
    </div>
  );
}
