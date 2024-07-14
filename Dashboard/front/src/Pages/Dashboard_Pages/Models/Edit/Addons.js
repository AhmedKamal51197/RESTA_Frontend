import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";


function EditAddon({ id }) {
  const [categories, setCategories] = useState([]);
  const [addon, setAddon] = useState({
    category_id: "",
    cost: "",
    description: "",
    image: null,
    name: "",
    status: "",
    type: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    type: "",
    category_id: "",
    image: "",
    status: "",
    cost: "",
  });


  useEffect(() => {
    if (id) {
      instance.get(`/api/addons/${id}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
        .then((res) => {
          setAddon(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching extra:", err);
        });
    }
  }, [id]);

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "item_type") {
      setAddon((prevAddon) => ({
        ...prevAddon,
        type: value === "veg" ? "vegetarian" : "non-vegetarian",
      }));
    } else if (name === "status") {
      setAddon((prevAddon) => ({
        ...prevAddon,
        status: value === "active" ? 1 : 0,
      }));
    } else if (name === "image") {
      setAddon((prevAddon) => ({ ...prevAddon, image: e.target.files[0] }));
    } else {
      setAddon((prevAddon) => ({ ...prevAddon, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let url = '/api/admin/addons';
    let method = 'POST';
  
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
  
    if (id) {
      url = `/api/admin/addons/${id}`;
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
        Swal.fire("Updated!", "The addon has been updated.", "success");
      } else {
        Swal.fire("Saved!", "The addon has been saved.", "success");
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
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get('/api/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  if (!addon) {
    return <div>Loading...</div>;
  }
  
  return (
    <div id="EditAddon">
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
                    type="text"
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
                  <label for="image" className="form-label">
                    image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
                  {errors.image && <div className="text-danger">{errors.image}</div>}
                  </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="veg"
                        value="veg"
                        onChange={handleChange}
                        checked={addon.type === "vegetarian"}
                        required
                      />
                      <span>Veg</span>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="non-veg"
                        value="non-veg"
                        onChange={handleChange}
                        checked={addon.type === "non-vegetarian"}
                        required
                      />
                      <span>Non Veg</span>
                    </div>
                  </div>
                  {errors.type && <div className="text-danger">{errors.type}</div>}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="category_id" className="form-label">
                    Category <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="category_id"
                    id={`category_id_${id}`}
                    onChange={handleChange}
                    value={addon.category_id}
                    required
                  >
                    <option value="">Choose...</option>
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
                        checked={addon.status === 1}
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
                        checked={addon.status === 0}
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

export default EditAddon;
