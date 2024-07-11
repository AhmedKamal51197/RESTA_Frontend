import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux'
import { update } from "../../../../Store/action";



function Extras() {
  const [categories, setCategories] = useState([]);
  const dispatch=useDispatch()
  const updated=useSelector((state) => state.updated);
  const [extra, setExtra] = useState({
    name: "",
    description: "",
    type: "",
    category_id: "",
    image: "",
    status: "",
    cost:"",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    descriptionError: "",
    typeError: "",
    category_idError: "",
    imageError: "",
    statusError: "",
  });

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "item_type") {
      setExtra(prevExtra => ({
        ...prevExtra,
        type: id === "veg" ? "vegetarian" : "non-vegetarian"
      }));
    } else if (name === "status") {
      setExtra(prevExtra => ({
        ...prevExtra,
        status: id === "active" ? 1 : 0
      }));
    } else if (name === "image") {
      setExtra({ ...extra, image: e.target.files[0] });
    } else {
      setExtra({ ...extra, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
        instance.post('/api/admin/extras', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
          }
        },
      dispatch(update(!updated))
    )
        .then((response) => {
          Swal.fire("Saved!", "The extra has been saved.", "success");
          // handle success (e.g., show a success message, close the modal, etc.)
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            // console.log("Validation error:", error.response.data.errors);
            setErrors(error.response.data.errors);
            Swal.fire("Error!", "Validation error occurred.", "error");
          } else {
            // console.error("Error submitting form:", error);
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
        // console.error('Error fetching categories:', error);
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
            <HiXMark onClick={closeModel} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={extra.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    price <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="cost"
                    id="cost"
                    value={extra.cost}
                    onChange={handleChange}
                    required
                  />
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
                        checked={extra.type === "vegetarian"}
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
                        checked={extra.type === "non-vegetarian"}            
                        required
                      />
                      <span>non veg</span>
                    </div>
                  </div>
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
                    value={extra.category_id}
                    required
                  >
                    <option value="-1">choose</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={extra.description}
                    onChange={handleChange}
                    required
                  />
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
                        checked={extra.status === 1}
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
                        checked={extra.status === 0}
                        required 
                      />
                      <span>in active</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
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

export default Extras;
