"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { SafeUser } from "@/types";

interface RegisterFormProps {
	currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	const router = useRouter();

	useEffect(() => {
		if (currentUser) {
			router.push("/cart");
			router.refresh();
		}
	}, []);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		console.log(data);
		axios.post("/api/register", data).then((res) => {
			toast.success("Account Created Successfully");
			signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			})
				.then((callback) => {
					if (callback?.ok) {
						router.push("/cart");
						router.refresh();
						toast.success("Logged In Successfully");
					}

					if (callback?.error) {
						toast.error(callback.error);
					}
				})
				.catch(() => {
					toast.error("Failed To Log In");
				})
				.finally(() => {
					setIsLoading(false);
				});
		});
	};

	if (currentUser) {
		return <p className="text-center"> Logged in. Redirecting... </p>;
	}

	return (
		<>
			<Heading title="Sign Up For An Account" />
			<Button
				outline
				label="Continue With Google"
				icon={AiOutlineGoogle}
				onClick={() => {
					signIn("google");
				}}
			/>
			<hr className="bg-slate-300 w-full h-px" />
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="email"
				label="Email"
				type="email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Button
				label={isLoading ? "Loading..." : "Sign Up"}
				onClick={handleSubmit(onSubmit)}
			/>
			<p className="text-sm">
				Already Have An Account?
				<Link href="/login" className="underline">
					Login
				</Link>
			</p>
		</>
	);
};

export default RegisterForm;
