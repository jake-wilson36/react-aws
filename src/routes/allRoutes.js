import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Users from "../pages/Users";

let userRoutes = [
	{ path: "/dashboard", component: Dashboard },
	{ path: "/users", component: Users },
	{ path: "/logout", component: Logout },
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const authRoutes = [
	{ path: "/login", component: Login },
	{ path: "/signup", component: Signup },
	{ path: "/forgot-password", component: ForgetPwd },

];

export { userRoutes, authRoutes };
