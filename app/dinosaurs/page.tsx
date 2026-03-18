import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type CatalogDinosaur = {
	name: string;
	scientificName: string;
	image: string;
	diet: "Carnivore" | "Piscivore";
	habitat: string;
	period: string;
	size: string;
	weight: string;
	dangerLevel: number;
	description: string;
};

const DINOSAUR_CATALOG: CatalogDinosaur[] = [
	{
		name: "T-Rex",
		scientificName: "Tyrannosaurus rex",
		image: "/Trex.webp",
		diet: "Carnivore",
		habitat: "Secteur des predateurs",
		period: "Cretace",
		size: "Longueur 12 m / Hauteur 4 m",
		weight: "8 a 9 tonnes",
		dangerLevel: 5,
		description:
			"Predateur terrestre majeur, territorial et tres agressif en zone de chasse.",
	},
	{
		name: "Spinosaurus",
		scientificName: "Spinosaurus aegyptiacus",
		image: "/spino.webp",
		diet: "Piscivore",
		habitat: "Lagon et rivieres du parc",
		period: "Cretace",
		size: "Longueur 15 a 18 m / Hauteur 4.5 m",
		weight: "7 a 9 tonnes",
		dangerLevel: 5,
		description:
			"Theropode semi-aquatique specialise dans la chasse en eau peu profonde.",
	},
	{
		name: "Pterodactyle",
		scientificName: "Pterodactylus antiquus",
		image: "/ptero.webp",
		diet: "Carnivore",
		habitat: "Falaises et volieres",
		period: "Jurassique",
		size: "Envergure 1.5 m / Hauteur 0.3 m",
		weight: "2 a 3 kg",
		dangerLevel: 3,
		description:
			"Reptile volant agile, rapide et difficile a suivre lors des phases de nourrissage.",
	},
];

export default function DinosaurPage() {
	return (
		<main className='container mx-auto px-4 py-10'>
			<div className='mb-10 flex flex-col items-start gap-4 text-left'>
				<Badge
					variant='outline'
					className='border-emerald-700/30 bg-emerald-100 text-emerald-900'
				>
					Catalogue officiel
				</Badge>
				<h1 className='text-4xl font-black tracking-tight text-slate-900 md:text-5xl'>
					Especes presentes dans le parc
				</h1>
				<p className='max-w-3xl text-lg text-slate-700'>
					Retrouvez les fiches des trois especes majeures actuellement exposees
					au public avec leurs caracteristiques biologiques et leur niveau de
					risque.
				</p>
			</div>

			<div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
				{DINOSAUR_CATALOG.map((dino) => (
					<Card
						key={dino.name}
						className='overflow-hidden border-slate-900/10 bg-white'
					>
						<div className='relative aspect-video w-full overflow-hidden'>
							<Image
								src={dino.image}
								alt={`Fiche espece ${dino.scientificName}`}
								fill
								className='object-cover'
								sizes='(max-width: 1024px) 100vw, 33vw'
							/>
						</div>

						<CardHeader>
							<div className='mb-2 flex items-center justify-between gap-2'>
								<Badge className='bg-slate-900 text-white'>{dino.diet}</Badge>
								<Badge variant='outline'>{dino.period}</Badge>
							</div>
							<CardTitle className='text-2xl'>{dino.name}</CardTitle>
							<CardDescription className='italic'>
								{dino.scientificName}
							</CardDescription>
						</CardHeader>

						<CardContent className='space-y-3 text-sm text-slate-700'>
							<p>{dino.description}</p>
							<p>
								<span className='font-semibold text-slate-900'>Habitat:</span>{" "}
								{dino.habitat}
							</p>
							<p>
								<span className='font-semibold text-slate-900'>Taille:</span>{" "}
								{dino.size}
							</p>
							<p>
								<span className='font-semibold text-slate-900'>Poids:</span>{" "}
								{dino.weight}
							</p>
						</CardContent>

						<CardFooter className='border-t border-slate-100 pt-4'>
							<div className='w-full'>
								<div className='mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500'>
									<span>Niveau de menace</span>
									<span>{dino.dangerLevel}/5</span>
								</div>
								<div className='flex w-full gap-1'>
									{[...Array(5)].map((_, index) => (
										<div
											key={`${dino.name}-${index}`}
											className={`h-1.5 flex-1 rounded-full ${index < dino.dangerLevel ? "bg-red-500" : "bg-slate-200"}`}
										/>
									))}
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
