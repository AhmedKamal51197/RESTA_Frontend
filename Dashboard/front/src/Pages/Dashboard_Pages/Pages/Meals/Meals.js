import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import instance from "../../../../axiosConfig/instance"
import Item from "antd/es/list/Item";
const handleDisplayAddModel = () => {
  var AddTable = document.getElementById("AddTable");
  if (AddTable) AddTable.classList.toggle("visible");
};


export default function Meals() {
  const componentRef = useRef();
  const [meals, setMeals] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = (pageNumber = 1) => {
    instance.get(`/api/admin/meals?page=${pageNumber}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) 
      }
     })
      .then((res) => {
        setMeals(res.data.data);
        setPagination(res.data.pagination);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handlePageChange = (pageNumber) => {
    fetchMeals(pageNumber);
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
      dataIndex: "price",
      key: "price",
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
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/meals/show/${item.id}`}
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
        </>
      ),
    },
  ];
// console.log(Item);
  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} 
        dataSource={meals}  
        pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            onChange: handlePageChange,
        }} 
        />
      </div>
    </div>
  );
}
