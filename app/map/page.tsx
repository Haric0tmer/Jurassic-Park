"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, ShieldAlert, Trees, Utensils, ShoppingBag, Toilet, Waves, Crosshair } from "lucide-react";

type ParkSpot = {
	id: string;
	name: string;
	description: string;
	x: number;
	y: number;
	color: string;
	icon: "center" | "danger" | "nature" | "food" | "shop" | "toilet" | "water";
};

const SPOTS: ParkSpot[] = [
	{
		id: "visitor-center",
		name: "Visitor Center",
		description: "Point de depart des visites guidees, accueil et billetterie sur place.",
		x: 44,
		y: 44,
		color: "bg-amber-500",
		icon: "center",
	},
	{
		id: "emergency-bunkers",
		name: "Emergency Bunkers",
		description: "Zone de securite renforcee ouverte en cas d'alerte majeure.",
		x: 27,
		y: 14,
		color: "bg-yellow-500",
		icon: "danger",
	},
	{
		id: "trex-sector",
		name: "Secteur T-Rex",
		description: "Enclos a tres haut risque. Observation uniquement depuis les points autorises.",
		x: 80,
		y: 33,
		color: "bg-red-600",
		icon: "danger",
	},
	{
		id: "herbivore-plains",
		name: "Plaines Herbivores",
		description: "Zone calme et panoramique pour observer les especes herbivores.",
		x: 56,
		y: 63,
		color: "bg-emerald-600",
		icon: "nature",
	},
	{
		id: "lagoon",
		name: "Lagon Aquatique",
		description: "Bassin du Mosasaurus. Demonstrations sur horaires encadres.",
		x: 85,
		y: 70,
		color: "bg-cyan-600",
		icon: "water",
	},
	{
		id: "restaurant",
		name: "Restaurant",
		description: "Restauration principale du parc, vue sur la cote est.",
		x: 74,
		y: 82,
		color: "bg-blue-600",
		icon: "food",
	},
	{
		id: "toilets",
		name: "Toilets",
		description: "Sanitaires publics a proximite immediate des zones commerciales.",
		x: 51,
		y: 88,
		color: "bg-indigo-600",
		icon: "toilet",
	},
	{
		id: "souvenir-shop",
		name: "Souvenir Shop",
		description: "Boutique officielle du parc: textiles, maquettes et souvenirs.",
		x: 66,
		y: 88,
		color: "bg-orange-600",
		icon: "shop",
	},
];

function getSpotIcon(icon: ParkSpot["icon"]) {
	switch (icon) {
		case "center":
			return <MapPin className='h-4 w-4' />;
		case "danger":
			return <ShieldAlert className='h-4 w-4' />;
		case "nature":
			return <Trees className='h-4 w-4' />;
		case "food":
			return <Utensils className='h-4 w-4' />;
		case "shop":
			return <ShoppingBag className='h-4 w-4' />;
		case "toilet":
			return <Toilet className='h-4 w-4' />;
		default:
			return <Waves className='h-4 w-4' />;
	}
}

export default function ParkMapPage() {
	const [selectedId, setSelectedId] = useState(SPOTS[0].id);

	const selectedSpot = useMemo(
		() => SPOTS.find((spot) => spot.id === selectedId) ?? SPOTS[0],
		[selectedId],
	);

	return (
		<main className='min-h-screen bg-linear-to-b from-sky-100 via-cyan-50 to-emerald-100 px-4 py-8 md:px-8 md:py-12'>
			<div className='mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]'>
				<section className='rounded-3xl border border-slate-900/10 bg-white/85 p-4 shadow-xl backdrop-blur-sm md:p-6'>
					<div className='mb-4 flex items-center justify-between gap-3'>
						<div>
							<p className='text-xs font-bold tracking-[0.22em] text-emerald-800 uppercase'>
								Navigation
							</p>
							<h1 className='text-2xl font-black text-slate-900 md:text-3xl'>
								Carte Interactive du Parc
							</h1>
						</div>
						<p className='text-sm text-slate-700'>
							Cliquez sur un point pour afficher les details.
						</p>
					</div>

					<div className='relative overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-950/5'>
						<Image
							src='/map.webp'
							alt='Carte du parc Jurassic Park'
							width={800}
							height={1200}
							priority
							className='h-auto w-full'
						/>

						{SPOTS.map((spot) => {
							const isActive = selectedSpot.id === spot.id;

							return (
								<button
									key={spot.id}
									type='button'
									onClick={() => setSelectedId(spot.id)}
									aria-label={`Afficher ${spot.name}`}
									className='group absolute -translate-x-1/2 -translate-y-1/2'
									style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
								>
									<span
										className={`absolute inset-0 rounded-full opacity-60 blur-sm transition ${spot.color} ${isActive ? "scale-[2.2]" : "scale-[1.7] group-hover:scale-[2.1]"}`}
									/>
									<span
										className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition ${spot.color} ${isActive ? "scale-110 ring-4 ring-white/60" : "group-hover:scale-110"}`}
									>
										{getSpotIcon(spot.icon)}
									</span>
								</button>
							);
						})}
					</div>
				</section>

				<aside className='space-y-4'>
					<section className='rounded-3xl border border-slate-900/10 bg-white p-5 shadow-lg md:p-6'>
						<div className='mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold tracking-[0.18em] text-white uppercase'>
							<Crosshair className='h-3.5 w-3.5' />
							Point selectionne
						</div>
						<h2 className='text-2xl font-black text-slate-900'>{selectedSpot.name}</h2>
						<p className='mt-3 text-sm leading-relaxed text-slate-700'>
							{selectedSpot.description}
						</p>
					</section>

					<section className='rounded-3xl border border-slate-900/10 bg-white p-5 shadow-lg md:p-6'>
						<h3 className='mb-3 text-lg font-bold text-slate-900'>Points d&apos;interet</h3>
						<ul className='space-y-2'>
							{SPOTS.map((spot) => {
								const isActive = selectedSpot.id === spot.id;

								return (
									<li key={spot.id}>
										<button
											type='button'
											onClick={() => setSelectedId(spot.id)}
											className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition ${isActive ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
										>
											<span
												className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-white ${spot.color}`}
											>
												{getSpotIcon(spot.icon)}
											</span>
											<span className='font-medium'>{spot.name}</span>
										</button>
									</li>
								);
							})}
						</ul>
					</section>
				</aside>
			</div>
		</main>
	);
}
