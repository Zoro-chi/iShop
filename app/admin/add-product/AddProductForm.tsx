"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import { categories, colors } from "@/app/utils";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import SelectColor from "@/app/components/inputs/SelectColor";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";

export type ImageType = {
	color: string;
	colorCode: string;
	image: File | null;
};

export type UploadedImageType = {
	color: string;
	colorCode: string;
	image: string;
};

const AddProductForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState<ImageType[] | null>();
	const [isProductCreated, setIsProductCreated] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			description: "",
			brand: "",
			category: "",
			inStock: false,
			images: [],
			price: "",
		},
	});

	useEffect(() => {
		setCustomValue("images", images);
	}, [images]);

	useEffect(() => {
		if (isProductCreated) {
			reset();
			setImages(null);
			setIsProductCreated(false);
		}
	}, []);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log("Product Data", data);
		// Upload images to firebase
		setIsLoading(true);
		let uploadedImages: UploadedImageType[] = [];

		if (!data.category) {
			setIsLoading(false);
			return toast.error("Please Select A Category");
		}

		if (!data.images || data.images.length === 0) {
			setIsLoading(false);
			return toast.error("No Selected Image");
		}

		const handleImageUploads = async () => {
			toast("Creating Products, Please Wait...");
			try {
				for (const item of data.images) {
					if (item.image) {
						const fileName = new Date().getTime() + "-" + item.image.name;
					}
				}
			} catch (error) {}
		};

		// Save Product to MongoDB
	};

	const category = watch("category");

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const addImageToState = useCallback((value: ImageType) => {
		setImages((prev) => {
			if (!prev) return [value];
			return [...prev, value];
		});
	}, []);

	const removeImageFromState = useCallback((value: ImageType) => {
		setImages((prev) => {
			if (prev) {
				const filteredImages = prev.filter(
					(item) => item.color !== value.color
				);
				return filteredImages;
			}
			return prev;
		});
	}, []);

	return (
		<>
			<Heading title="Add A Product" center />
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="price"
				label="Price"
				type="number"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="brand"
				label="Brand"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextArea
				id="description"
				label="Description"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<CustomCheckBox
				id="inStock"
				register={register}
				label="This Product Is In Stock"
			/>

			<div className="w-full font-medium">
				<div className="mb-2 font-semibold"> Select A Category </div>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
					{categories.map((item) => {
						if (item.label === "All") return null;

						return (
							<div key={item.label} className="col-span">
								<CategoryInput
									onClick={(category) => setCustomValue("category", category)}
									selected={category === item.label}
									label={item.label}
									icon={item.icon}
								/>
							</div>
						);
					})}
				</div>
			</div>
			<div className="w-full flex flex-col flex-wrap gap-4">
				<div className="font-bold">
					Select The Available Product Colors And Upload Their Images.
				</div>
				<div className="text-sm">
					You Must Upload An Image For Each Of The Color Selection, Otherwise
					Your Color Selection Will Be Ignored.
				</div>
				<div className="grid grid-cols-2 gap-3">
					{colors.map((item, index) => {
						return (
							<SelectColor
								key={index}
								item={item}
								addImageToState={addImageToState}
								removeImageFromState={removeImageFromState}
								isProductCreated={isProductCreated}
							/>
						);
					})}
				</div>
			</div>
			<Button
				label={isLoading ? "Loading..." : "Add Product"}
				onClick={handleSubmit(onSubmit)}
			/>
		</>
	);
};

export default AddProductForm;
