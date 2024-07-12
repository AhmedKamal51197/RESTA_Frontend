import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import instance from "../../../../axiosConfig/instance";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import EditExtra from "../../Models/Edit/Extras"; 

import "../DataTable.css";
import { useSelector } from "react-redux";

export default function Extra() {
  const componentRef = useRef();
  const [extras, setExtras] = useState([]);
  const [pagination, setPagination] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const [updated, setUpdated] = useState(false);
  const added = useSelector((state) => state.updated);

  useEffect(() => {
    fetchExtras(1); // fetch the first page initially
  }, [updated, added]);

  const fetchExtras = async (pageNumber = 1) => {
    try {
      const res = await instance.get(`/api/admin/extras?page=${pageNumber}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")),
        },
      });
      setExtras(res.data.data.map(item => ({ ...item, key: item.id })));
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    setEditItemId(id);
    setUpdated(!updated);
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
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "PRICE",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) =>
        item.status === 1 ? (
          <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
            Active
          </span>
        ) : (
          <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
            Inactive
          </span>
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
          style={{ width: "70px"}}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/extra/show/${item.id}`}
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
