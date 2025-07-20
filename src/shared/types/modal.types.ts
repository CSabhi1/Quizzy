export type ModalData = {
	name: string;
	id: string | number;
	user_id?: string | number;
};

export type ModalSate = {
	modalOpen: boolean;
	modalHeading: string;
	action: string;
	modalData: ModalData;
};
