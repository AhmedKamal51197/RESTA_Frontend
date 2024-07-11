import "../DataTable.css";
import React, { useRef } from "react";
import { Table, Breadcrumb } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

const handleDisplayAddModel = () => {
  var AddTable = document.getElementById("AddTable");
  if (AddTable) AddTable.classList.toggle("visible");
};

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
    key: 1,
    name: "name",
    email: "email@gmail.com",
    phone: "+1445345",
    status: "active",
  },
  {
    key: 2,
    name: "name",
    email: "email@gmail.com",
    phone: "+1445345",
    status: "inactive",
  },
];

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "PHONE",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "STATUS",
    key: "status",
    render: (text, item) =>
      item.status === "active" ? (
        <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
          {item.status}
        </span>
      ) : (
        <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
          {item.status}
        </span>
      ),
  },
  {
    title: "ACTION",
    key: "action",
    render: (text, item) => (
      <>
        <Link
          to={`/admin/dashboard/customer/show/${item.key}`}
          className="eyeIcon"
          data-tooltip="view"
          style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
        >
          <BsEye />
        </Link>
        <Link
          to="#"
          className="editIcon"
          data-tooltip="edit"
          onClick={handleDisplayAddModel}
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

export default function Customers() {
  const componentRef = useRef();
  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={data} pagination={true} />
      </div>
    </div>
  );
}
