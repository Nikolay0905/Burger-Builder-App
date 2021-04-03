import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actionTypes from "../../../Store/Actions/compiled";

import { ROUTES } from "../../../routes";

class Logout extends Component {
	componentDidMount() {
		this.props.logout();
	}

	render() {
		return <Redirect to={ROUTES.burger} />;
	}
}

const dispatchActions = (dispatch) => {
	return {
		logout: () => dispatch(actionTypes.logout()),
	};
};
export default connect(null, dispatchActions)(Logout);
