import "../Models.css";
import React, { useState } from "react";

import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { update } from "../../../../Store/action";

export default function Administrators() {

  const dispatch = useDispatch();
  const updated = useSelector((state) => state.updated);
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: "",
    role:"admin"
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: "",
  });

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "status") {
      setAdmin(prevAdmin => ({
        ...prevAdmin,
        status: id === "active" ? 1 : 0
      }));
    } else {
      setAdmin({ ...admin, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", admin.name);
    formData.append("email", admin.email);
    formData.append("phone", admin.phone);
    formData.append("password", admin.password);
    formData.append("password_confirmation", admin.password_confirmation);
    formData.append("Role", admin.role);
    formData.append("status", admin.status);
    formData.append("identity_card", "172001");

    
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
        
        instance.post('/api/admin/employees', formData, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")), //the token is a variable which holds the token
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          Swal.fire("Saved!", "The admin has been saved.", "success");
          dispatch(update(!updated));
          closeModel();       
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            console.log("Validation error:", error.response.data.errors);
            setErrors(error.response.data.errors);
            Swal.fire("Error!", "Validation error occurred.", "error");
          } else {
            console.error("Error submitting form:", error);
            Swal.fire("Error!", "An error occurred while submitting the form.", "error");
          }
        });
      }
    });
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
          <form onSubmit={handleSubmit}>
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
                    value={admin.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="email" className="form-label">
                    email <span className="star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={admin.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="phone" className="form-label">
                    phone <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={admin.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
                        checked={admin.status === 1}
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
                        checked={admin.status === 0}
                        required 
                      />
                      <span>in active</span>
                    </div>
                  </div>
                  {errors.status && <div className="text-danger">{errors.status}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="password" className="form-label">
                    password <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    id="password"
                    value={admin.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="password_confirmation" className="form-label">
                    password confirm<span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirm"
                    value={admin.password_confirm}
                    onChange={handleChange}
                    required
                  />
                  {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
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
