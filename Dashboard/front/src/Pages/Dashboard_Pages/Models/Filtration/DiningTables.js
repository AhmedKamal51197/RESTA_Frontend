import { IoIosSearch } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

function DiningTables() {
  return (
    <div className="DiningTables FiltrationModel collapse" id="collapseTarget">
      <div className="row pb-4">
        <div className="row mt-3">
          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">number</label>
            <input
              type="text"
              className="form-control"
              name="number"
              id="number"
            />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">size</label>
            <input type="text" className="form-control" name="size" id="size" />
          </div>

          <div className="col col-12 col-md-6 col-lg-3">
            <label className="mb-2">floor</label>
            <input
              type="text"
              className="form-control"
              name="floor"
              id="floor"
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
              <IoIosSearch />
              <span className="ps-2">search</span>
            </button>
            <button type="button" className="btn btn-secondary">
              <HiXMark />
              <span className="ps-2">cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiningTables;
