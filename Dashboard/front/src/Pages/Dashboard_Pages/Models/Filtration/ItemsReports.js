import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

function ItemsReports() {
  return (
    <div className="ItemsReports FiltrationModel collapse" id="collapseTarget">
      <div className="row pb-4">
        <div className="row mt-3">
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">category</label>
            <input type="text" className="form-control" name="category" />
          </div>
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">type</label>
            <select className="form-control" name="type">
              <option value="-1" selected disabled>
                --
              </option>
              <option value="1">veg</option>
              <option value="2">non veg</option>
            </select>
          </div>
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">name</label>
            <input type="text" className="form-control" name="name" />
          </div>
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">date</label>
            <input type="date" className="form-control" name="date" />
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
export default ItemsReports;
