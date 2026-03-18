import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket, Map as MapIcon, Info } from "lucide-react";

export default function HomePage() {
	return (
		<div className='flex flex-col min-h-screen'>
			{/* Hero Section */}
			<section className='relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950'>
				{/* L'image de fond optionnelle avec un overlay sombre */}
				<div className='absolute inset-0 z-0 opacity-40'>
					{/* Ici, mets l'URL de ton image de jungle/dino si tu en as une */}
					<div className="w-full h-full bg-[url('/img/hero-dino-jungle.jpg')] bg-cover bg-center" />
					<div className='absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950' />
				</div>

				<div className='relative z-10 container text-center space-y-8'>
					{/* TITRE : Corrigé pour le contraste et le style (italic black) */}
					<h1 className='text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.85] text-white'>
						L&apos;aventure <br />
						<span className='text-white'>Rugit</span>
					</h1>

					{/* Sous-titre : Corrigé pour être plus large et lisible */}
					<p className='text-xl md:text-2xl max-w-2xl mx-auto font-light text-slate-200'>
						Plongez dans l&apos;ère du Mésozoïque. Rencontrez nos géants dans
						une expérience immersive unique au monde.
					</p>

					{/* BOUTONS : Corrigé pour l'alignement central (flex items-center) */}
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-6'>
						<Button
							size='lg'
							className='text-lg px-8 py-7 rounded-full w-full sm:w-auto'
							asChild
						>
							<Link href='/tickets'>
								<Ticket className='mr-3 h-5 w-5' /> Réserver mon billet
							</Link>
						</Button>

						<Button
							size='lg'
							variant='outline'
							className='text-lg px-8 py-7 rounded-full w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white'
							asChild
						>
							<Link href='/map'>
								<MapIcon className='mr-3 h-5 w-5' /> Explorer la carte
							</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className='w-full flex items-center justify-around py-24 bg-slate-50 dark:bg-slate-950'>
				<div className='container grid grid-cols-1 md:grid-cols-3 gap-12 text-center'>
					<div className='space-y-4 p-6'>
						<div className='mx-auto w-16 h-16 flex items-center justify-center text-primary'>
							<Info className='h-8 w-8' />
						</div>
						<h3 className='text-2xl font-bold'>Encyclopédie</h3>
						<p className='text-muted-foreground'>
							Apprenez-en plus sur nos 50+ espèces résidentes, du T-Rex au
							paisible Diplodocus.
						</p>
						<Button
							variant='link'
							asChild
						>
							<Link href='/dinosaurs'>Consulter les fiches →</Link>
						</Button>
					</div>

					<div className='space-y-4 p-6'>
						<div className='mx-auto flex items-center justify-center text-primary'>
							<MapIcon className='h-8 w-8' />
						</div>
						<h3 className='text-2xl font-bold'>Carte Interactive</h3>
						<p className='text-muted-foreground'>
							Ne vous perdez pas dans la jungle ! Localisez les enclos et les
							points de restauration.
						</p>
						<Button
							variant='link'
							asChild
						>
							<Link href='/map'>Ouvrir le plan →</Link>
						</Button>
					</div>

					<div className='space-y-4 p-6'>
						<div className='mx-auto flex items-center justify-center text-primary'>
							<Ticket className='h-8 w-8' />
						</div>
						<h3 className='text-2xl font-bold'>Accès Rapide</h3>
						<p className='text-muted-foreground'>
							Pas de compte nécessaire. Achetez vos billets en 2 minutes et
							recevez-les par mail.
						</p>
						<Button
							variant='link'
							asChild
						>
							<Link href='/tickets'>Billetterie →</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
