import "../Models.css";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { BiLocationPlus, BiTrash } from "react-icons/bi";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";

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

export default function Address() {
  const data = [
    {
      key: "1",
      label: "Item 1",
      address: "Category A",
      apartment: "$50",
    },
    {
      key: "2",
      label: "Item 2",
      address: "Category B",
      apartment: "$50",
    },
  ];

  const columns = [
    {
      title: "LABEL",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "APARTMENT",
      dataIndex: "apartment",
      key: "apartment",
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            data-bs-toggle="modal"
            data-bs-target="#addAdminAddress"
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
          </Link>

          <Link
            to="#"
            className="trashIcon"
            data-tooltip="delete"
            onClick={() => handleDelete()}
            style={{ "--c": "#F15353", "--bg": "#FECACA" }}
          >
            <BiTrash />
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="Address">
      <div className="content">
        <div className="head">
          <div>basic information</div>

          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addAdminAddress"
            >
              <PlusCircleFilled />
              <span>add address</span>
            </button>
          </div>
        </div>

        <div className="tableItems">
          <Table columns={columns} dataSource={data} pagination={true} />
        </div>

        <div
          className="modal fade"
          id="addAdminAddress"
          tabindex="-1"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="addAdminAddressLabel"
        >
          <div className="modal-dialog">
            <form className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addAdminAddressLabel">
                  address
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <SearchOutlined />
                    </span>
                  </div>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="search location..."
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <BiLocationPlus />
                    </span>
                  </div>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.513750278261!2d35.238786650990036!3d31.776980122355557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150329c86ce8896f%3A0xe33f01a44e2808aa!2z2YLYqNipINin2YTYtdiu2LHYqQ!5e1!3m2!1sar!2seg!4v1719957418716!5m2!1sar!2seg"
                  width="100%"
                  height="250"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="row">
                  <div className="col col-12">
                    <label for="apartment">
                      APARTMENT <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="apartment"
                      id="apartment"
                    >
                      <option value="-1">--</option>
                      <option value="1">963,mirpur 1</option>
                      <option value="2">963,mirpur 1</option>
                      <option value="3">963,mirpur 1</option>
                      <option value="4">963,mirpur 1</option>
                    </select>
                  </div>

                  <div className="col col-12">
                    <div className="mb-3">
                      <div className="row p-0 m-0">
                        <label for="label" className="form-label">
                          LABEL <span className="star">*</span>
                        </label>
                        <div className="col col-2 d-flex gap-2 align-items-center">
                          <input
                            type="radio"
                            name="label"
                            id="label"
                            required
                          />
                          <span>HOME</span>
                        </div>

                        <div className="col col-2 d-flex gap-2 align-items-center">
                          <input
                            type="radio"
                            name="label"
                            id="label"
                            required
                          />
                          <span>WORK</span>
                        </div>

                        <div className="col col-2 d-flex gap-2 align-items-center">
                          <input
                            type="radio"
                            name="label"
                            id="label"
                            required
                          />
                          <span>OTHER</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  <HiXMark />
                  <span className="ps-2">cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
