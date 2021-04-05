import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import NotFound from "./components/Other/NotFoundPage/NotFound";

import { ROUTES } from "./routes";
import * as actionTypes from "./Store/Actions/compiled";

class App extends Component {
	componentDidMount() {
		this.props.onAutoAuthentication();
	}

	render() {
		let routes = (
			<Switch>
				<Route exact path={ROUTES.burger} component={BurgerBuilder} />
				<Route path={ROUTES.authentication} component={Auth} />
				<Route component={NotFound} />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route exact path={ROUTES.burger} component={BurgerBuilder} />
					<Route path={ROUTES.checkout} component={Checkout} />
					<Route path={ROUTES.orders} component={Orders} />
					<Route path={ROUTES.authentication} component={Auth} />
					<Route path={ROUTES.logout} component={Logout} />
					<Route component={NotFound} />
				</Switch>
			);
		}

		return (
			<React.Fragment>
				<div>
					<Layout>{routes}</Layout>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.idToken !== null,
	};
};

const dispatchActions = (dispatch) => {
	return {
		onAutoAuthentication: () => dispatch(actionTypes.autoAuthenticate()),
	};
};
export default withRouter(connect(mapStateToProps, dispatchActions)(App));
