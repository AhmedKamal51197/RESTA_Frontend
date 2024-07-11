import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

export function EditProfile() {
  return (
    <div className="EditProfile">
      <Breadcrumb />
      <div className="formModal bg-white">
        <div className="title">change email</div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="first_name" className="form-label">
                FIRST NAME <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="first_name"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label for="last_name" className="form-label">
                LAST NAME <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="last_name"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div>
              <label for="phone" className="form-label">
                PHONE <span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
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
