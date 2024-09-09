/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { ActionResult } from "next/dist/server/app-render/types"
import { useCallback, useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

const initialState = {
	message: "",
	error: "",
	linkPayload: null
}

type ZodSchema = z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>
type Action = (prevState: any, formData: FormData) => Promise<ActionResult>

export function useFormWithAction(action: Action, zodSchema: ZodSchema) {
	const { toast } = useToast()
	const form = useForm<z.infer<typeof zodSchema>>({
		resolver: zodResolver(zodSchema)
	})
	const [formState, signupWithState] = useFormState(action, initialState);
	const [isPending, startTransition] = useTransition();

	const resetForm = useCallback(() => form.reset(), [form]);

	useEffect(() => {
		if (!formState.error && !formState.message) {
			return;
		}
		if (formState.linkPayload) {
			console.log("formState.linkPayload", formState.linkPayload)
		}
		if (formState.message) {
			toast({
				description: formState.message,
				duration: 5000,
				title: "Success",
			});
			resetForm();
		}
		if (formState.error) {
			toast({
				description: formState.error,
				duration: 5000,
				title: "Error",
			})
		}
	}, [formState.error, formState.linkPayload, formState.message, resetForm, toast]);

	async function handleAction(values: z.infer<typeof zodSchema>) {
		const formData = new FormData();

		for (const [key, value] of Object.entries(values)) {
			formData.set(key, value);
		}

		startTransition(async () => {
			await signupWithState(formData);
		})
	}
	return { form, handleAction, formState, isPending }
}