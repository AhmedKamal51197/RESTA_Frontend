import "./Style.css";

import {
  CheckCircleFilled,
  PlusCircleFilled,
  PrinterOutlined,
} from "@ant-design/icons";
import { MdDateRange } from "react-icons/md";

import ImageTest from "../../../../assets/global/profile.png";
import { FaXmark } from "react-icons/fa6";

export default function Show() {
  return (
    <div className="Show">
      <div className="head">
        <div className="details">
          <h4 className="id">
            <label>order id:</label>
            <b>#4643153</b>
            <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>unpaid</span>
            <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>accept</span>
          </h4>

          <div className="date">
            <span className="fs-6">
              <MdDateRange />
            </span>
            <label>07:45 am 29-04-2001</label>
          </div>

          <div className="payment_type">
            <label>payment type:</label>
            <b>cash/card</b>
          </div>

          <div className="order_type">
            <label>order type:</label>
            <b>dining table</b>
          </div>

          <div className="delivery_time">
            <label>delivery time:</label>
            <b>07:45 am 29-04-2001</b>
          </div>

          <div className="table_id">
            <label>table id:</label>
            <b>table 1</b>
          </div>
        </div>

        <div className="options">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#AddToken"
          >
            <PlusCircleFilled />
            <span>add token</span>
          </button>

          <select name="payment_type" id="payment_type">
            <option value="-1">--</option>
            <option value="1">paid</option>
            <option value="2">unpaid</option>
          </select>

          <select name="status" id="status">
            <option value="-1">--</option>
            <option value="1">accept</option>
            <option value="2">processing</option>
            <option value="3">delivery</option>
          </select>

          <button className="btn btn-primary">
            <PrinterOutlined />
            print invoice
          </button>
        </div>
      </div>

      <div className="body d-flex">
        <div className="sections sections-left">
          <div className="title">
            <b>order details</b>
          </div>

          <div className="section">
            <div className="cards">
              <div className="card" data-id="1">
                <div className="card-img">
                  <img src={ImageTest} alt="image" />
                </div>
                <div className="card-text">
                  <p className="name fw-bold">kung peo chicken</p>
                  <p className="quantity">
                    quantity choice: <span className="fw-bold">6 pcs</span>
                  </p>
                  <b className="total">$12.2</b>
                </div>
              </div>

              <div className="card" data-id="2">
                <div className="card-img">
                  <img src={ImageTest} alt="image" />
                </div>
                <div className="card-text">
                  <p className="name fw-bold">kung peo chicken</p>
                  <p className="quantity">
                    quantity choice: <span className="fw-bold">6 pcs</span>
                  </p>
                  <b className="total">$12.2</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sections sections-right">
          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>$7</b>
            </div>

            <div className="details">
              <b>total</b>
              <b>$7</b>
            </div>
          </div>

          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>$7</b>
            </div>

            <div className="details">
              <b>total</b>
              <b>$7</b>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="AddToken"
        tabindex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="AddTokenLabel"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="AddTokenLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label for="token" className="form-label">
                      token <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="token"
                      id="token"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                <FaXmark />
                <span>cancel</span>
              </button>
              <button type="button" class="btn btn-primary">
                <CheckCircleFilled />
                <span>save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
