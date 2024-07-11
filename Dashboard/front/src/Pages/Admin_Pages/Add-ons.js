import axios from "axios";
import { useEffect, useState } from "react";

export default function Add_ons() {
  const [data, setData] = useState([]);
  const [addon, setAddon] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    cost: 0,
    status: [],
    img: null,
  });
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked
        ? [...prevFormData[name], event.target.value]
        : prevFormData[name].filter((value) => value !== event.target.value),
    }));
  };
  useEffect(() => {
    const getAddons = async () => {
      try {
        const addons = await axios.get("http://127.0.0.1:8000/api/addons");
        setData(addons.data.data);
      } catch (error) {}
    };
    getAddons();
  }, []);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Access-token")}`;

  const getAddonById = async (id) => {
    try {
      const addon = await axios.get(`http://127.0.0.1:8000/api/addons/${id}`);
      setAddon(addon.data.data);
      console.log(addon.data.data);
    } catch (error) {}
  };
  const saveData = async (item, e) => {
    e.preventDefault();
    console.log(item);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "status") {
          value.forEach((option) => formDataToSend.append(key, option));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const response = await axios.put(
        `http://127.0.0.1:8000/api/addons/${item.id}`,
        formDataToSend
      );
      // Save in database
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="db-pg">
        <h4 className="p-2"> Dashboard / Meals Add-ons</h4>

        <div style={{ background: "#ffffff" }}>
          <div className="table p-2">
            <div className="d-flex justify-content-between">
              <div>
                <h5>Dining Add-Ons</h5>
              </div>

              <div>
                {/* buttons */}
                <button
                  class="btn btn-primary rounded"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#Add-ons-offcanvas"
                  aria-controls="Add-ons-offcanvas"
                >
                  <i class="fa-solid fa-plus"></i> Add Item
                </button>

                <div
                  class="offcanvas offcanvas-end"
                  tabindex="-1"
                  id="Add-ons-offcanvas"
                  aria-labelledby="Add-ons-offcanvasLabel"
                >
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="Add-ons-offcanvasLabel">
                      Add new Item
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body">
                    <form>
                      <div className="d-flex">
                        <div class="mb-3">
                          <label for="name" class="form-label">
                            Name <sapan className="text-danger">*</sapan>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="cost" class="form-label ml-2">
                            Cost <sapan className="text-danger">*</sapan>
                          </label>
                          <input
                            type="number"
                            class="form-control ml-2"
                            id="cost"
                            required
                          />
                        </div>
                      </div>
                      <label for="status" class="form-label ml-2">
                        Status <sapan className="text-danger">*</sapan>
                      </label>
                      <div className="d-flex ">
                        <div className="form-check pb-3 pr-5">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="active"
                            checked
                          />
                          <label className="form-check-label" for="active">
                            Active
                          </label>
                        </div>
                        <div className="form-check pb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="inactive"
                          />
                          <label className="form-check-label" for="inactive">
                            Inactive
                          </label>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="desc" class="form-label">
                          Description <sapan className="text-danger">*</sapan>
                        </label>
                        <input
                          type="text-area"
                          class="form-control"
                          id="desc"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={(e) => saveData(e)}
                      >
                        <i class="fa-regular fa-circle-check"></i> Save
                      </button>{" "}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <td scope="col" className=" text-secondary">
                    Name
                  </td>
                  <td scope="col" className=" text-secondary">
                    Cost
                  </td>
                  <td scope="col" className=" text-secondary">
                    Status
                  </td>
                  <td scope="col" className=" text-secondary">
                    Image
                  </td>
                  <td scope="col" className=" text-secondary">
                    Description
                  </td>

                  <td scope="col" className=" text-secondary">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.cost}</td>
                    {item.status === 0 ? <td>Inactive</td> : <td>Active</td>}
                    <td>
                      <img
                        src={`http://127.0.0.1:8000/storage/${item.image}`}
                        width={50}
                        height={50}
                      ></img>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <button className="btn btn-danger">
                          <i class="fa-solid fa-trash"></i>
                        </button>

                        {/* offCnvas */}
                        <button
                          class="btn btn-primary"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          onClick={() => getAddonById(item.id)}
                        >
                          <i class="fa-regular fa-pen-to-square"></i>
                        </button>

                        <div
                          class="offcanvas offcanvas-end"
                          tabindex="-1"
                          id="offcanvasRight"
                          aria-labelledby="offcanvasRightLabel"
                        >
                          <div class="offcanvas-header">
                            <h5
                              class="offcanvas-title"
                              id="offcanvasRightLabel"
                            >
                              Add new Item
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="offcanvas-body">
                            <form>
                              <div className="d-flex">
                                <div class="mb-3">
                                  <label for="name" class="form-label">
                                    Name{" "}
                                    <sapan className="text-danger">*</sapan>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    required
                                    value={addon.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div class="mb-3">
                                  <label for="cost" class="form-label ml-2">
                                    Cost{" "}
                                    <sapan className="text-danger">*</sapan>
                                  </label>
                                  <input
                                    type="number"
                                    class="form-control ml-2"
                                    id="cost"
                                    required
                                    value={addon.cost}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <label for="status" class="form-label ml-2">
                                Status <sapan className="text-danger">*</sapan>
                              </label>
                              <div className="d-flex ">
                                <div className="form-check pb-3 pr-5">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    id="active"
                                    onChange={handleCheckboxChange}
                                    value="active"
                                    checked={formData.status.includes("active")}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="active"
                                  >
                                    Active
                                  </label>
                                </div>
                                <div className="form-check pb-3">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    id="inactive"
                                    onChange={handleCheckboxChange}
                                    value="inactive"
                                    checked={formData.status.includes(
                                      "inactive"
                                    )}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="inactive"
                                  >
                                    Inactive
                                  </label>
                                </div>
                              </div>
                              <div class="mb-3">
                                <label for="img" class="form-label">
                                  Default file input example
                                </label>
                                <input
                                  class="form-control"
                                  type="file"
                                  id="img"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <button
                                type="submit"
                                class="btn btn-primary"
                                onClick={(e) => saveData(item, e)}
                              >
                                <i class="fa-regular fa-circle-check"></i> Save
                              </button>{" "}
                            </form>
                          </div>
                        </div>
                        {/* offCnvas */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
