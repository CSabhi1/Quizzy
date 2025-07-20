/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import PageContainer from "@app/layout/page-container/PageContainer";
import { Card, EmptyPlaceholder } from "@app/shared/components/surface";
import { Title } from "./Questions.styles";
import { ModalSate } from "@app/shared/types/modal.types";
import Modal from "@app/shared/components/utils/modal/Modal";
import QuestionsForm from "./questions-form/QuestionsForm";
import { AppDispatch, RootState } from "@app/redux/store";
import { fetchQuestions, Question } from "@app/redux/slices/QuestionSlice";
import Table from "@app/shared/components/table/Table";
import { ExtendedColumnDef } from "@app/shared/types/table.types";
import AnswerChoicesCell from "./questions-custom-cells/ChoiseCell";
import TagsCell from "./questions-custom-cells/TagsCell";
import DifficultyCell from "./questions-custom-cells/DifficultyCell";
import { TableActionContainer } from "@app/shared/components/table";

const Questions: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { questions, loading } = useSelector(
		(state: RootState) => state.questions
	);

	const [questionModal, setQuestionModal] = useState<ModalSate>({
		modalOpen: false,
		modalHeading: "",
		action: "",
		modalData: { name: "", id: "" },
	});
	console.log(questions);

	// Wrapper for api call
	const fetchTicketDataData = async (params: {
		page: number;
		pageSize: number;
		sortField?: string;
		sortOrder?: "asc" | "desc";
		searchText?: string;
		searchField?: string;
		filter?: any;
		userId: string;
	}): Promise<{ data: any[]; totalCount: number }> => {
		const action = await dispatch(fetchQuestions(params));
		return unwrapResult(action);
	};

	// Handling modal actions add, edit and delete
	const handleModalAction = (action: string, value?: any) => {
		const userDetails = value?.row?.original || {};
		setQuestionModal({
			modalOpen: true,
			modalHeading: `${
				action.charAt(0).toUpperCase() + action.slice(1)
			} Question`,
			action,
			modalData: {
				name: userDetails?.name,
				id: userDetails?.id,
			},
		});
	};

	// Handlling modal close
	const handleClose = () => {
		setQuestionModal((prev) => ({ ...prev, modalOpen: false }));
	};

	const EmptyPlaceholderComp = () => (
		<EmptyPlaceholder
			icon={<HelpOutlineIcon fontSize="inherit" />}
			title="No questions yet"
			subtitle="Start by adding questions to your question bank"
			action={
				<Button
					variant="contained"
					endIcon={<AddOutlinedIcon />}
					onClick={() => handleModalAction("add")}
				>
					Add Your First Question
				</Button>
			}
		/>
	);

	// Action buttons for each user row
	const actions = useCallback(
		(value: { row: { original: any } }) => (
			<TableActionContainer>
				<IconButton onClick={() => handleModalAction("edit", value)}>
					<ModeOutlinedIcon fontSize="small"></ModeOutlinedIcon>
				</IconButton>
				<IconButton onClick={() => handleModalAction("delete", value)}>
					<DeleteOutlineIcon fontSize="small"></DeleteOutlineIcon>
				</IconButton>
			</TableActionContainer>
		),
		[]
	);

	/**
	 * Defines table columns with sorting and search capabilities.
	 */
	const columns = useMemo<ExtendedColumnDef<Question>[]>(
		() => [
			{
				accessorKey: "question",
				header: "Question",
				isSearch: true,
				enableSorting: true,
			},
			{
				accessorKey: "answerChoices",
				header: "Options",
				cell: ({ row }) => (
					<AnswerChoicesCell
						answerChoices={row.original.answerChoices}
						correctAnswer={row.original.correctAnswer}
					/>
				),
			},
			{
				accessorKey: "tags",
				header: "Tags",
				isSearch: true,
				cell: ({ row }) => <TagsCell tags={row.original.tags} />,
			},
			{
				accessorKey: "difficulty",
				header: "Difficulty",
				isSearch: true,
				cell: ({ row }) => (
					<DifficultyCell difficulty={row.original.difficulty} />
				),
			},
			{
				header: "Actions",
				accessorKey: "actions",
				cell: actions,
				enableSorting: false,
				className: "action-class",
			},
		],
		[actions]
	);

	return (
		<>
			<PageContainer
				title="Questions"
				subTitle="Create and manage your quiz questions"
				buttons={
					<Button
						onClick={() => handleModalAction("add")}
						endIcon={<AddOutlinedIcon />}
						variant="contained"
					>
						Add Question
					</Button>
				}
			>
				<Card
					sx={{
						overflow: "hidden",
					}}
				>
					<Box sx={{ display: "flex", gap: "5px" }}>
						<HelpOutlineIcon sx={{ marginLeft: "-5px" }} color="primary" />
						<Title>Question Bank </Title>
					</Box>
					<Typography marginTop="10px">
						You have {questions.totalCount} questions in your question bank
					</Typography>
					<br />

					{questions?.totalCount === 0 && !loading
						? EmptyPlaceholderComp()
						: ""}

					<Table
						columns={columns}
						tableData={questions}
						loading={loading}
						fetchData={fetchTicketDataData}
						// filterComp={<TicketFilter onFilterChange={setFilters} />}
						// filterData={filters}
					/>
				</Card>
			</PageContainer>
			<Modal
				open={questionModal.modalOpen}
				handleClose={handleClose}
				heading={questionModal.modalHeading}
				body={
					<QuestionsForm
						handleClose={handleClose}
						action={questionModal.action}
						data={questionModal.modalData}
					/>
				}
			/>
		</>
	);
};

export default Questions;
