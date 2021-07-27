import React from "react";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";

const CardLoading = (props) => {
	return (
		<Paper style={{ marginBottom: "12px", borderRadius: "12px" }}>
			<div
				style={{
					// height: "74px",
					padding: "12px",
				}}
			>
				<Typography variant="body2" color="textSecondary" component="p">
					<Skeleton height={"14px"} width={"100%"} />
				</Typography>

				<Typography variant="body2" color="textSecondary" component="p">
					<Skeleton height={"14px"} width={"80%"} />
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					<Skeleton height={"14px"} width={"70%"} />
				</Typography>
			</div>
		</Paper>
	);
};

export default CardLoading;
