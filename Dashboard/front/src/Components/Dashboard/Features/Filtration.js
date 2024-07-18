import React, { useState, useEffect } from "react";
import { Collapse } from "bootstrap";

import { Button, Space } from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import ReactToPrint from "react-to-print";

import { IoMdArrowDropdown } from "react-icons/io";
import { LuPrinter } from "react-icons/lu";

//? Add Modals
import AddMealModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Meals";
import AddDiningTablesModel from "../../../Pages/Dashboard_Pages/Models/AddRow/DiningTables";
import AddAdministratorsModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Administrators";
import AddCustomersModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Customers";
import AddEmployeesModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Employees";
import AddOffersModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Offers";
import AddExtrasModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Extras";
import AddCategoriesModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Categories";
import AddAddonsModel from "../../../Pages/Dashboard_Pages/Models/AddRow/Addons";

//? Filtration
import FiltrationMeals from "../../../Pages/Dashboard_Pages/Models/Filtration/Meals";
import FiltrationDiningTables from "../../../Pages/Dashboard_Pages/Models/Filtration/DiningTables";
import FiltrationAdministrators from "../../../Pages/Dashboard_Pages/Models/Filtration/Administrators";
import FiltrationCustomers from "../../../Pages/Dashboard_Pages/Models/Filtration/Customers";
import FiltrationEmployees from "../../../Pages/Dashboard_Pages/Models/Filtration/Employees";
import FiltrationDeliveryOrders from "../../../Pages/Dashboard_Pages/Models/Filtration/DeliveryOrders";
import FiltrationTablesOrders from "../../../Pages/Dashboard_Pages/Models/Filtration/TablesOrders";
import FiltrationOffers from "../../../Pages/Dashboard_Pages/Models/Filtration/Offers";
import FiltrationExtras from "../../../Pages/Dashboard_Pages/Models/Filtration/Extras";
import FiltrationCategories from "../../../Pages/Dashboard_Pages/Models/Filtration/Categories";
import FiltrationAddons from "../../../Pages/Dashboard_Pages/Models/Filtration/Addons";
import FiltrationTransactions from "../../../Pages/Dashboard_Pages/Models/Filtration/Transactions";
import FiltrationSalesReports from "../../../Pages/Dashboard_Pages/Models/Filtration/SalesReports";
import FiltrationItemsReports from "../../../Pages/Dashboard_Pages/Models/Filtration/ItemsReports";
import FiltrationCreditBalanceReport from "../../../Pages/Dashboard_Pages/Models/Filtration/CreditBalanceReport";

export default function Filtration({ componentRef }) {
  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    const myCollapse = document.getElementById("collapseTarget");

    if (myCollapse) {
      const bsCollapse = new Collapse(myCollapse, { toggle: false });
      toggleFilter ? bsCollapse.show() : bsCollapse.hide();
    }
  }, [toggleFilter]);

  const handleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleExport = () => {
    var listPrint = document.getElementById("listPrint");
    listPrint.classList.toggle("show");
  };

  const handleDisplayAddModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.toggle("visible");
  };

  const pathname = window.location.pathname.replace("/admin/dashboard/", "");

  let ComponentAddModal = null;
  let ComponentFiltration = null;

  if (pathname === "meals") {
    ComponentFiltration = <FiltrationMeals />;
    ComponentAddModal = <AddMealModel />;
  } else if (pathname === "dining-tables") {
    ComponentFiltration = <FiltrationDiningTables />;
    ComponentAddModal = <AddDiningTablesModel />;
  } else if (pathname === "administrators") {
    ComponentFiltration = <FiltrationAdministrators />;
    ComponentAddModal = <AddAdministratorsModel />;
  } else if (pathname === "customers") {
    ComponentFiltration = <FiltrationCustomers />;
    ComponentAddModal = <AddCustomersModel />;
  } else if (pathname === "employees") {
    ComponentFiltration = <FiltrationEmployees />;
    ComponentAddModal = <AddEmployeesModel />;
  } else if (pathname === "delivery-orders") {
    ComponentFiltration = <FiltrationDeliveryOrders />;
  } else if (pathname === "tables-orders") {
    ComponentFiltration = <FiltrationTablesOrders />;
  } else if (pathname === "offers") {
    ComponentFiltration = <FiltrationOffers />;
    ComponentAddModal = <AddOffersModel />;
  } else if (pathname === "extras") {
    ComponentFiltration = <FiltrationExtras />;
    ComponentAddModal = <AddExtrasModel />;
      } else if (pathname === "categories") {
    ComponentFiltration = <FiltrationCategories />;
    ComponentAddModal = <AddCategoriesModel />;
  } else if (pathname === "addons") {
    ComponentFiltration = <FiltrationAddons />;
    ComponentAddModal = <AddAddonsModel />;
  } else if (pathname === "transactions") {
    ComponentFiltration = <FiltrationTransactions />;
  } else if (pathname === "sales-reports") {
    ComponentFiltration = <FiltrationSalesReports />;
  } else if (pathname === "items-reports") {
    ComponentFiltration = <FiltrationItemsReports />;
  } else if (pathname === "credit-balance-report") {
    ComponentFiltration = <FiltrationCreditBalanceReport />;
  }

  return (
    <div className="headerTable">
      <div className="head">
        <div className="titlePage">{pathname}</div>

        <Space className="actions">
          <Button icon={<FilterOutlined />} onClick={handleFilter}>
            Filter
            <IoMdArrowDropdown />
          </Button>
          <div className="dropListPrint">
            <Button
              icon={<FilterOutlined />}
              onClick={handleExport}
              className="btnPrintList"
            >
              Export
              <IoMdArrowDropdown />
            </Button>

            <div className="listPrint" id="listPrint">
              <ul>
                <li>
                  <ReactToPrint
                    trigger={() => <Button icon={<LuPrinter />}>Print</Button>}
                    content={() => componentRef.current}
                  />
                </li>
                <li>
                  <Button icon={<FileExcelOutlined />}>XLS</Button>
                </li>
              </ul>
            </div>
          </div>

          {pathname === "meals" ||
          pathname === "dining-tables" ||
          pathname === "administrators" ||
          pathname === "customers" ||
          pathname === "employees" ||
          pathname === "offers" ||
          pathname === "extras" ||
          pathname === "categories" ||
          pathname === "addons" ? (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleDisplayAddModel}
            >
              Add {pathname}
            </Button>
          ) : null}
        </Space>
      </div>

      {/* Filtration */}
      {ComponentFiltration}

      {/* add model */}
      {ComponentAddModal}
    </div>
  );
}