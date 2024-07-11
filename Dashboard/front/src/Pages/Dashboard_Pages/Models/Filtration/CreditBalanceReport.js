import { IoIosSearch } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

function CreditBalanceReport() {
  return (
    <div
      className="CreditBalanceReport FiltrationModel collapse"
      id="collapseTarget"
    >
      <div className="row pb-4">
        <div className="row mt-3">
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">name</label>
            <input type="text" className="form-control" name="name" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">email</label>
            <input type="email" className="form-control" name="email" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">phone</label>
            <input type="text" className="form-control" name="phone" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">role</label>
            <input type="text" className="form-control" name="role" />
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

export default CreditBalanceReport;
