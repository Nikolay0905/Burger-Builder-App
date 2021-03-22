import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Side_Drawer/SideDrawer";

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
					clickHandler={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<SideDrawer
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<main className={classes.Content}>{this.props.children}</main>
				<p>Test</p>
			</React.Fragment>
		);
	}
}

export default layout;
