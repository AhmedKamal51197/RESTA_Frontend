import "../DataTable.css";
import React, { useRef } from "react";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { BsEye } from "react-icons/bs";

const data = [
  {
    key: "1",
    order_id: "order_id",
    order_type: "delivery",
    customer: "customer",
    amount: "amount",
    date: "12:54 pm 16-02-2001",
    status: "active",
  },
  {
    key: "2",
    order_id: "order_id",
    order_type: "takeaway",
    customer: "customer",
    amount: "amount",
    date: "12:54 pm 16-02-2001",
    status: "inactive",
  },
];

const columns = [
  {
    title: "ORDER ID",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "ORDER TYPE",
    key: "order_type",
    render: (text, item) =>
      item.order_type === "takeaway" ? (
        <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
          {item.order_type}
        </span>
      ) : (
        <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
          {item.order_type}
        </span>
      ),
  },
  {
    title: "CUSTOMER",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
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
    title: "ACTION",
    key: "action",
    render: (text, item) => (
      <Link
        to={`/admin/dashboard/tables-orders/show/${item.key}`}
        className="eyeIcon"
        data-tooltip="view"
        style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
      >
        <BsEye />
      </Link>
    ),
  },
];

export default function TableOrders() {
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
