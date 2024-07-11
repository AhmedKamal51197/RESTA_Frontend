import "./App.css";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import {
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import { Auth } from "./Pages/Dashboard_Pages/Auth/Auth";
import { Dashboard } from "./Pages/Dashboard_Pages/Dashboard";
import { Admin } from "./Pages/Admin_Pages/Admin";
import { Customer } from "./Pages/Customer_Pages/Customer";
import Loader from "./Components/Dashboard/Loader/Loader";

function App() {
  return (
    <div className="App">
      {window.location.pathname == "" ? (
        <ul>
          <li>
            <a href="/auth/login">login</a>
          </li>
          <li>
            <a href="/admin/dashboard">dashboard</a>
          </li>
          <li>
            <a href="/customer/menu">customer</a>
          </li>
        </ul>
      ) : (
        <></>
      )}

      <BrowserRouter>
        <Loader />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Route path="/customer" component={Customer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
