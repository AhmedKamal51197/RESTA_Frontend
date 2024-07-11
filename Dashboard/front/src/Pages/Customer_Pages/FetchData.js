import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseItemBCart,
  increaseItemBCart,
  zeroQuant,
} from "../../Store/action";
import "./Fetchdata.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FilterCard } from "../../Components/Customer/FilterCard";
import { CartCard } from "../../Components/Customer/CartCard";
import pizza from "../../Images/pizza.jpg";
import burger from "../../Images/burger.webp";
import all_cat from "../../Images/all.jpg";
import { SizeCard } from "../../Components/Customer/SizeCard";
import { AddonsExtra } from "../../Components/Customer/AddonsExtra";
import ReactPaginate from "react-paginate";

const FetchData = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [CartFormData, setCartFormData] = useState({
    item: "",
    addons: [],
    size: [],
    extras: [],
  });
  const [addons, setAddons] = useState([]);

  const [all, setAll] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const searchQ = useSelector((state) => state.searchStatement);
  const itemQuant = useSelector((state) => state.itemQuant);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const dispatch = useDispatch();
  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    console.log(currentPage);
    handleFetch();
  };
  const handleCheckboxChange = (size, e) => {
    console.log(e);
    const { name, checked } = e.target;
    setCartFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked
        ? [...prevFormData[name], size]
        : prevFormData[name].filter((value) => value !== e.target.value),
    }));
  };
  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/meals?page=${currentPage}`
      );
      setData(response.data.data);
    } catch {}
  };

  function increaseItems(item) {
    dispatch(increaseItemBCart(item));
    console.log(item.quant);
  }
  function decreaseItems(item) {
    dispatch(decreaseItemBCart(item.id));
  }

  function changeSize(size) {
    console.log(size);
  }
  useEffect(() => {
    const getCategories = async () => {
      try {
        const cats = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(cats.data.data);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/meals");
        console.log(response);
        const addons = await axios.get("http://127.0.0.1:8000/api/addons");

        setData([...response.data.data, ...addons.data.data]);

        setAll(data);
        console.log(all);
        setisLoaded(true);
        setLoading(false);
        setPageCount(response.data.pagination.last_page);
        console.log(response.data.pagination.last_page);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleCategoryFilter = async (catId) => {
    if (catId === "all") {
      setFilter("all");

      setData(all);
    } else if (catId === "add-ons") {
      try {
        const addons = await axios.get(`http://127.0.0.1:8000/api/addons`);
        setData(addons.data.data);
        setPageCount(addons.data.pagination.last_page);

        setFilter("addons");
      } catch (error) {}
    } else {
      try {
        const catResponse = await axios.get(
          `http://127.0.0.1:8000/api/categories/${catId}/meals`
        );
        setData(catResponse.data.data);
        setFilter("category");
        setPageCount(catResponse.data.pagination.last_page);
      } catch (error) {}
    }
  };

  const handleAddToCart = (pokemon, itemQuant) => {
    dispatch(addToCart([pokemon, itemQuant]));
    CartFormData.addons.map((item) =>
      // console.log(item)
      dispatch(addToCart([item, 1]))
    );

    dispatch(zeroQuant());
    console.log(CartFormData);
  };

  const handleCancel = () => {
    dispatch(zeroQuant());
  };

  const filteredData = data.filter((pokemon) => {
    if (searchQ === "") {
      if (filter === "vegetarian") {
        console.log("vege");
        return pokemon.type === "vegetarian";
      } else if (filter === "non-vegetarian")
        return pokemon.type === "non-vegetarian";
      else return data;
    } else {
      console.log(searchQ);
      return pokemon.name.toLowerCase().includes(searchQ.toLowerCase());
    }
    return true;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className=" d-flex justify-content-around scrollmenu">
        <FilterCard
          title="Meals"
          img={all_cat}
          filterr={() => handleCategoryFilter("all")}
        />
        {categories.map((category) => (
          <FilterCard
            title={category.name}
            img={category.image}
            filterr={() => handleCategoryFilter(category.id)}
          />
        ))}
        <FilterCard
          title="Add-ons"
          img={all_cat}
          filterr={() => handleCategoryFilter("add-ons")}
        />
      </div>

      <div className="button-container d-flex justify-content-between align-items-center">
        <div>
          <button
            className={`custom-button ${
              filter === "non-vegetarian" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("non-vegetarian")}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrk0mSA8x2ISlFZ0mOjQS8XclNQ5U3ixbGv0F7dpC0A&s"
              style={{
                marginRight: "5px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
              alt="All"
              className="button-icon"
            />
            Non-Veg
          </button>
          <button
            className={`custom-button ${filter === "veg" ? "active" : ""}`}
            onClick={() => handleFilterChange("vegetarian")}
          >
            <img
              src="https://i.pinimg.com/originals/f1/12/69/f11269b45e561d9612e8962bf635d2d5.png"
              alt="Veg"
              className="button-icon"
            />
            Veg
          </button>
        </div>
      </div>

      <div className="">
        {filteredData.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              key={pokemon.image}
              src={`http://127.0.0.1:8000/storage/${pokemon.image}`}
            />

            {/* <img src={pokemon.image_url} alt={pokemon.pokemon} /> */}
            <div className="pokemon-details">
              <h5>{` ${pokemon.name}`} </h5>
              <p className="text-black-50 para">{pokemon.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="price"> OMR {pokemon.cost}</p>
                <button
                  className="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#staticBackdrop-${pokemon.id}`}
                  onClick={() => {
                    console.log(pokemon);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ marginRight: "5px" }}
                  />
                  <span>Add</span>
                </button>
                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id={`staticBackdrop-${pokemon.id}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby={`staticBackdropLabel-${pokemon.id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => handleCancel()}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <CartCard
                          src={pokemon.image}
                          title={` ${pokemon.name} ${pokemon.size}`}
                          price={pokemon.cost}
                          description={pokemon.description}
                          quant={itemQuant}
                          increase={() => increaseItems(pokemon)}
                          decrease={() => decreaseItems(pokemon)}
                        />
                        {/* <h1>{pokemon.image} jkhu</h1> */}
                        {pokemon.meal_size_costs && (
                          <>
                            <div className="d-flex justify-content-around scrollmenu ">
                              {pokemon.meal_size_costs.map((size) => (
                                <SizeCard
                                  size={size.size}
                                  price={size.cost}
                                  nop={size.number_of_pieces}
                                  changeSize={(e) =>
                                    handleCheckboxChange(size, e)
                                  }
                                />
                              ))}
                            </div>
                          </>
                        )}

                        {pokemon.extras && (
                          <>
                            <div className="d-flex justify-content-around scrollmenu ">
                              {pokemon.extras.map((item) => (
                                <AddonsExtra
                                  name={item.name}
                                  inputName="extras"
                                  price={item.cost}
                                  change={(e) => handleCheckboxChange(item, e)}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        {pokemon.addons && (
                          <>
                            <div className="d-flex ">
                              {pokemon.addons.map((item) => (
                                <AddonsExtra
                                  name={item.name}
                                  inputName="addons"
                                  price={item.cost}
                                  img={item.image}
                                  change={(e) => handleCheckboxChange(item, e)}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => handleCancel()}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(pokemon, itemQuant)}
                          data-bs-dismiss="modal"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoaded ? (
        <div className="w-50 m-auto">
          <ReactPaginate
            pageCount={pageCount}
            pageRange={2}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"containerr"}
            previousLinkClassName={"pagee"}
            breakClassName={"pagee"}
            nextLinkClassName={"pagee"}
            pageClassName={"pagee"}
            disabledClassNae={"disabledd"}
            activeClassName={"activee"}
          />
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  );
};

export default FetchData;
