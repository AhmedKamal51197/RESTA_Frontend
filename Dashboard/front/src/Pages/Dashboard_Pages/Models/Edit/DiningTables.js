import "../Models.css";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

function DiningTables() {
  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <span>
            {window.location.pathname.replace("/admin/dashboard/", "")}
          </span>

          <div className="closeSidebar">
            <FaXmark onClick={closeModel} />
          </div>
        </div>
        <div className="modal-content">
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label for="number" className="form-label">
                    number <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="number"
                    id="number"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="size" className="form-label">
                    size <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="size"
                    id="size"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="floor" className="form-label">
                    floor <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="floor"
                    id="floor"
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="status" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input type="radio" name="status" id="status" required />
                      <span>active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input type="radio" name="status" id="status" required />
                      <span>in active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="search" className="btn btn-primary">
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

export default DiningTables;
