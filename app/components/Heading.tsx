"use client";

interface HeadingProps {
	titlle: string;
	center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ titlle, center }) => {
	return (
		<div className={center ? "text-center" : "text-start"}>
			<h1 className="font-bold text-2xl">{titlle}</h1>
		</div>
	);
};

export default Heading;
