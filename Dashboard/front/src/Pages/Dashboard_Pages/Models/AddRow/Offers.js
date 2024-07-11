import "../Models.css";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

function Offers() {
  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>

          <div className="closeSidebar">
            <FaXmark onClick={closeModel} />
          </div>
        </div>
        <div className="modal-content">
          <form>
            <div className="row">
              <div className="col-6">
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

              <div className="col-6">
                <div className="mb-3">
                  <label for="discount_percentage" className="form-label">
                    discount percentage <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount_percentage"
                    id="discount_percentage"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="start_date" className="form-label">
                    start date <span className="star">*</span>
                  </label>
                  <input
                    type="data"
                    className="form-control"
                    name="start_date"
                    id="start_date"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="end_date" className="form-label">
                    end date <span className="star">*</span>
                  </label>
                  <input
                    type="data"
                    className="form-control"
                    name="end_date"
                    id="end_date"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="image" className="form-label">
                    image (548px,140px) <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="status" className="form-label">
                    status
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input type="radio" name="status" id="status" required />
                      <span>active</span>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input type="radio" name="status" id="status" required />
                      <span>in active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModel}
                >
                  <HiXMark />
                  <span className="ps-2">close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Offers;
