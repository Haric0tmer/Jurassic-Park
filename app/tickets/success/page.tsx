import Link from "next/link";
import {
	CheckCircle2,
	Ticket as TicketIcon,
	Calendar as CalendarIcon,
	ArrowRight,
	Download,
	MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SuccessPage({
	searchParams,
}: {
	searchParams: { orderId?: string };
}) {
	const orderId = searchParams.orderId || "EXT-0000";

	return (
		<div className='container min-h-[80vh] flex items-center justify-center py-20 px-4'>
			<Card className='max-w-md w-full border-t-8 border-t-primary shadow-2xl bg-card/50 backdrop-blur-sm'>
				<CardHeader className='text-center pb-2'>
					<div className='flex justify-center mb-4'>
						<div className='rounded-full bg-green-500/10 p-3 animate-bounce'>
							<CheckCircle2 className='h-12 w-12 text-green-500' />
						</div>
					</div>
					<CardTitle className='text-3xl font-black uppercase italic tracking-tighter'>
						Commande <span className='text-primary'>Confirmée</span>
					</CardTitle>
					<p className='text-muted-foreground'>
						Votre expédition commence bientôt.
					</p>
				</CardHeader>

				<CardContent className='space-y-6 pt-4'>
					{/* Récapitulatif Rapide */}
					<div className='bg-muted/50 rounded-xl p-4 border border-border space-y-3'>
						<div className='flex justify-between items-center text-sm'>
							<span className='text-muted-foreground'>Numéro de commande</span>
							<span className='font-mono font-bold text-primary'>
								{orderId.slice(0, 8).toUpperCase()}
							</span>
						</div>
						<div className='flex justify-between items-center text-sm'>
							<span className='text-muted-foreground'>Statut du paiement</span>
							<Badge
								variant='outline'
								className='bg-green-500/10 text-green-500 border-green-500/20'
							>
								Accepté
							</Badge>
						</div>
					</div>

					<div className='space-y-4'>
						<div className='flex items-start gap-3'>
							<div className='mt-1 bg-primary/10 p-2 rounded-lg'>
								<TicketIcon className='h-4 w-4 text-primary' />
							</div>
							<div>
								<p className='text-sm font-bold text-foreground'>
									Billet numérique généré
								</p>
								<p className='text-xs text-muted-foreground'>
									Un e-mail de confirmation a été envoyé à votre adresse.
								</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<div className='mt-1 bg-primary/10 p-2 rounded-lg'>
								<MapPin className='h-4 w-4 text-primary' />
							</div>
							<div>
								<p className='text-sm font-bold text-foreground'>
									Préparez votre visite
								</p>
								<p className='text-xs text-muted-foreground'>
									N&apos;oubliez pas de consulter la carte interactive pour
									repérer les zones de danger.
								</p>
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter className='flex flex-col gap-3 pt-6'>
					<Button
						className='w-full group'
						size='lg'
						asChild
					>
						<Link href='/map'>
							Explorer la carte{" "}
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
						</Link>
					</Button>

					<div className='grid grid-cols-2 gap-2 w-full'>
						<Button
							variant='outline'
							size='sm'
							className='text-xs'
							asChild
						>
							<Link href='/'>Accueil</Link>
						</Button>
						<Button
							variant='outline'
							size='sm'
							className='text-xs flex gap-2'
						>
							<Download className='h-3 w-3' /> PDF
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
