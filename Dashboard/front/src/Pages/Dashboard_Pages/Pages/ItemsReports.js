import "./DataTable.css";
import React, { useRef } from "react";
import { Table } from "antd";

import Filtration from "../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";

const data = [
  {
    name: "name",
    category: "category",
    type: "vag",
    quantity: "quantity",
  },
  {
    name: "name",
    category: "category",
    type: "non vag",
    quantity: "quantity",
  },
];

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "TYPE",
    key: "type",
    render: (text, item) =>
      item.type === "vag" ? (
        <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>{item.type}</span>
      ) : (
        <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>{item.type}</span>
      ),
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
  },
];

export default function ItemsReports() {
  const componentRef = useRef();
  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div ref={componentRef}>
        <Table
          className="tableItems"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  );
}
