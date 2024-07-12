import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import instance from '../../../../axiosConfig/instance';


function EditDiningTables({ id }) {

  const [diningTable, setDiningTable] = useState({
    num: "",
    size: "",
    floor: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    num: "",
    size: "",
    floor: "",
    status: "",
  });

  const closeModel = ({ id }) => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  useEffect(() => {
    if (id) {
      instance.get(`/api/dining-tables/${id}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
        .then((res) => {
          setDiningTable(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching  Dining Table:", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

   if (name === "status") {
      setDiningTable((prevDiningTable) => ({
        ...prevDiningTable,
        status: value === "active" ? 1 : 0,
      }));
    }else {
      setDiningTable((prevDiningTable) => ({ ...prevDiningTable, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let url = '/api/admin/extras';
    let method = 'POST'; // Default to POST for new entries
  
    const formData = new FormData();
    formData.append("num", diningTable.num);
    formData.append("size", diningTable.size);
    formData.append("floor", diningTable.floor);
    formData.append("status", diningTable.status);
    
  
    if (id) {
      url = `/api/admin/dining-tables/${id}`;
      method = 'POST'; 
      formData.append("_method", "PUT"); 
    }
  
    try {
      const response = await instance({
        url,
        method,
        data: formData,
      
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
        }
      });
  
      if (id) {
        Swal.fire("Updated!", "The extra has been updated.", "success");
      } else {
        Swal.fire("Saved!", "The extra has been saved.", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire("Error!", "An error occurred while submitting the form.", "error");
      }
    }
  };

  if (!diningTable) {
    return <div>Loading...</div>;
  }

  return (
    <div id="EditTable">
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
        <form onSubmit={handleSubmit}>
        <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label for="number" className="form-label">
                    number <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="num"
                    id="number"
                    value={diningTable.num}
                    onChange={handleChange}
                    required
                  />
                  {errors.num && <div className="text-danger">{errors.num}</div>}
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
                    value={diningTable.size}
                    onChange={handleChange}
                    required
                  />
                {errors.size && <div className="text-danger">{errors.size}</div>}

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
                    value={diningTable.floor}
                    onChange={handleChange}
                    required
                  />
                  {errors.floor && <div className="text-danger">{errors.floor}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        value="active"
                        onChange={handleChange}
                        checked={diningTable.status === 1}
                        required
                      />
                      <span>Active</span>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        value="inactive"
                        onChange={handleChange}
                        checked={diningTable.status === 0}
                        required
                      />
                      <span>Inactive</span>
                    </div>
                  </div>
                  {errors.status && <div className="text-danger">{errors.status}</div>}
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

export default EditDiningTables;
