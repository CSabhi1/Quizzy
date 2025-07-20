/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";

import { AppDispatch, RootState } from "@app/redux/store";
// import {
// 	createUserActionCreator,
// 	deleteUserActionCreator,
// 	updateUserActionCreator,
// } from "@app/redux/slices/UserSlice";

// import { useUserFormData } from "./useUserFormData";
import Loader from "@app/shared/components/feedback/Loader";
import { QuestionApiBody } from "@app/shared/types/api.types";
import {
	ModalActions,
	ModalBody,
} from "@app/shared/components/utils/modal/Modal";
import TextFieldComp from "@app/shared/components/inputs/textfield/TextFieldComp";
import SelectComp from "@app/shared/components/inputs/select/SelectComp";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { FormLabel } from "@app/shared/components/utils";
import { mapAnswerChoicesToSelectOptions } from "@app/shared/helpers/form-helper";
import { createQuestion, Question } from "@app/redux/slices/QuestionSlice";
import { useQuestionFormData } from "./useQuestionFormData";

//Component types
type QuestionsFormProps = {
	handleClose: any;
	action: "add" | "edit" | "delete" | string;
	data: any;
};

type FormValues = {
	question: string;
	difficulty: null;
	tags: null;
	answerChoices: { value: string }[];
	correctAnswer: [];
};

const QuestionsForm: React.FC<QuestionsFormProps> = ({
	handleClose,
	action,
	data,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	//Form builder configuration
	const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
		defaultValues: {
			question: "",
			difficulty: null,
			tags: null,
			answerChoices: [{ value: "" }, { value: "" }],
			correctAnswer: [],
		},
	});
	const { fields, remove } = useFieldArray({
		control,
		name: "answerChoices", // this should match your form field name
	});
	const answerChoices = watch("answerChoices");

	const { loading } = useQuestionFormData({
		action,
		data,
		setValue,
	});

	//Form submition
	const onSubmit = (formData: any) => {
		if (!user?.uid) {
			console.error("User ID is undefined");
			return;
		}

		const question: Omit<Question, "id"> = {
			question: formData?.question,
			answerChoices: formData.answerChoices.map((choice: any) => choice.value),
			correctAnswer: formData?.correctAnswer?.value,
			difficulty: formData?.difficulty?.value,
			tags: formData.tags.map((tag: any) => tag.value),
			createdBy: user.uid, // ✅ guaranteed to be string
		};

		if (action === "add") {
			dispatch(createQuestion(question))
				.unwrap()
				.then(() => {
					handleClose(); //pass true if refresh needed
				});
		} else if (action === "edit") {
			// apiData.id = data?.id;
			// dispatch(updateUserActionCreator(apiData))
			// 	.unwrap()
			// 	.then(() => {
			// 		handleClose(true);
			// 	});
		} else {
			// apiData.id = data?.id;
			// dispatch(deleteUserActionCreator(apiData))
			// 	.unwrap()
			// 	.then(() => {
			// 		handleClose(true);
			// 	});
		}
	};

	const options = [
		{ value: "hard", label: "Hard" },
		{ value: "medium", label: "Medium" },
		{ value: "easy", label: "Easy" },
	];

	const tags = [
		{ value: "math", label: "Math" },
		{ value: "logic", label: "Logic" },
		{ value: "puzzle", label: "Puzzle" },
		{ value: "software-engineering", label: "Software Engineering" },
		{ value: "system-design", label: "System Design" },
		{ value: "frontend", label: "Frontend" },
		{ value: "backend", label: "Backend" },
		{ value: "fullstack", label: "Fullstack" },
		{ value: "database", label: "Database" },
	];

	//Render form body
	const renderFormContent = () => {
		if (action === "delete") {
			return <Typography>Do you want to delete '{data?.name}'?</Typography>;
		}

		return (
			<Grid container rowSpacing={3} columnSpacing={4}>
				<Grid size={{ xs: 12, sm: 12, md: 12 }}>
					<Controller
						name="question"
						control={control}
						rules={{
							required: "Question required",
							pattern: {
								value: /.*\S.*/,
								message: "Please enter valid text.",
							},
						}}
						render={({ field, fieldState }) => (
							<TextFieldComp
								errors={fieldState.error?.message}
								inputType="text"
								field={field}
								label="Question"
								placeholder="Enter your question here"
								requiredLabel
								multiline
								rows={3}
							/>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Controller
						name="difficulty"
						control={control}
						rules={{ required: "Difficulty level required" }}
						render={({ field, fieldState }) => (
							<SelectComp
								{...field}
								options={options}
								label="Difficulty Level"
								onChange={(selected) => field.onChange(selected)}
								errors={fieldState.error?.message}
								requiredLabel
							/>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Controller
						name="tags"
						control={control}
						rules={{ required: "tags required" }}
						render={({ field, fieldState }) => (
							<SelectComp
								{...field}
								options={tags}
								label="tags"
								isMulti={true}
								onChange={(selected) => field.onChange(selected)}
								errors={fieldState.error?.message}
								requiredLabel
							/>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<FormLabel label="Answer Choices" requiredLabel={true}></FormLabel>

					{fields.map((field, index) => (
						<Grid
							container
							spacing={2}
							alignItems="center"
							key={field.id}
							mb={1}
						>
							<Grid>
								<Controller
									name={`answerChoices.${index}.value`}
									control={control}
									rules={{
										required: "Choice is required",
									}}
									render={({ field, fieldState }) => (
										<TextFieldComp
											errors={fieldState.error?.message}
											inputType="text"
											field={field}
										/>
									)}
								/>
							</Grid>
							<Grid>
								<IconButton
									disabled={fields.length <= 2}
									onClick={() => remove(index)}
									size="small"
								>
									<CloseIcon fontSize="small" />
								</IconButton>
							</Grid>
						</Grid>
					))}

					<Button
						startIcon={<AddIcon />}
						onClick={() =>
							setValue("answerChoices", [...answerChoices, { value: "" }])
						}
						sx={{ mt: 1 }}
						variant="outlined"
					>
						Add Choice
					</Button>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Controller
						name="correctAnswer"
						control={control}
						rules={{ required: "Correct answer required" }}
						render={({ field, fieldState }) => (
							<SelectComp
								{...field}
								options={mapAnswerChoicesToSelectOptions(answerChoices)}
								label="Correct Answer"
								onChange={(selected) => field.onChange(selected)}
								errors={fieldState.error?.message}
								requiredLabel
							/>
						)}
					/>
				</Grid>
			</Grid>
		);
	};

	//Form buttons
	const renderActionButton = () => {
		switch (action) {
			case "add":
				return (
					<Button type="submit" variant="contained">
						Submit
					</Button>
				);
			case "edit":
				return (
					<Button type="submit" variant="contained">
						Update
					</Button>
				);
			case "delete":
				return (
					<Button type="submit" variant="contained">
						Delete
					</Button>
				);
			default:
				return null;
		}
	};

	return (
		<>
			{/* <Loader /> */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<ModalBody>{renderFormContent()}</ModalBody>
				<ModalActions>
					<Button
						type="button"
						variant="outlined"
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Button>
					{renderActionButton()}
				</ModalActions>
			</form>
		</>
	);
};

export default QuestionsForm;
