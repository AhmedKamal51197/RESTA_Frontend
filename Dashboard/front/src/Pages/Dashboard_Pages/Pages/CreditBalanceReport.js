import "./DataTable.css";
import React, { useRef } from "react";
import { Table } from "antd";

import Filtration from "../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";

const data = [
  {
    name: "name",
    email: "email@email.com",
    phone: "+154545346",
    balance: "balance",
  },
  {
    name: "name",
    email: "email@email.com",
    phone: "+154545346",
    balance: "balance",
  },
];

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
    title: "BALANCE",
    dataIndex: "balance",
    key: "balance",
  },
];

export default function CreditBalanceReport() {
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
