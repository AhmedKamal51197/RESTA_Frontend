import "./Profile.css";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

export function ChangeEmail() {
  return (
    <div className="ChangeEmail">
      <Breadcrumb />
      <div className="formModal bg-white">
        <div className="title">change email</div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="old_email" className="form-label">
                OLD EMAIL
              </label>
              <input
                type="email"
                className="form-control email"
                name="old_email"
                id="old_email"
                disabled
                value="email@example.com"
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="new_email" className="form-label">
                NEW EMAIL <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="new_email"
                id="new_email"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="password" className="form-label">
                PASSWORD <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="password"
                id="password"
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
