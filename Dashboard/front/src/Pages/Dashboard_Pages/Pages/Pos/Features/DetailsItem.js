import "./DetailsItem.css";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function DetailsItem({ cartItem }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("medium");
  const [addonQuantity, setAddonQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleQuantityChange = (event) => {
    setQuantity(quantity + Number(event.target.value));
  };

  const handleAddonsQuantityChange = (event) => {
    setAddonQuantity(addonQuantity + Number(event.target.value));
  };

  const addItemToStore = () => {
    let updateItems;
    const storeItems = JSON.parse(localStorage.getItem("storeItems")) || [];
    const statusExistItem = storeItems.find((item) => item.id === cartItem.id);

    if (statusExistItem) {
      updateItems = storeItems.map((item) =>
        item.id === cartItem.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              addonQuantity: item.addonQuantity + addonQuantity,
            }
          : item
      );
    } else {
      const newItem = {
        ...cartItem,
        quantity,
        size,
        addonQuantity,
        notes,
      };
      updateItems = [...storeItems, newItem];
    }
    localStorage.setItem("storeItems", JSON.stringify(updateItems));

    const event = new Event("storageUpdated");
    window.dispatchEvent(event);

    document.querySelector(".addCartBtn").click();
    handleModalReset();
  };

  const handleModalReset = () => {
    setQuantity(1);
    setSize("medium");
    setAddonQuantity(1);
    setNotes("");
  };

  return (
    <div className="DetailsItem">
      <div
        className="modal fade"
        id="detailsItem"
        tabindex="-1"
        aria-hidden="true"
        aria-labelledby="detailsItemLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleModalReset}
            ></button>

            <div className="modal-body">
              <div className="item">
                <div className="item-img">
                  <img src={cartItem.image} alt={cartItem.title} />
                </div>
                <div className="item-text">
                  <b>{"cartItem name"}</b>
                  <p>
                    {
                      "cartItem description cartItem description cartItem description cartItem description cartItem description cartItem description"
                    }
                  </p>
                  <b>${cartItem.price}</b>
                </div>
              </div>

              <div className="quantity">
                <label>quantity</label>
                <div>
                  <AiOutlinePlusCircle
                    onClick={() => setQuantity(quantity + 1)}
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <AiOutlineMinusCircle
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  />
                </div>
              </div>

              <div className="sizes">
                <label>size</label>
                <div>
                  <div className="size">
                    <input
                      type="radio"
                      name="size"
                      value="small"
                      checked={size === "small"}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <span>small</span>
                  </div>

                  <div className="size">
                    <input
                      type="radio"
                      name="size"
                      value="medium"
                      checked={size === "medium"}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <span>medium</span>
                  </div>

                  <div className="size">
                    <input
                      type="radio"
                      name="size"
                      value="large"
                      checked={size === "large"}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    <span>large</span>
                  </div>
                </div>
              </div>

              <div className="addons">
                <label>addons</label>

                <div className="addon">
                  <div className="addon-img">
                    <img src={cartItem.image} alt="" />
                  </div>
                  <div className="addon-text">
                    <p>cappuccino</p>
                    <p>$1.20</p>
                    <div className="quantity">
                      <AiOutlinePlusCircle
                        onClick={() => setAddonQuantity(addonQuantity + 1)}
                      />
                      <input
                        type="number"
                        name="addon_quantity"
                        value={addonQuantity}
                        onChange={handleAddonsQuantityChange}
                      />
                      <input type="hidden" name="addon_price" value={"1.5"} />
                      <AiOutlineMinusCircle
                        onClick={() =>
                          setAddonQuantity(
                            addonQuantity > 1 ? addonQuantity - 1 : 1
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="notes">
                <label>special instructions</label>
                <textarea
                  className="form-control"
                  name="notes"
                  placeholder="add note like extra mayo, cheese etc..!"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button
                type="button"
                className="btn form-control mt-3 fw-bold"
                onClick={addItemToStore}
              >
                <span>add to cart - ${"1.5"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
