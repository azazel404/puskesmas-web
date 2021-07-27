import React, { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";

import HowToRegIcon from "@material-ui/icons/HowToReg";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";

const navigationMenu = {
	praktik: 0,
	antrian: 1,
	akun: 2,
};

const Navigation = (props) => {
	const [value, setValue] = useState(0);

	const location = useLocation();

	useEffect(() => {
		const { pathname } = location;

		if (pathname.includes("/praktik")) {
			setValue(0);
		} else if (pathname.includes("/antrian")) {
			setValue(1);
		} else if (pathname.includes("/akun")) {
			setValue(2);
		}
	}, [location]);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
				switch (newValue) {
					case navigationMenu.praktik:
						props.history.push({ pathname: "/praktik" });
						break;
					case navigationMenu.antrian:
						props.history.push({
							pathname: "/antrian",
						});
						break;
					case navigationMenu.akun:
						props.history.push({
							pathname: "/akun",
						});
						break;
					default:
						props.history.push({ pathname: "/" });
						break;
				}
			}}
			showLabels
			style={{
				width: "100%",
				boxShadow: "0px -2px 1px -1px rgba(0,0,0,0.3)",
			}}
		>
			<BottomNavigationAction label="Praktik" icon={<HowToRegIcon />} />
			<BottomNavigationAction label="Antrian" icon={<AssignmentIcon />} />
			<BottomNavigationAction label="Akun" icon={<PersonIcon />} />
		</BottomNavigation>
	);
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
