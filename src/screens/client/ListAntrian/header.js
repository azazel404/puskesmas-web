import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { Button } from "antd";

const Header = (props) => {
	return (
		<React.Fragment>
			<Paper style={{ borderRadius: 0 }}>
				<div
					style={{
						padding: "16px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography style={{ fontWeight: "bold", fontSize: "24px" }}>
						Antrian
					</Typography>
					<Button type="primary" onClick={props.handleActions}>
						Muat Ulang Antrian
					</Button>
				</div>
			</Paper>
		</React.Fragment>
	);
};

export default Header;
