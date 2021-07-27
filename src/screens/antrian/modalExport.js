import React from "react";
import { InputPicker, SelectField } from "../../components/Form";
import { Button, Modal, Form, Input, Table, Space } from "antd";

import { useForm } from "react-hook-form";

const ListPuskesmas = (props) => {
	const [initialValues, setInitialValues] = React.useState({
		status_antrian: "",
		startDate: "",
		endDate: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		defaultValues: initialValues,
	});

	const { isOpen, handleCancel } = props;

	return (
		<>
			<Modal title="Puskesmas" visible={isOpen} footer={null} onCancel={handleCancel}>
				<form onSubmit={handleSubmit(props.onSubmit)}>
					<div style={{ marginBottom: "14px" }}>
						<InputPicker
							name="startDate"
							control={control}
							label="Start Date"
							errormessage={errors.startDate?.message}
						/>
					</div>
					<div style={{ marginBottom: "14px" }}>
						<InputPicker
							name="endDate"
							control={control}
							label="End Date"
							errormessage={errors.endDate?.message}
						/>
					</div>
					{/* <div style={{ marginBottom: "14px" }}>
						<SelectField
							name="status_antrian"
							control={control}
							label="Status Antrian"
							options={statusAntrianOptions}
							errormessage={errors.status_antrian?.message}
						/>
					</div> */}
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							paddingTop: "24px",
						}}
					>
						<Button key="back" onClick={handleCancel}>
							Cancel
						</Button>
						<Button htmlType="submit" key="submit" type="primary">
							Submit
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default ListPuskesmas;
