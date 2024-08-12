"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import { SafeUser } from "@/types";

interface LoginFormProps {
	currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
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
		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				router.push("/cart");
				router.refresh();
				toast.success("Logged In Successfully");
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	if (currentUser) {
		return <p className="text-center"> Logged in. Redirecting... </p>;
	}

	return (
		<>
			<Heading title="Sign In" />
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
				label={isLoading ? "Loading..." : "Log In"}
				onClick={handleSubmit(onSubmit)}
			/>
			<p className="text-sm">
				Do Not Have An Account?
				<Link href="/register" className="underline">
					Sign Up
				</Link>
			</p>
		</>
	);
};

export default LoginForm;
