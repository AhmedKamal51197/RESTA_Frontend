import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function AddPopup() {
  return (
    <div
      className="modal fade show"
      id="AddPopup"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <form className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddPopupLabel">
              customers
            </h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">add to cart</div>

          <div className="modal-footer btnModels">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <HiXMark />
              <span className="ps-2">close</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
