"use client";

import { Icon } from "@mui/material";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
	selected?: boolean;
	label: string;
	icon: IconType;
	onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
	selected,
	label,
	icon,
	onClick,
}) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`rounded-xl 
                border-2 
                p-4 
                flex 
                flex-col 
                items-center 
                gap-2 
                hover:border-slate-500 
                transistion 
                cursor-pointer
                ${selected ? "border-slate-500" : "border-slate-200"}
                `}
		>
			<Icon size={30} component={icon} />
			<div className="font-medium"> {label} </div>
		</div>
	);
};

export default CategoryInput;
