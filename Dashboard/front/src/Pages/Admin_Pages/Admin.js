import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { AdminLogin } from "./AdminLogin";
import DiningTables from "./DiningTables";
import Add_ons from "./Add-ons";
import Extras from "./Extras";
import "./Admin.css";

export function Admin() {
  return (
    <>
      <BrowserRouter>
        <div className="container ">
          <Switch>
            <Route path="/admin/login" component={AdminLogin} />
            <Route
              path="/admin/dashboard/dining-tables"
              component={DiningTables}
            />
            <Route path="/admin/dashboard/add-ons" component={Add_ons} />
            <Route path="/admin/dashboard/extras" component={Extras} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
