"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	CalendarIcon,
	Loader2,
	Ticket as TicketIcon,
	CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { createTicket } from "@/lib/db/tickets";

const TICKET_TYPES = {
	ENFANT: { label: "Enfant (-12 ans)", price: 15 },
	ETUDIANT: { label: "Étudiant", price: 18 },
	ADULTE: { label: "Adulte", price: 25 },
	SENIOR: { label: "Senior (+65 ans)", price: 20 },
	VIP: { label: "Pass VIP (Accès Prioritaire)", price: 50 },
} as const;

type TicketTypeCode = keyof typeof TICKET_TYPES;

export default function TicketPage() {
	const [date, setDate] = useState<Date>();
	const [birthDate, setBirthDate] = useState<Date>();
	const [ticketType, setTicketType] = useState<TicketTypeCode>("ADULTE");
	const [isPending, setIsPending] = useState(false);

	const currentPrice = TICKET_TYPES[ticketType].price;

	async function handleFormAction(formData: FormData) {
		setIsPending(true);

		// 1. On prépare les données hors du try/catch pour la clarté
		if (date) formData.append("visitDate", date.toISOString());
		if (birthDate) formData.append("birthDate", birthDate.toISOString());
		formData.append("ticketType", ticketType);
		formData.append("price", currentPrice.toString());

		try {
			// 2. On appelle l'action
			await createTicket(formData);
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message !== "NEXT_REDIRECT") {
					console.error(error);
					alert("Une erreur est survenue lors de la réservation.");
					setIsPending(false); // On ne remet à false que s'il y a une vraie erreur
				}
			}
		}
	}

	return (
		<div className='container mx-auto max-w-2xl py-20 px-4'>
			<div className='text-center mb-10 space-y-3'>
				<h1 className='text-4xl font-extrabold tracking-tight text-foreground uppercase italic'>
					Billetterie <span className='text-primary'>Expédition</span>
				</h1>
				<p className='text-muted-foreground'>
					Réservez votre créneau pour une rencontre inoubliable.
				</p>
			</div>

			<form action={handleFormAction}>
				<Card className='shadow-2xl border-primary/10 bg-card/50 backdrop-blur-sm'>
					<CardHeader className='border-b bg-muted/20'>
						<CardTitle className='flex items-center gap-2 text-foreground'>
							<TicketIcon className='h-5 w-5 text-primary' />
							Détails du visiteur
						</CardTitle>
						<CardDescription>
							Pas besoin de compte, vos billets arrivent par email.
						</CardDescription>
					</CardHeader>

					<CardContent className='space-y-6 pt-6'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label
									htmlFor='firstName'
									className='text-foreground font-semibold'
								>
									Prénom
								</Label>
								<Input
									name='firstName'
									id='firstName'
									placeholder='Alan'
									required
									className='bg-background'
								/>
							</div>
							<div className='space-y-2'>
								<Label
									htmlFor='lastName'
									className='text-foreground font-semibold'
								>
									Nom
								</Label>
								<Input
									name='lastName'
									id='lastName'
									placeholder='Grant'
									required
									className='bg-background'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label
								htmlFor='email'
								className='text-foreground font-semibold'
							>
								Email de réception
							</Label>
							<Input
								name='email'
								id='email'
								type='email'
								placeholder='paleo@exemple.fr'
								required
								className='bg-background'
							/>
						</div>

						<div className='space-y-2'>
							<Label className='text-foreground font-semibold'>
								Type de billet
							</Label>
							<Select
								defaultValue='ADULTE'
								onValueChange={(v) => setTicketType(v as TicketTypeCode)}
							>
								<SelectTrigger className='w-full bg-background border-input'>
									<SelectValue placeholder='Choisir un tarif' />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(TICKET_TYPES).map(([code, info]) => (
										<SelectItem
											key={code}
											value={code}
										>
											{info.label} — {info.price} €
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='flex flex-col space-y-2'>
								<Label className='text-foreground font-semibold'>
									Date de naissance
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											className={cn(
												"justify-start text-left font-normal bg-background",
												!birthDate && "text-muted-foreground",
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4 text-primary' />
											{birthDate
												? format(birthDate, "PPP", { locale: fr })
												: "Sélectionner"}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'
									>
										<Calendar
											mode='single'
											selected={birthDate}
											onSelect={setBirthDate}
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className='flex flex-col space-y-2'>
								<Label className='text-foreground font-semibold'>
									Date de visite
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											className={cn(
												"justify-start text-left font-normal bg-background font-bold border-primary/30",
												!date && "text-muted-foreground",
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4 text-primary' />
											{date
												? format(date, "PPP", { locale: fr })
												: "Choisir un jour"}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'
									>
										<Calendar
											mode='single'
											selected={date}
											onSelect={setDate}
											disabled={(d) => d < new Date()}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</CardContent>

					<CardFooter className='bg-muted/50 p-8 flex flex-col items-stretch gap-6 border-t'>
						<div className='flex justify-between items-center'>
							<div className='flex flex-col'>
								<span className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
									Total à payer
								</span>
								<span className='text-xs text-muted-foreground italic flex items-center gap-1'>
									<CheckCircle2 className='h-3 w-3 text-green-500' /> Validation
									immédiate
								</span>
							</div>
							<span className='text-5xl font-black text-foreground'>
								{currentPrice}
								<span className='text-2xl text-primary ml-1'>€</span>
							</span>
						</div>

						<Button
							size='lg'
							className='w-full text-xl h-16 shadow-xl rounded-xl transition-all hover:scale-[1.02]'
							disabled={isPending || !date || !birthDate}
						>
							{isPending ? (
								<Loader2 className='mr-2 h-6 w-6 animate-spin' />
							) : (
								"Générer mon billet"
							)}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
