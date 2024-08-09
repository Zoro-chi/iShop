"use client";

import { CartProductType } from "./ProductDetails";

interface SetQuantityProps {
	cartCounter?: boolean;
	cartProduct: CartProductType;
	handleQtyIncrement: () => void;
	handleQtyDecrement: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 cursor-pointer px-2 rounded";

const SetQuantity: React.FC<SetQuantityProps> = ({
	cartCounter,
	cartProduct,
	handleQtyIncrement,
	handleQtyDecrement,
}) => {
	return (
		<div className="flex gap-8 items-center">
			{cartCounter ? null : <div className="font-semibold"> QUANTITY: </div>}
			<div className="flex gap-4 items-center text-base ">
				<button onClick={handleQtyDecrement} className={btnStyles}>
					-
				</button>
				<span> {cartProduct.quantity} </span>
				<button onClick={handleQtyIncrement} className={btnStyles}>
					+
				</button>
			</div>
		</div>
	);
};

export default SetQuantity;
