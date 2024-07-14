import "../Models.css";
import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";

function EditExtra({ id }) {
  const [categories, setCategories] = useState([]);
  const [extra, setExtra] = useState({
    category_id: "",
    cost: "",
    description: "",
    image: "",
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
      instance.get(`/api/extras/${id}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
        .then((res) => {
          setExtra(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching extra:", err);
        });
    }
  }, [id]);

  const closeModel = () => {
    const AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "item_type") {
      setExtra((prevExtra) => ({
        ...prevExtra,
        type: value === "veg" ? "vegetarian" : "non-vegetarian",
      }));
    } else if (name === "status") {
      setExtra((prevExtra) => ({
        ...prevExtra,
        status: value === "active" ? 1 : 0,
      }));
    } else if (name === "image") {
      setExtra((prevExtra) => ({ ...prevExtra, image: e.target.files[0] }));
    } else {
      setExtra((prevExtra) => ({ ...prevExtra, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let url = '/api/admin/extras';
    let method = 'POST'; // Default to POST for new entries
  
    const formData = new FormData();
    formData.append("name", extra.name);
    formData.append("description", extra.description);
    formData.append("type", extra.type);
    formData.append("cost", extra.cost);
    formData.append("category_id", extra.category_id);
    formData.append("status", extra.status);
    if (extra.image) {
      formData.append("image", extra.image);
    }
  
    if (id) {
      url = `/api/admin/extras/${id}`;
      method = 'POST'; // Correct to 'PUT' for update
      formData.append("_method", "PUT"); // Simulate PUT request using POST
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

  if (!extra) {
    return <div>Loading...</div>;
  }

  return (
    <div id="EditExtra">
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>
          <div className="closeSidebar">
            <HiXMark onClick={closeModel} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id={`name_${id}`}
                    value={extra.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="cost" className="form-label">
                    Price <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    id={`cost_${id}`}
                    value={extra.cost}
                    onChange={handleChange}
                    required
                  />
                  {errors.cost && <div className="text-danger">{errors.cost}</div>}
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
                        checked={extra.type === "vegetarian"}
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
                        checked={extra.type === "non-vegetarian"}
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
                    value={extra.category_id}
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
                  <label htmlFor="description" className="form-label">
                    Description <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id={`description_${id}`}
                    value={extra.description}
                    onChange={handleChange}
                    required
                  />
                  {errors.description && <div className="text-danger">{errors.description}</div>}
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
                        checked={extra.status === 1}
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
                        checked={extra.status === 0}
                        required
                      />
                      <span>Inactive</span>
                    </div>
                  </div>
                  {errors.status && <div className="text-danger">{errors.status}</div>}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id={`image_${id}`}
                    onChange={handleChange}
                  />
                  {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditExtra;
