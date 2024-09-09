"use server"
import { sql } from '@vercel/postgres';

export async function registerUser(data: { email: string, address: string }): Promise<boolean> {
	const r = JSON.parse(JSON.stringify(data));
	console.log("DATA ON SERVER", r);

	const email = data.email;
	const address = data.address;
	// const email = formData.get("email") as string;
	// const address = formData.get("address") as string;
	// console.log(formData.get("email"), formData.get("address"));
	const result = await sql`INSERT INTO unlock_fun_users (email, address) VALUES (${email}, ${address})`;
	if (result.rowCount && result.rowCount > 0) {
		return true
	}
	return false
}