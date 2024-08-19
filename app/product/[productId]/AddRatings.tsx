"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";

import { Order, Product, Review } from "@prisma/client";
import { SafeUser } from "@/types";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import axios from "axios";

interface AddRatingsProps {
	product: Product & {
		reviews: Review[];
	};
	user:
		| (SafeUser & {
				orders: Order[];
		  })
		| null;
}

const AddRatings: React.FC<AddRatingsProps> = ({ product, user }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			rating: 0,
			comment: "",
		},
	});

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldValidate: true,
			shouldTouch: true,
		});
	};

	const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		if (!data.rating) {
			setIsLoading(false);
			return toast.error("Please rate the product");
		}
		const ratingData = { ...data, userId: user?.id, product: product };

		axios
			.post("/api/rating", ratingData)
			.then((response) => {
				toast.success("Product Rated Successfully");
				router.refresh();
				reset();
			})
			.catch((error) => {
				toast.error("Failed to rate the product");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	if (!user || !product) return null;

	const deliveredOrder = user?.orders.some(
		(order) =>
			order.products.find((item) => item.id === product.id) &&
			order.deliveryStatus === "delivered"
	);

	const userReview = product?.reviews.find((review: Review) => {
		return review.userId === user.id;
	});

	if (userReview || !deliveredOrder) return null;

	return (
		<div className="flex flex-col gap-2 max-w-[500px]">
			<Heading title="Rate This Product" />
			<Rating
				name="rating"
				onChange={(event, newValue) => {
					setCustomValue("rating", newValue);
				}}
			/>
			<Input
				id="comment"
				label="Comment"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Button
				label={isLoading ? "Loading..." : "Rate Product"}
				onClick={handleSubmit(onSubmit)}
			/>
		</div>
	);
};

export default AddRatings;
