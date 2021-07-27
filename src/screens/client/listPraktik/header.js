import React from "react";
import { Paper, Typography } from "@material-ui/core";

const Header = (props) => {
	return (
		<React.Fragment>
			<Paper style={{ borderRadius: 0 }}>
				<div
					style={{
						padding: "16px",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Typography style={{ fontWeight: "bold", fontSize: "24px" }}>
						{props.name}
					</Typography>
				</div>
			</Paper>
		</React.Fragment>
	);
};

export default Header;
