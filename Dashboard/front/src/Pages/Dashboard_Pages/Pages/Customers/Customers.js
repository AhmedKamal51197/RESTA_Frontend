import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table, Breadcrumb } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import instance from '../../../../axiosConfig/instance';

const handleDisplayAddModel = () => {
  var AddTable = document.getElementById("AddTable");
  if (AddTable) AddTable.classList.toggle("visible");
};


export default function Customers() {
  const componentRef = useRef();
  const [cusromer, setCustomer] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
      fetchCustomer(1);
    }, []);

  const fetchCustomer = async (pageNumber = 1) => {
    instance.get(`/api/admin/customers?page=${pageNumber}`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
    })
      .then((res) => {
        // console.log(res.data.data);
        const customers = res.data.data;
        setCustomer(customers);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (pageNumber) => {
    fetchCustomer(pageNumber);
  };
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
            to={`/admin/dashboard/administrator/show/${item.id}`}
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
  


  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns}
         dataSource={cusromer} 
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
