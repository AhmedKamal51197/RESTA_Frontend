import { Row, Col } from "antd";

export default function Information() {
  return (
    <div className="Information">
      <Row gutter={16}>
        <Col span={12}>
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
            <label>Name</label>
            <span>{"test name"}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
            <label>Category</label>
            <span>{"test category"}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
            <label>Type</label>
            <span>{"test type"}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
            <label>Status</label>
            <span>{"test status"}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
            <label>Description</label>
            <span>{"test description"}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
            <label>Price</label>
            <span>{"test price"}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
