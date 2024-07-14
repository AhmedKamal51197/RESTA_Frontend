import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { MdQrCode2 } from "react-icons/md";
import instance from "../../../../axiosConfig/instance";
import EditDiningTables from "../../Models/Edit/DiningTables"; 
import { useSelector } from "react-redux";

export default function DiningTables() {
  const componentRef = useRef();
  const [DiningTables, setDiningTables] = useState([]);
  // const [pagination, setPagination] = useState({});
  const added = useSelector((state) => state.updated);
  const [editItemId, setEditItemId] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDiningTables(1);
  }, [added, updated]);

  const handleEdit = (id) => {
    setEditItemId(id);
    setModalVisible(true);
  };

  const fetchDiningTables = async (pageNumber = 1) => {
    try {
      const res = await instance.get(`/api/admin/dining-tables?page=${pageNumber}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken"))
        }
      });
      setDiningTables(res.data.data.map(item => ({ ...item, key: item.id })));
      // setPagination(res.data.pagination);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchDiningTables(pageNumber);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditItemId(null);
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`http://127.0.0.1:8000/storage/${record.qr_code}`}
          alt={record.name}
          style={{ width: "70px"}}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <a
            href={`http://127.0.0.1:8000/storage/${item.qr_code}`}
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
            onClick={() => handleEdit(item.id)}
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
        <Table
          columns={columns}
          dataSource={DiningTables}
          pagination={true
          }
        />
      </div>
      {modalVisible && <EditDiningTables id={editItemId} onClose={handleModalClose} />}
    </div>
  );
}
