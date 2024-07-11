import "./Profile.css";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

export function ChangePassword() {
  return (
    <div className="ChangePassword">
      <Breadcrumb />
      <div className="formModal bg-white">
        <div className="title">change password</div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="old_password" className="form-label">
                OLD PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="old_password"
                id="old_password"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="new_password" className="form-label">
                NEW PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="new_password"
                id="new_password"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div>
              <label for="password_confirmation" className="form-label">
                PASSWORD CONFIRMATION <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                id="password_confirmation"
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
