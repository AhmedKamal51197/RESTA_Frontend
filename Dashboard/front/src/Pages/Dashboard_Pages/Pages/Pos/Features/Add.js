import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function Add() {
  return (
    <div
      className="modal fade"
      id="addPosCustomer"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <form className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addPosCustomerLabel">
              customers
            </h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label for="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label for="email" className="form-label">
                    email <span className="star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label for="phone" className="form-label">
                    phone <span className="star">*</span>
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

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    STATUS <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input type="radio" name="status" required />
                      <span>active</span>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input type="radio" name="status" required />
                      <span>inactive</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label for="password" className="form-label">
                    password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label for="password_confirmation" className="form-label">
                    password confirmation
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
          </div>

          <div className="modal-footer btnModels">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <HiXMark />
              <span className="ps-2">close</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
