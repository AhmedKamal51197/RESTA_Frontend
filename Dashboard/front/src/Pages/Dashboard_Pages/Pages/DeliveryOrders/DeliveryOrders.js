import "../DataTable.css";
import React, { useRef, useState, useEffect } from "react";
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

export default function DeliveryOrders() {
  const componentRef = useRef();
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  useEffect(() => {
    fetchDeliveryOrders();
  }, []);

  const fetchDeliveryOrders = () => {
    instance.get(`/api/admin/orders`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) //the token is a variable which holds the token
      }
    })
      .then((res) => {
        // console.log(res.data.data);
        setDeliveryOrders(res.data.data);
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
        instance.delete(`/api/admin/orders/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The order has been deleted.", "success");
            setDeliveryOrders(prevOrder => prevOrder.filter(order => order.id !== id));
          })
          .catch((error) => {
            Swal.fire("Error!", "An error occurred while deleting the order.", "error");
            console.error("Error deleting order:", error);
          });
      }
    });
  };

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ORDER TYPE",
      dataIndex: "order_type",
      key: "order_type",
    },
    {
      title: "CUSTOMER",
      render: (text, record) => record.customer.name,
      key: "customer.name",
    },
    {
      title: "AMOUNT",
      dataIndex: "total_cost",
      key: "total_cost",
    },
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "created_at",
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
            to={`/admin/dashboard/delivery-order/show/${item.key}`}
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
        <Table columns={columns} dataSource={deliveryOrders} pagination={true} />
      </div>
    </div>
  );
}
