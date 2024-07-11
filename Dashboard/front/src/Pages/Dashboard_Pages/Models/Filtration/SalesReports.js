import { IoIosSearch } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

function SalesReports() {
  return (
    <div className="SalesReports FiltrationModel collapse" id="collapseTarget">
      <div className="row pb-4">
        <div className="row mt-3">
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">order id</label>
            <input type="text" className="form-control" name="order_id" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">status</label>
            <select className="form-control" name="status">
              <option value="-1" selected disabled>
                --
              </option>
              <option value="1">Pending</option>
              <option value="2">Accept</option>
              <option value="3">Processing</option>
              <option value="4">Out For Delivery</option>
              <option value="5">Delivered</option>
              <option value="6">Canceled</option>
              <option value="7">Rejected</option>
              <option value="8">Returned</option>
            </select>
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">date</label>
            <input type="date" className="form-control" name="date" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">paid status</label>
            <select className="form-control" name="paid_status">
              <option value="-1" selected disabled>
                --
              </option>
              <option value="1">paid</option>
              <option value="0">unPaid</option>
            </select>
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">payment type</label>
            <input type="text" className="form-control" name="payment_type" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">source</label>
            <select className="form-control" name="source">
              <option value="-1" selected disabled>
                --
              </option>
              <option value="1">web</option>
              <option value="2">app</option>
              <option value="3">pos</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col col-3 d-flex gap-3">
            <button type="search" className="btn btn-primary">
              <IoIosSearch />
              <span className="ps-2">search</span>
            </button>
            <button type="clear" className="btn btn-secondary">
              <HiXMark />
              <span className="ps-2">clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReports;
