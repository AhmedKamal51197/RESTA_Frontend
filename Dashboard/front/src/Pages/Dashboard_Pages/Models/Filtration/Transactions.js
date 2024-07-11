import { IoIosSearch } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

function Transactions() {
  return (
    <div className="Transactions FiltrationModel collapse" id="collapseTarget">
      <div className="row pb-4">
        <div className="row mt-3">
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">transaction id</label>
            <input type="text" className="form-control" name="transaction_id" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">order serial</label>
            <input type="text" className="form-control" name="order_serial" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">payment method</label>
            <input type="text" className="form-control" name="payment_method" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">date</label>
            <input type="date" className="form-control" name="date" />
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

export default Transactions;
