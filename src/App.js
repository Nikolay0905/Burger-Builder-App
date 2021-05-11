import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import Logout from "./containers/Auth/Logout/Logout";

import { ROUTES } from "./routes";
import * as actionTypes from "./Store/Actions/compiled";

const NotFound = React.lazy(() =>
	import("./components/Other/NotFoundPage/NotFound"),
);

const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
	componentDidMount() {
		this.props.onAutoAuthentication();
	}

	render() {
		let routes = (
			<Switch>
				<Route exact path={ROUTES.burger} component={BurgerBuilder} />
				<Suspense fallback={<div>Loading...</div>}>
					<Route path={ROUTES.authentication} component={Auth} />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<Route component={NotFound} />
				</Suspense>
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route exact path={ROUTES.burger} component={BurgerBuilder} />
					<Route path={ROUTES.checkout} component={Checkout} />
					<Route path={ROUTES.orders} component={Orders} />
					<Suspense fallback={<div>Loading...</div>}>
						<Route path={ROUTES.authentication} component={Auth} />
					</Suspense>
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
