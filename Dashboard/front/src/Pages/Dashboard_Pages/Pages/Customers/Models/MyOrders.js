import "../Models.css";
import { BiSolidDish } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function MyOrders() {
  return (
    <div className="MyOrders">
      <div className="content">
        <div className="head">
          <div>my orders</div>
        </div>

        <div className="body">
          <div className="cards">
            <div className="card">
              <div className="card-icon">
                <BiSolidDish />
              </div>

              <div className="card-body">
                <div className="id">
                  <label>order id:</label>
                  <b>#4543543</b>
                  <span className="status">accept</span>
                </div>
                <div className="quantity">2 items</div>
                <div className="date">12:5 pm, 12-06-2001</div>
                <div className="total">
                  <label>total:</label>
                  <b>$47.56</b>
                </div>
              </div>

              <Link
                to="/admin/dashboard/details-order/2/2"
                className="seeToDetails"
              >
                see order details
                <IoIosArrowForward />
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">
                <BiSolidDish />
              </div>

              <div className="card-body">
                <div className="id">
                  <label>order id:</label>
                  <b>#4543543</b>
                  <span className="status">accept</span>
                </div>
                <div className="quantity">2 items</div>
                <div className="date">12:5 pm, 12-06-2001</div>
                <div className="total">
                  <label>total:</label>
                  <b>$47.56</b>
                </div>
              </div>

              <Link
                to="/admin/dashboard/details-order/2/3"
                className="seeToDetails"
              >
                see order details
                <IoIosArrowForward />
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">
                <BiSolidDish />
              </div>

              <div className="card-body">
                <div className="id">
                  <label>order id:</label>
                  <b>#4543543</b>
                  <span className="status">accept</span>
                </div>
                <div className="quantity">2 items</div>
                <div className="date">12:5 pm, 12-06-2001</div>
                <div className="total">
                  <label>total:</label>
                  <b>$47.56</b>
                </div>
              </div>

              <Link
                to="/admin/dashboard/details-order/2/5"
                className="seeToDetails"
              >
                see order details
                <IoIosArrowForward />
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">
                <BiSolidDish />
              </div>

              <div className="card-body">
                <div className="id">
                  <label>order id:</label>
                  <b>#4543543</b>
                  <span className="status">accept</span>
                </div>
                <div className="quantity">2 items</div>
                <div className="date">12:5 pm, 12-06-2001</div>
                <div className="total">
                  <label>total:</label>
                  <b>$47.56</b>
                </div>
              </div>

              <Link
                to="/admin/dashboard/details-order/5/4"
                className="seeToDetails"
              >
                see order details
                <IoIosArrowForward />
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">
                <BiSolidDish />
              </div>

              <div className="card-body">
                <div className="id">
                  <label>order id:</label>
                  <b>#4543543</b>
                  <span className="status">accept</span>
                </div>
                <div className="quantity">2 items</div>
                <div className="date">12:5 pm, 12-06-2001</div>
                <div className="total">
                  <label>total:</label>
                  <b>$47.56</b>
                </div>
              </div>

              <Link
                to="/admin/dashboard/details-order/2/7"
                className="seeToDetails"
              >
                see order details
                <IoIosArrowForward />
              </Link>
            </div>

            <div className="card">
              <div className="card-icon">
                <BiSolidDish />
              </div>

              <div className="card-body">
                <div className="id">
                  <label>order id:</label>
                  <b>#4543543</b>
                  <span className="status">accept</span>
                </div>
                <div className="quantity">2 items</div>
                <div className="date">12:5 pm, 12-06-2001</div>
                <div className="total">
                  <label>total:</label>
                  <b>$47.56</b>
                </div>
              </div>

              <Link
                to="/admin/dashboard/details-order/3/2"
                className="seeToDetails"
              >
                see order details
                <IoIosArrowForward />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
