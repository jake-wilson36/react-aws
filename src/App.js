import React, { useState } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";
// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";
// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
// Import scss
import "./assets/scss/theme.scss";
import app_loader from './assets/images/app_loader.svg';
import axios from './helpers/axiosutil';
import { SetConnectionStatus, SetSiteDetailsData } from './helpers/utility';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

//App component
const App = (props) => {
	const [isLoading, setIsLoading] = useState(true);

	function getLayout() {
		let layoutCls = VerticalLayout;

		switch (props.layout.layoutType) {
			case "horizontal":
				layoutCls = HorizontalLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	};

	const getUserData = async () => {
		try {
			const responseData = await axios.get('getuser-info');
			if (responseData.status) {
				localStorage.setItem("authUser", btoa(JSON.stringify(responseData.data)));
				localStorage.setItem("=v", btoa(responseData.latest_version));
				setIsLoading(false)
			} else {
				var token = localStorage.getItem(btoa(btoa('token')));
				if (token) {
					localStorage.clear();
					window.location.reload();
				}
			}
			SetConnectionStatus(true)
		} catch (err) {
			SetConnectionStatus(false)
			console.log(err.message);
			setIsLoading(false)
		}
	}

	const getSiteDetailsData = async () => {
		try {
			const data = await axios.get('site-details');
			if (data.status) {
				SetSiteDetailsData(data.data)
			}
		} catch (err) {
			console.log(err.message);
		}
	}

	getUserData();
	getSiteDetailsData();

	const Layout = getLayout();

	const NonAuthmiddleware = ({
		component: Component,
		layout: Layout
	}) => (
		<Route
			render={props => {
				if (localStorage.getItem("authUser") && atob(localStorage.getItem("authUser"))) {
					return (
						<Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
					);
				}

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			}}
		/>
	);

	// if(na)
	if (isLoading) return false;

	return (
		<React.Fragment>
			<div id="app-loader" className="app-loader">
				<img width="5%" src={app_loader} />
			</div>
			<Router>
				<Switch>
					{authRoutes.map((route, idx) => (
						<NonAuthmiddleware
							path={route.path}
							layout={NonAuthLayout}
							component={route.component}
							key={idx}
						/>
					))}

					{userRoutes.map((route, idx) => (
						<Authmiddleware
							path={route.path}
							layout={Layout}
							component={route.component}
							key={idx}
						/>
					))}

				</Switch>
			</Router>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		layout: state.Layout
	};
};

export default connect(mapStateToProps, null)(App);
