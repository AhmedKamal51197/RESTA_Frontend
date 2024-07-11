import "../../SubModels.css";
import { Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function Addon() {
  return (
    <div className="SubModel">
      <Row gutter={16}>
        <Col span={12}>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addAddon"
          >
            add addon
          </button>
        </Col>
      </Row>

      <div
        class="modal fade"
        id="addAddon"
        tabindex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addAddonLabel"
      >
        <div class="modal-dialog">
          <form class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addAddonLabel">
                add addon
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label for="name" className="form-label">
                      NAME <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      required
                    />
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label for="additional_price" className="form-label">
                      ADDITIONAL PRICE <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="additional_price"
                      id="additional_price"
                      required
                    />
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label for="attribute" className="form-label">
                      ATTRIBUTE <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="attribute"
                      id="attribute"
                    >
                      <option value="-1">--</option>
                      <option value="1">Egg Variation</option>
                      <option value="2">Choose a filling</option>
                      <option value="3">Steak Temperature</option>
                      <option value="4">Steak Size</option>
                      <option value="5">Quantity Choice</option>
                      <option value="6">Size</option>
                    </select>
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label for="status" className="form-label">
                      status
                    </label>
                    <div className="row">
                      <div className="col col-4 d-flex gap-2 align-items-center">
                        <input
                          type="radio"
                          name="status"
                          id="status"
                          required
                        />
                        <span>active</span>
                      </div>
                      <div className="col col-4 d-flex gap-2 align-items-center">
                        <input
                          type="radio"
                          name="status"
                          id="status"
                          required
                        />
                        <span>in active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <HiXMark />
                <span>cancel</span>
              </button>
              <button type="button" class="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
