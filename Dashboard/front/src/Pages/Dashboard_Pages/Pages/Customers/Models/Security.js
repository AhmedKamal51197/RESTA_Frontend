import "../Models.css";
import { FaCircleCheck } from "react-icons/fa6";

export default function Security() {
  return (
    <div className="Security">
      <div className="content">
        <div className="head">
          <div>security</div>
        </div>
        <form className="row">
          <div className="col col-12 col-md-6 mb-3">
            <label for="password">
              password <span className="star">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
            />
          </div>

          <div className="col col-12 col-md-6 mb-3">
            <label for="password_confirmation">
              password confirmation <span className="star">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              id="password_confirmation"
            />
          </div>

          <div className="col col-12 col-md-6">
            <button type="submit" className="btn btn-primary">
              <FaCircleCheck />
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
