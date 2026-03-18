import { SponsorContactForm } from "@/components/sponsor-contact-form";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 via-lime-50 to-emerald-100 px-4 py-10 md:px-8 md:py-16">
      <div className="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-amber-300/35 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-0 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-emerald-950/10 bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-10">
          <p className="mb-4 inline-flex rounded-full border border-amber-700/20 bg-amber-100/70 px-4 py-1 text-sm font-semibold tracking-wide text-amber-900 uppercase">
            Contact sponsors
          </p>
          <h1 className="max-w-xl text-4xl font-black leading-tight text-emerald-950 md:text-5xl">
            Construisons un partenariat hors norme
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-900/85">
            Partagez votre vision et vos objectifs de marque. Notre equipe prepare
            une proposition sur mesure selon votre secteur, votre budget et la
            periode de campagne.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl border border-emerald-900/10 bg-emerald-50/80 p-4 text-sm text-emerald-900/85">
            <p>Reponse garantie sous 48 heures ouvrables.</p>
            <p>Accompagnement dedie avec un responsable partenariat.</p>
            <p>Possibilite de rendez-vous visio ou visite privee du parc.</p>
          </div>

          <a
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-emerald-800/20 bg-white px-4 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
          >
            Retour a l'accueil
          </a>
        </section>

        <section className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-xl md:p-8">
          <h2 className="text-2xl font-bold text-emerald-950">
            Formulaire de contact sponsors
          </h2>
          <p className="mt-2 text-sm text-emerald-900/75">
            Completez ce formulaire, notre equipe partenariat vous recontacte sous
            48 heures.
          </p>

          <SponsorContactForm />
        </section>
      </div>
    </main>
  );
}
