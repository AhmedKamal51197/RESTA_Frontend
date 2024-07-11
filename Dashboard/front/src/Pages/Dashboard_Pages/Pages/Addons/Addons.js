import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import instance from '../../../../axiosConfig/instance';

const handleDisplayAddModel = () => {
  var AddTable = document.getElementById("AddTable");
  if (AddTable) AddTable.classList.toggle("visible");
};

// const handleDisplayEditModel = () => {
//   var AddTable = document.getElementById("AddTable");
//   if (AddTable) AddTable.classList.toggle("visible");
// };

export default function Addons() {
  const componentRef = useRef();
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    fetchAddons();
  }, []);

  const fetchAddons = () => {
    instance.get("/api/admin/addons", {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
      .then((res) => {
        console.log(res.data.data);
        setAddons(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover the deleted record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`/api/admin/addons/${id}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
          }
         })
          .then(() => {
            Swal.fire("Deleted!", "The addon has been deleted.", "success");
            setAddons(prevAddons => prevAddons.filter(addon => addon.id !== id));
          })
          .catch((error) => {
            Swal.fire("Error!", "An error occurred while deleting the addon.", "error");
            console.error("Error deleting addon:", error);
          });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) =>
        item.status === 1 ? (
          <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>Active</span>
        ) : (
          <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>Inactive</span>
        ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`http://127.0.0.1:8000/storage/${record.image}`}
          alt={record.name}
          style={{ width: "70px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/addon/show/${item.key}`}
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
            onClick={() => handleDelete(item.id)}
            style={{ "--c": "#F15353", "--bg": "#FECACA" }}
          >
            <BiTrash />
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="DataTable">
      {/* Breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={addons} pagination={true} />
      </div>
    </div>
  );
}
