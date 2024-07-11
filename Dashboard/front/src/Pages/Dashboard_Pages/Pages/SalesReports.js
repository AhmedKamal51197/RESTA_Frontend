import "./DataTable.css";
import React, { useRef } from "react";
import { Table } from "antd";

import Filtration from "../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";

const data = [
  {
    order_id: "0407248",
    date: "03:47 AM, 04-07-2024",
    total: "4.00",
    discount: "0.00",
    delivery_charge: "0.00",
    payment_type: "Cash On Delivery",
    payment_status: "Unpaid",
  },
  {
    order_id: "0407248",
    date: "03:47 AM, 04-07-2024",
    total: "4.00",
    discount: "0.00",
    delivery_charge: "0.00",
    payment_type: "Cash On Delivery",
    payment_status: "paid",
  },
];

const columns = [
  {
    title: "ORDER ID",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "TOTAL",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "DISCOUNT",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "DELIVERY CHARGE",
    dataIndex: "delivery_charge",
    key: "delivery_charge",
  },
  {
    title: "PAYMENT TYPE",
    dataIndex: "payment_type",
    key: "payment_type",
  },
  {
    title: "PAYMENT STATUS",
    key: "payment_status",
    render: (text, item) =>
      item.payment_status === "paid" ? (
        <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
          {item.payment_status}
        </span>
      ) : (
        <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
          {item.payment_status}
        </span>
      ),
  },
];

export default function SalesReports() {
  const componentRef = useRef();
  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
}
