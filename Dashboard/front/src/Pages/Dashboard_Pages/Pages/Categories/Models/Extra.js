import "../../SubModels.css";
import { Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

export default function Extra() {
  return (
    <div className="SubModel">
      <Row gutter={16}>
        <Col span={12}>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addExtra"
          >
            add extra
          </button>
        </Col>
      </Row>

      <div
        class="modal fade"
        id="addExtra"
        tabindex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addExtraLabel"
      >
        <div class="modal-dialog">
          <form class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addExtraLabel">
                add extra
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
