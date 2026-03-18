"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/prisma/generated/client";
import { redirect } from "next/navigation";

export async function createTicket(formData: FormData) {
	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;
	const email = formData.get("email") as string;
	const birthDateStr = formData.get("birthDate") as string;
	const visitDateStr = formData.get("visitDate") as string;
	const ticketType = formData.get("ticketType") as string;
	const price = parseFloat(formData.get("price") as string);

	if (!birthDateStr || !visitDateStr || !firstName || !lastName || !email) {
		throw new Error("Tous les champs sont obligatoires.");
	}

	const order = await prisma.order.create({
		data: {
			totalAmount: price,
			status: OrderStatus.PAID,
			tickets: {
				create: {
					firstName,
					lastName,
					email,
					birthDate: new Date(birthDateStr),
					visitDate: new Date(visitDateStr),
					ticketType: ticketType,
					price: price,
				},
			},
		},
	});

	// REDIRECTION VERS LA PAGE DE SUCCÈS AVEC L'ID
	redirect(`/tickets/success?orderId=${order.id}`);
}
