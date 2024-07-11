import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { MdQrCode2 } from "react-icons/md";
import Swal from "sweetalert2";
import instance from "../../../../axiosConfig/instance";
import qrCode from "../../../../assets/global/qrCode.png";

const handleDisplayAddModel = () => {
  var AddTable = document.getElementById("AddTable");
  if (AddTable) AddTable.classList.toggle("visible");
};

export default function DiningTables() {
  const componentRef = useRef();
  const [DiningTables, setDiningTables] = useState([]);

  useEffect(() => {
    fetchDiningTables();
  }, []);
  const fetchDiningTables= () => {
    instance.get("/api/admin/dining-tables", {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
     })
      .then((res) => {
        console.log(res.data.data);
        setDiningTables(res.data.data);
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
        instance.delete(`/api/admin/dining-tables/${id}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
          }
         })
          .then(() => {
            Swal.fire("Deleted!", "The Dining Table has been deleted.", "success");
            setDiningTables(prevtables =>prevtables .filter(table => table.id !== id));
          })
          .catch((error) => {
            Swal.fire("Error!", "An error occurred while deleting the Dining Table.", "error");
            console.error("Error deleting Dining Table:", error);
          });
      }
    });
  };
  
const columns = [
  {
    title: "NUMBER",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "SIZE",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "FLOOR",
    dataIndex: "floor",
    key: "floor",
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
        <a
          href={qrCode}

          // href={`http://127.0.0.1:8000/storage/${record.image}`}
          download
          className="qrCodeIcon"
          data-tooltip="download"
          style={{ "--c": "#ecbf1d", "--bg": "#fff6c8" }}
        >
          <MdQrCode2 />
        </a>
        <Link
          to={`/admin/dashboard/dining-table/show/${item.key}`}
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
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={DiningTables} pagination={true} />
      </div>
    </div>
  );
}
