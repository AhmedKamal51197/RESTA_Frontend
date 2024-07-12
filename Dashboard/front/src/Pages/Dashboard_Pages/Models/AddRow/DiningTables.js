import "../Models.css";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from "../../../../axiosConfig/instance";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../Store/action";

function DiningTables() {
  const dispatch = useDispatch();
  const updated = useSelector((state) => state.updated);

  const [diningTable, setDiningTable] = useState({
    floor: "",
    size: "",
    num: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    floor: "",
    size: "",
    num: "",
    status: "",
  });

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "status") {
      setDiningTable((prevDiningTable) => ({
        ...prevDiningTable,
        status: id === "active" ? 1 : 0,
      }));
    } else {
      setDiningTable({ ...diningTable, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", diningTable.size);
    formData.append("num", diningTable.num);
    formData.append("floor", diningTable.floor);
    formData.append("status", diningTable.status);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .post("/api/admin/dining-tables", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("AdminToken")),
            },
          })
          .then((response) => {
            Swal.fire("Saved!", "The dining table has been saved.", "success");
            dispatch(update(!updated));
            closeModel();
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              setErrors(error.response.data.errors);
              Swal.fire("Error!", "Validation error occurred.", "error");
            } else {
              Swal.fire(
                "Error!",
                "An error occurred while submitting the form.",
                "error"
              );
            }
          });
      }
    });
  };

  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <span>
            {window.location.pathname.replace("/admin/dashboard/", "")}
          </span>
          <div className="closeSidebar">
            <HiXMark onClick={closeModel} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    number <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="num"
                    id="number"
                    value={diningTable.num}
                    onChange={handleChange}
                    required
                  />
                  {errors.num && (
                    <div className="text-danger">{errors.num}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="size" className="form-label">
                    size <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="size"
                    id="size"
                    value={diningTable.size}
                    onChange={handleChange}
                    required
                  />
                  {errors.size && (
                    <div className="text-danger">{errors.size}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="floor" className="form-label">
                    floor <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="floor"
                    id="floor"
                    onChange={handleChange}
                    value={diningTable.floor}
                    required
                  />
                  {errors.floor && (
                    <div className="text-danger">{errors.floor}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        onChange={handleChange}
                        checked={diningTable.status === 1}
                        required
                      />
                      <span>active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        onChange={handleChange}
                        checked={diningTable.status === 0}
                        required
                      />
                      <span>inactive</span>
                    </div>
                  </div>
                </div>
                {errors.status && (
                  <div className="text-danger">{errors.status}</div>
                )}
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

export default DiningTables;
