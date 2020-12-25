import React from "react";

import "./App.css";
import './main.scss'

import Dashboard from "./auth/dashboard/dashboard";
import Users from "./auth/user/Users";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./userAuth/Login";
import Register from "./userAuth/register";
import RedirectToDashboard from "./auth/RedirectToDashboard";
import UserCreate from "./auth/user/UserCreate";
import UserEdit from "./auth/user/UserEdit";
import Roles from "./auth/roles/Roles";
import RoleCreate from "./auth/roles/RolesCreate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path={"/"} exact component={RedirectToDashboard} />
        <Route path={"/dashboard"} exact component={Dashboard} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/users"} component={Users} exact />
        <Route path={"/users/create"} component={UserCreate} />
        <Route path={"/users/:id/edit"} component={UserEdit} />
        <Route path={"/roles"} exact component={Roles} />
        <Route path={"/roles/create"} exact component={RoleCreate} />
      </BrowserRouter>
    </div>
  );
}

export default App;
