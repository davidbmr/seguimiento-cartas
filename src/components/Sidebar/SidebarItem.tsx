import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface ItemProps {
	path: string;
	sidebarProps: {
		displayText: string;
		icon?: ReactElement;
	};
}

export const SidebarItem = ({
	item,
	styles,
	isResponsive,
}: {
	item: ItemProps;
	styles: CSSModuleClasses;
	isResponsive?: boolean;
}) => {
	const location = useLocation();
	const isActive = item.path === location.pathname;

	return item.sidebarProps && item.path ? (
		<>
			<Link to={item.path} className={`${styles.listItem} ${isActive && styles.active}`}>
				<div className={styles.itemText}>
					<div className={styles.icon}>{item.sidebarProps.icon}</div>
					<label>{isResponsive ? null : item.sidebarProps.displayText}</label>
				</div>
			</Link>
		</>
	) : null;
};
