export type QuestionApiBody = {
	id?: number;
	name: string;
	email: string;
	designation_id: number;
	company_employee_id: number;
	stream_id: number;
	virtual_team_id?: number | null;
	sub_virtual_team_id?: number | null;
	role_id: number[];
};
