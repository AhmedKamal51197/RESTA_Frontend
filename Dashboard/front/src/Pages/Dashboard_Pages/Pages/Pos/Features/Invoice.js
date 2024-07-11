import "../Invoice.css";
import React from "react";
import { PrinterOutlined } from "@ant-design/icons";

const Invoice = ({ show, onClose, item }) => {
  if (!show) return null;

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          {item && (
            <>
              <div className="options">
                <button className="btn btn-danger" onClick={onClose}>
                  cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handlePrintInvoice}
                >
                  <PrinterOutlined />
                  print invoice
                </button>
              </div>

              <div className="message-qrCode">
                foodScan - qrCode restaurant menu maker and contactless menu
                ordering system
              </div>

              <div className="restaurant-address">
                <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
                <p>tel: {"+4545344545"}</p>
              </div>

              <div className="id_date">
                <p>
                  <span>order id</span>
                  <span>{"#48448646"}</span>
                </p>
                <p>
                  <span>{"02-05-2024"}</span>
                  <span>{"11:54 pm"}</span>
                </p>
              </div>

              <div className="menu">
                <table>
                  <thead>
                    <tr>
                      <th>qty</th>
                      <th>item description</th>
                      <th>price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.quantity}</td>
                      <td>
                        <p>{item.name}</p>
                        <p>size regular - 6</p>
                        <p>VAT ({"5.00"} %)</p>
                      </td>
                      <td>{item.price}</td>
                    </tr>

                    {/* totals */}
                    <tr className="totals">
                      <td></td>
                      <td>SUBTOTAL</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>TOTAL TAX</td>
                      <td>${"0.45"}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>DISCOUNT</td>
                      <td>${"0.0"}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>TOTAL</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="paymentType">
                <p>
                  <span>payment type: </span>
                  <span>{"Cash"}</span>
                </p>
              </div>

              <div className="messageThank">
                <p>thank you</p>
                <p>please come again</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
