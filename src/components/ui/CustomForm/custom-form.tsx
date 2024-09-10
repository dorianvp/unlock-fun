"use client"

import { z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../form"
import { registerUser } from '../../../lib/actions/user';
import { Input } from "../input";
import { Button } from "../button";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useFormWithAction } from "@/lib/hooks/form";
import { MouseEvent } from "react";
import RingLoader from "../icons/ring";
import { useFormStatus } from "react-dom";
import { toast } from "sonner"

export function CustomForm() {
	const formSchema = z.object({
		email: z.string().min(4).max(50).email("must be a valid email address"),
		address: z.string().default(""),
	})

	const { pending } = useFormStatus();
	// @ts-expect-error TODO
	const { form } = useFormWithAction(registerUser, formSchema)

	const { address } = useAccount();
	const { openConnectModal } = useConnectModal();

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (address) {
			values.address = address
			registerUser(values).then(data => {
				if (data) {
					toast("Signup Successful")
				}
			})
		}

	}
	return (
		<Form
			{...form}
		>

			<form
				// @ts-expect-error TODO
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col md:flex-row gap-4 justify-start items-start">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className='flex flex-col w-full md:w-3/4 xl:w-5/12'>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter Email"
									className="w-full font-sans placeholder-white text-white"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{
					address ? (
						<Button
							type='submit'
							className="w-full md:w-auto font-sans font-bold text-blue-900 transition-transform duration-100 bg-foreground hover:bg-foreground/90 hover:scale-105"
						>
							sign me up
						</Button>

					) : (
						pending ? (
							<RingLoader />
						) : (

							<Button
								onClick={(event: MouseEvent<HTMLButtonElement>) => {
									event.preventDefault();
									openConnectModal?.()
								}}
								className="w-full md:w-auto font-sans font-bold text-blue-900 transition-transform duration-100 bg-foreground hover:bg-foreground/90 hover:scale-105"
							>
								connect
							</Button>
						)
					)
				}
			</form>
		</Form>
	)
}