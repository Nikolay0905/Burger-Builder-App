import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import NotFound from "./components/Other/NotFoundPage/NotFound";
import { ROUTES } from "./routes";

import { Route, Switch } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Layout>
						<Switch>
							<Route exact path={ROUTES.burger} component={BurgerBuilder} />
							<Route path={ROUTES.checkout} component={Checkout} />
							<Route path={ROUTES.orders} component={Orders} />
							<Route path={ROUTES.authentication} component={Auth} />
							<Route path={ROUTES.logout} component={Logout} />
							<Route component={NotFound} />
						</Switch>
					</Layout>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
