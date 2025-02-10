export type PropsChildren = {
	children: React.ReactNode;
};

export type PropsModal = {
	handleCloseModal: () => void;
};

export type Role =  "ADMIN" | "USER" | undefined