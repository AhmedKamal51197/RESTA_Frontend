import "../Models.css";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { update } from "../../../../Store/action";


function Employees() {

  const dispatch = useDispatch();
  const updated = useSelector((state) => state.updated);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: "",
    role:"",
    identity_card:""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: "",
    role:"",
    identity_card:""
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "status") {
      setEmployee(prevEmployee => ({
        ...prevEmployee,
        status: id === "active" ? 1 : 0
      }));
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("password", employee.password);
    formData.append("password_confirmation", employee.password_confirmation);
    formData.append("Role", employee.role);
    formData.append("status", employee.status);
    formData.append("identity_card", employee.identity_card);

    
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
          Swal.fire("Saved!", "The employee has been saved.", "success");
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
                    value={employee.name}
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
                    value={employee.email}
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
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                  </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="Identity_card" className="form-label">
                  Identity card <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="identity_card"
                    id="Identity_card"
                    value={employee.identity_card}
                    onChange={handleChange}
                    required
                  />
                  {errors.identity_card && <div className="text-danger">{errors.identity_card}</div>}
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
                    value={employee.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="password_confirmation" className="form-label">
                    password confirmation <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirm"
                    value={employee.password_confirm}
                    onChange={handleChange}
                    required
                  />
                  {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="role">Role</label>
                  <select
                    name="role"
                    id="role"
                    value={employee.role}
                    onChange={handleChange}
                    required
                    className={errors.role ? "form-control is-invalid" : "form-control"}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="chef">Chef</option>
                    <option value="cashier">Cashier</option>
                  </select>
                  {errors.role && <div className="text-danger">{errors.role}</div>}
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
                        checked={employee.status === 1}
                        required 
                      />
                      <label for="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        id="inactive" 
                        onChange={handleChange}
                        checked={employee.status === 0}
                        required 
                      />
                      <label for="inactive">inactive</label>
                    </div>
                  </div>
                  {errors.status && <div className="text-danger">{errors.status}</div>}
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

export default Employees;
