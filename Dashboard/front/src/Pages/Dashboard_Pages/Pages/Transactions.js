import "./DataTable.css";
import React, { useRef } from "react";

import { Table } from "antd";

import Filtration from "../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";

const data = [
  {
    transaction_id: "2P498472RR750594R",
    date: "12:32 PM, 12-06-2024",
    payment_method: "PAYPAL",
    serial: "1206242",
    amount: "+23.38",
  },
  {
    transaction_id: "2P498472RR750594R",
    date: "12:32 PM, 12-06-2024",
    payment_method: "PAYPAL",
    serial: "1206242",
    amount: "-23.38",
  },
];

const columns = [
  {
    title: "TRANSACTION ID",
    dataIndex: "transaction_id",
    key: "transaction_id",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "PAYMENT METHOD",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "ORDER SERIAL NO",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "AMOUNT",
    key: "amount",
    render: (text, item) =>
      parseFloat(item.amount) > 0 ? (
        <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
          {item.amount}
        </span>
      ) : (
        <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
          {item.amount}
        </span>
      ),
  },
];

export default function Transactions() {
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
