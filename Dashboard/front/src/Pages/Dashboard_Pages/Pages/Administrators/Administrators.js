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

export default function Administrators() {
  const componentRef = useRef();
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = () => {
    instance.get(`/api/admin/employees`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
    })
      .then((res) => {
        // console.log(res.data.data);
        const employees = res.data.data;

        setAdmin(employees);
        if (Array.isArray(employees)) {
          const adminList = employees.filter(employee => employee.role === "admin");
          setAdmin(adminList);
        } else {
          console.error("Expected an array but got:", employees);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Table columns={columns} dataSource={admin} pagination={true} />
      </div>
    </div>
  );
}
