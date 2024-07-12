import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Swal from "sweetalert2";
import instance from '../../../../axiosConfig/instance';
import { useSelector } from "react-redux";
import EditAddon from "../../Models/Edit/Addons"; 



// const handleDisplayAddModel = () => {
//   var AddTable = document.getElementById("AddTable");
//   if (AddTable) AddTable.classList.toggle("visible");
// };

export default function Addons() {
  const componentRef = useRef();
  const [addons, setAddons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const [updated, setUpdated] = useState(false);
  const added = useSelector((state) => state.updated);

  useEffect(() => {
    fetchAddons(1);
  }, [added , updated]);

  const fetchAddons  = async (pageNumber = 1) => {
    const res = await instance.get(`/api/admin/addons?page=${pageNumber}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
      .then((res) => {
        setAddons(res.data.data.map(item => ({ ...item, key: item.id })));
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (id) => {
    setEditItemId(id);
    setUpdated(!updated);
  };

  const handlePageChange = (pageNumber) => {
    fetchAddons(pageNumber);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Price",
      dataIndex: "cost",
      key: "cost",
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
            onClick={() => handleEdit(item.id)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
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
        <Table columns={columns} 
          dataSource={addons} 
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            onChange: handlePageChange,
        }} 
      />
      {editItemId && <EditAddon id={editItemId} />}
      </div>
    </div>
  );
}
