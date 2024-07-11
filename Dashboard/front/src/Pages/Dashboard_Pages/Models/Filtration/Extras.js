import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

function Extras() {
  return (
    <div className="Extras FiltrationModel collapse" id="collapseTarget">
      <div className="row pb-4">
        <div className="row mt-3">
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">name</label>
            <input type="text" className="form-control" name="name" id="name" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
            />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">status</label>
            <select className="form-control" name="status">
              <option value="-1" selected disabled>
                --
              </option>
              <option value="1">active</option>
              <option value="0">in active</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col col-3 d-flex gap-3">
            <button type="search" className="btn btn-primary">
              <FaCheckCircle />
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

export default Extras;
