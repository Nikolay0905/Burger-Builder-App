import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import NotFound from "./components/Other/NotFoundPage/NotFound";

import { Redirect, Route, Switch } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Layout>
						<Switch>
							<Route path="/burger" component={BurgerBuilder} />
							<Route path="/checkout" component={Checkout} />
							<Route path="/orders" component={Orders} />
							<Route path="/authentication" component={Auth} />
							<Route component={NotFound} />
						</Switch>
					</Layout>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
