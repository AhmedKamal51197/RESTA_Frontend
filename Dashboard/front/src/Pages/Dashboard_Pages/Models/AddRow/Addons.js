import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { update } from "../../../../Store/action";

function Addons() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const updated = useSelector((state) => state.updated);
  const [addon, setAddon] = useState({
    name: "",
    description: "",
    type: "",
    category_id: "",
    image: "",
    status: "",
    cost:"",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    type: "",
    category_id: "",
    image: "",
    status: "",
    cost: ""
  });

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "item_type") {
      setAddon(prevِِAddon => ({
        ...prevِِAddon,
        type: id === "veg" ? "vegetarian" : "non-vegetarian"
      }));
    } else if (name === "status") {
      setAddon(prevExtra => ({
        ...prevExtra,
        status: id === "active" ? 1 : 0
      }));
    } else if (name === "image") {
      setAddon({ ...addon, image: e.target.files[0] });
    } else {
      setAddon({ ...addon, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", addon.name);
    formData.append("description", addon.description);
    formData.append("type", addon.type);
    formData.append("cost", addon.cost);
    formData.append("category_id", addon.category_id);
    formData.append("status", addon.status);
    if (addon.image) {
      formData.append("image", addon.image);
    }
  
  
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
        
        instance.post('/api/admin/addons', formData, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")), //the token is a variable which holds the token
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          Swal.fire("Saved!", "The addons has been saved.", "success");
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
  
  
  useEffect(() =>{
    const fetchCategories = async () => {
      try {
        const response = await instance.get('api/categories');
        // console.log(response.data)
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
                    value={addon.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="price" className="form-label">
                    price <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="cost"
                    id="cost" 
                    value={addon.cost}
                    onChange={handleChange}
                    required
                  />
                  {errors.cost && <div className="text-danger">{errors.cost}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="description" className="form-label">
                    description <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={addon.description}
                    onChange={handleChange}
                    required
                  />
                  {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    category <span className="star">*</span>
                  </label>
                   <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    onChange={handleChange}
                    value={addon.category_id}
                    required
                  >
                    <option value="-1"selected  disabled>choose</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <div className="text-danger">{errors.category_id}</div>}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label for="image" className="form-label">
                    image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={handleChange}
                    required
                  />
                  {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="item_type" className="form-label">
                    type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="veg"
                        onChange={handleChange}
                        checked={addon.type === "vegetarian"}
                        required
                      />
                      <span>veg</span>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="non-veg"
                        onChange={handleChange}
                        checked={addon.type === "non-vegetarian"}            
                        required
                      />
                      <span>non veg</span>
                    </div>
                  </div>
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
                        checked={addon.status === 1}
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
                        checked={addon.status === 0}
                        required 
                      />
                      <span>in active</span>
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

export default Addons;
