import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import Swal from "sweetalert2";
import instance from "../../../../axiosConfig/instance";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import EditExtra from "../../Models/Edit/Extras"; 

import "../DataTable.css";
import { useSelector } from "react-redux";

export default function Extra() {
  const componentRef = useRef();
  const [extras, setExtras] = useState([]);
  const [pagination, setPagination] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const [updated,setUpdated]=useState(false)
  const added=useSelector((state) => state.updated);
  useEffect(() => {
    fetchExtras();
  }, [extras,updated,added]);

  const fetchExtras = (pageNumber = 1) => {
    instance.get(`/api/admin/extras?page=${pageNumber}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
      .then((res) => {
        setExtras(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.error(err);
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
        instance.delete(`/api/admin/extras/${id}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
          }
         })
          .then(() => {
            Swal.fire("Deleted!", "The extra has been deleted.", "success");
            setExtras(prevExtras => prevExtras.filter(extra => extra.id !== id));
          })
          .catch((error) => {
            Swal.fire("Error!", "An error occurred while deleting the extra.", "error");
            console.error("Error deleting extra:", error);
          });
      }
    });
  };

  const handleEdit = (id) => {
    setEditItemId(id);
    setUpdated(!updated)
  };

  const handlePageChange = (pageNumber) => {
    fetchExtras(pageNumber);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PRICE",
      dataIndex: "cost",
      key: "cost",
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
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/extra/show/${item.key}`}
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
            onClick={() => handleEdit(item.id)}
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
      <Breadcrumb />
      <Filtration componentRef={componentRef} />
      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={extras}
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            onChange: handlePageChange,
          }}
        />
      </div>
      {editItemId && <EditExtra id={editItemId} />}
    </div>
  );
}
