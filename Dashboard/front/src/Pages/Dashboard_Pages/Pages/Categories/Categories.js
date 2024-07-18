import "../DataTable.css";
import React, { useRef } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import ImageTest from "../../../../assets/global/profile.png";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

const handleDisplayAddModel = () => {
  var AddTable = document.getElementById("AddTable");
  if (AddTable) AddTable.classList.toggle("visible");
};

const handleDescriptionLength = (string, targetLength) => {
  return String("description description description").length > targetLength
    ? String("description description description").slice(0, targetLength) +
        "..."
    : "description description description";
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
    key: "1",
    name: "Item 1",
    price: 464,
    type: "type",
    description: handleDescriptionLength(
      "description description description",
      30
    ),
    status: "active",
    image: ImageTest,
  },
  {
    key: "2",
    name: "Item 2",
    price: 464,
    type: "type",
    description: handleDescriptionLength(
      "description description description",
      30
    ),
    status: "inactive",
    image: ImageTest,
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
    title: "TYPE",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description",
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
    title: "IMAGE",
    key: "image",
    render: (text, item) => <img src={item.image} alt={item.image} />,
  },
  {
    title: "ACTION",
    key: "action",
    render: (text, item) => (
      <>
        <Link
          to={`/admin/dashboard/categories/show/${item.id}`}
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

export default function Categorised() {
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