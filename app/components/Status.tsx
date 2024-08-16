import React from "react";
import { IconType } from "react-icons";

export interface StatusProps {
	text: string;
	icon: IconType;
	bg: string;
	color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
	return (
		<div
			className={`
        ${bg}
        ${color}
        px-1
        rounded
        flex
        items-center
        justify-center
        gap-1
        max-h-[25px]
    `}
		>
			{text} <Icon size={15} />
		</div>
	);
};

export default Status;
