import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Side_Drawer/SideDrawer";
import { connect } from "react-redux";

class layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		const isShown = this.state.showSideDrawer;
		this.setState({ showSideDrawer: !isShown });
	};

	render() {
		return (
			<React.Fragment>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					clickHandler={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.idToken !== null,
	};
};

export default connect(mapStateToProps)(layout);
