import { IoIosSearch } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

function TablesOrders() {
  return (
    <div className="TablesOrders FiltrationModel collapse" id="collapseTarget">
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
              <option value="1">accept</option>
              <option value="2">processing</option>
              <option value="3">delivery</option>
            </select>
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">customer</label>
            <input type="text" className="form-control" name="customer" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">data</label>
            <input type="date" className="form-control" name="data" />
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

export default TablesOrders;
