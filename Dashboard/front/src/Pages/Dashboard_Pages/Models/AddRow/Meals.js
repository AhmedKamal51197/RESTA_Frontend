import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import { IoAddCircleSharp } from "react-icons/io5";
import instance from '../../../../axiosConfig/instance';

export default function Meals() {
  const [categories, setCategories] = useState([]);
  const [meal, setMeal] = useState({
    id: "",
    name: "",
    description: "",
    type: "",
    category_name: "",
    category_id: "",
    image: "",
    status: "",
    meal_size_costs: [],
  });
 
  const [errors, setErrors] = useState({
    idError: "",
    nameError: "",
    descriptionError: "",
    typeError: "",
    category_nameError: "",
    category_idError: "",
    imageError: "",
    statusError: "",
    meal_size_costsError: [],
  });

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  let maxMum = 0;
  const createPattern = () => {
    if (maxMum < 4) {
      let containerPattern = document.getElementById("containerPattern");

      var group = document.createElement("div");
      group.className = "row group";

      var xMark = document.createElement("div");
      xMark.className = "removeGroup";
      xMark.innerHTML = `<span>✕</span>`;

      xMark.onclick = () => {
        containerPattern.removeChild(group);
        maxMum--;
        if (maxMum < 4) {
          document.querySelector(".errorMaxMan").innerHTML = "";
        } else {
          document.querySelector(".errorMaxMan").innerHTML =
            "maxmam only 4 groups";
        }
      };

      group.appendChild(xMark);

      pattern(group, "price", "Price");
      pattern(group, "size", "Size");
      pattern(group, "number", "Number of pieces");

      containerPattern.appendChild(group);
    } else {
      document.querySelector(".errorMaxMan").innerHTML = "maxmam only 4 groups";
      return;
    }
    maxMum++;
  };

  const pattern = (group, column, label) => {
    var parent = document.createElement("div");

    if (column == "number") {
      parent.className = "col col-12";
    } else {
      parent.className = "col col-6";
    }

    var child = document.createElement("div");
    child.className = "mb-3";

    var labelTag = document.createElement("label");
    labelTag.className = "form-label";
    labelTag.setAttribute("for", column);
    labelTag.innerHTML = label;

    var spanTag = document.createElement("span");
    spanTag.className = "star";
    spanTag.innerHTML = "*";

    labelTag.appendChild(spanTag);
    child.appendChild(labelTag);

    if (column == "size") {
      var selectTag = document.createElement("select");
      const sizes = ["--", "small", "medium", "big", "family"];
      selectTag.className = "form-control";
      selectTag.setAttribute("name", column);
      selectTag.setAttribute("id", column);

      sizes.forEach((option, index) => {
        var optionTag = document.createElement("option");
        optionTag.setAttribute("value", index);
        optionTag.innerHTML = option;
        selectTag.appendChild(optionTag);

        child.appendChild(selectTag);
      });
    } else {
      var inputTag = document.createElement("input");
      inputTag.type = "text";
      inputTag.className = "form-control";
      inputTag.setAttribute("name", column);
      inputTag.setAttribute("id", column);

      child.appendChild(inputTag);
    }

    parent.appendChild(child);
    group.appendChild(parent);
  };

  useEffect(() =>{
    const fetchCategories = async () => {
      try {
        const response = await instance.get('api/categories');
        console.log(response.data)
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const handleChange = (evt) => {
    const { name, value, id } = evt.target;
    if (name === "item_type") {
      setMeal(prevMeal => ({
        ...prevMeal,
        type: id === "veg" ? "vegetarian" : "non-vegetarian"
      }));
    }
    if (name === "status") {
      setMeal(prevMeal => ({
        ...prevMeal,
        status: id === "active" ? 1 : 0
      }));
    }
  }

  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>
          <div className="closeSidebar">
            <FaXmark onClick={closeModel} />
          </div>
        </div>

        <div className="newColumn">
          <button
            type="button"
            className="addNewColumn"
            onClick={() => createPattern()}
          >
            <IoAddCircleSharp />
            <span className="ps-2">add column</span>
          </button>
          <label className="errorMaxMan"></label>
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={meal.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="category" className="form-label">
                    category <span className="star">*</span>
                  </label>
                   <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    onChange={handleChange}
                    value={meal.category_id}
                    required
                  >
                    <option value="-1" selected disabled>choose</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row" id="containerPattern"></div>

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
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={meal.image}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="item_type" className="form-label">
                    type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="item_type"
                        id="veg"
                        onChange={handleChange}
                        checked={meal.type === "vegetarian"}
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
                        checked={meal.type === "non-vegetarian"}            
                        required
                      />
                      <span>non veg</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label for="description" className="form-label">
                    description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={meal.description}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label for="status" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input type="radio" 
                      name="status" 
                      id="active" 
                      onChange={handleChange}
                        checked={meal.status === 1}
                      required 
                      />
                      <span>active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input type="radio" 
                      name="status" 
                      id="inactive" 
                      onChange={handleChange}
                      checked={meal.status === 0}
                      required 
                      />
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
