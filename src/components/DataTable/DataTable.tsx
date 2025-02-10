import React from "react";
import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";

import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

interface DataTableProps {
	isHeaderActive?: any;
	columns: any;
	data: any;
	textAddButton?: any;
	onAddModal?: any;
	onUpdate?: any;
	onDelete?: any;
	onEye?: any;
	isExport?: any;
	isSearch?: boolean;
	children?: React.ReactNode;
}

export const DataTable = ({
	isHeaderActive = true,
	columns,
	data,
	textAddButton,
	onAddModal,
	onUpdate,
	onDelete,
	onEye,
	isExport,
	isSearch,
	children,
}: DataTableProps) => {
	return (
		<SectionStructure>
			{isHeaderActive ? (
				<HeaderDataTable
					isExport={isExport}
					isSearch={isSearch}
					textAddButton={textAddButton ? textAddButton : null}
					onAddModal={onAddModal}
				/>
			) : null}

			{/* Tabla */}
			<PrimeDataTable
				columns={columns}
				data={data}
				onUpdate={onUpdate}
				onDelete={onDelete}
				onEye={onEye}
			/>

			{children ? <div>{children}</div> : null}
		</SectionStructure>
	);
};
