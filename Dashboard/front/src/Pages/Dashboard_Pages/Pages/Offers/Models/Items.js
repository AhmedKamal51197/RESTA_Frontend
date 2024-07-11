import "../Models.css";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { PlusCircleFilled } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { CheckCircleFilled } from "@ant-design/icons";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const handleDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover the deleted record!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Done delete!", "Done delete element.", "success");
    }
  });
};

const data = [
  {
    name: "name 1",
    price: "$468",
    status: "active",
  },
  {
    name: "name 2",
    price: "$6",
    status: "active",
  },
];

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "STATUS",
    key: "status",
    render: (text, item) => (
      <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>status</span>
    ),
  },
  {
    title: "ACTION",
    key: "action",
    render: (text, item) => (
      <Link
        to="#"
        className="trashIcon"
        data-tooltip="delete"
        onClick={() => handleDelete()}
        style={{ "--c": "#ffcd17", "--bg": "#fbf7e2" }}
      >
        <BiTrash />
      </Link>
    ),
  },
];

export default function Address() {
  return (
    <div className="Address">
      <div className="content">
        <div className="head">
          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addOfferItem"
            >
              <PlusCircleFilled />
              <span>add item</span>
            </button>
          </div>
        </div>

        <div className="body">
          <Table columns={columns} dataSource={data} pagination={true} />
        </div>
      </div>

      <div
        class="modal fade"
        id="addOfferItem"
        tabindex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addOfferItemLabel"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addOfferItemLabel">
                add items
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
                <div className="col-12">
                  <div className="mb-3">
                    <label for="items" className="form-label">
                      items <span className="star">*</span>
                    </label>
                    <select className="form-control" name="items" id="items">
                      <option value="-1">--</option>
                      <option value="1">option 1</option>
                      <option value="2">option 2</option>
                      <option value="3">option 3</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                <FaXmark />
                <span>cancel</span>
              </button>
              <button type="button" class="btn btn-primary">
                <CheckCircleFilled />
                <span>save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
