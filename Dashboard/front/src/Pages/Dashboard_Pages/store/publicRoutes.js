//? Icons
import { MdDashboard, MdCreditScore } from "react-icons/md";
import { GiTemporaryShield } from "react-icons/gi";
import { PiPicnicTableBold } from "react-icons/pi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaUserGroup, FaGear } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiAlignItemBottomLine } from "react-icons/ri";

//? Pages
import Dashboard from "../Pages/Dashboard";
import Meals from "../Pages/Meals/Meals";
import Categories from "../Pages/Categories/Categories";
import DiningTables from "../Pages/DiningTables/DiningTables";
import Extras from "../Pages/Extras/Extras";
import Addons from "../Pages/Addons/Addons";
import Pos from "../Pages/Pos/Pos";
import DeliveryOrders from "../Pages/DeliveryOrders/DeliveryOrders";
import TablesOrders from "../Pages/TablesOrders/TablesOrders";
import Offers from "../Pages/Offers/Offers";
import Administrators from "../Pages/Administrators/Administrators";
import Customers from "../Pages/Customers/Customers";
import Employees from "../Pages/Employees/Employees";
import Transactions from "../Pages/Transactions";
import SalesReports from "../Pages/SalesReports";
import ItemsReports from "../Pages/ItemsReports";
import CreditBalanceReport from "../Pages/CreditBalanceReport";
import Settings from "../Pages/Settings/Settings";
// import { ResetPasswordAdmin } from "../../Admin_Pages/ResetPasswordAdmin";
// import { ResetPasswordGeneral } from "../../ResetPasswordGeneral";
import { ResetPasswordAdmin } from "../Auth/ResetPasswordAdmin";
import { ResetPasswordGeneral } from "../Auth/ResetPasswordGeneral";

const routes = [
  {
    items: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: MdDashboard,
        component: Dashboard,
      },
      {
        path: "/admin/dashboard/meals",
        name: "Meals",
        icon: GiTemporaryShield,
        component: Meals,
      },
      {
        path: "/admin/dashboard/categories",
        name: "Categories",
        icon: PiPicnicTableBold,
        component: Categories,
      },
      {
        path: "/admin/dashboard/dining-tables",
        name: "Dining Tables",
        icon: PiPicnicTableBold,
        component: DiningTables,
      },
      {
        path: "/admin/dashboard/extras",
        name: "Extras",
        icon: PiPicnicTableBold,
        component: Extras,
      },
      {
        path: "/admin/dashboard/addons",
        name: "Addons",
        icon: PiPicnicTableBold,
        component: Addons,
      },
      // {
      //   path: "/auth/passwordreset",
      //   name: "reset",
      //   icon: PiPicnicTableBold,
      //   component: ResetPasswordAdmin,
      // }
    ],
  },
  {
    label: "pos & orders",
    items: [
      {
        path: "/admin/dashboard/pos",
        name: "Pos Menu",
        icon: LuFileSpreadsheet,
        component: Pos,
      },
      {
        path: "/admin/dashboard/delivery-orders",
        name: "Delivery Orders",
        icon: LuFileSpreadsheet,
        component: DeliveryOrders,
      },
      {
        path: "/admin/dashboard/tables-orders",
        name: "Table Orders",
        icon: LuFileSpreadsheet,
        component: TablesOrders,
      },
    ],
  },
  {
    label: "promo",
    items: [
      {
        path: "/admin/dashboard/offers",
        name: "Offers",
        icon: BiSolidOffer,
        component: Offers,
      },
    ],
  },
  {
    label: "users",
    items: [
      {
        path: "/admin/dashboard/administrators",
        name: "Administrators",
        icon: FaUser,
        component: Administrators,
      },
      {
        path: "/admin/dashboard/customers",
        name: "Customers",
        icon: FaUsers,
        component: Customers,
      },
      {
        path: "/admin/dashboard/employees",
        name: "Employees",
        icon: FaUserGroup,
        component: Employees,
      },
    ],
  },
  {
    label: "accounts",
    items: [
      {
        path: "/admin/dashboard/transactions",
        name: "Transactions",
        icon: GrTransaction,
        component: Transactions,
      },
    ],
  },
  {
    label: "reports",
    items: [
      {
        path: "/admin/dashboard/sales-reports",
        name: "Sales Reports",
        icon: BsGraphUpArrow,
        component: SalesReports,
      },
      {
        path: "/admin/dashboard/items-reports",
        name: "Items Reports",
        icon: RiAlignItemBottomLine,
        component: ItemsReports,
      },
      {
        path: "/admin/dashboard/credit-balance-report",
        name: "Credit Balance Report",
        icon: MdCreditScore,
        component: CreditBalanceReport,
      },
    ],
  },
  {
    label: "set up",
    items: [
      {
        path: "/admin/dashboard/settings",
        name: "Settings",
        icon: FaGear,
        component: Settings,
      },
    ],
  },
];

export default routes;
