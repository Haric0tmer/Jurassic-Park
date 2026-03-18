export function SponsorContactForm() {
  return (
    <form className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-emerald-950">Prenom</span>
          <input
            type="text"
            name="firstName"
            required
            className="h-11 w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
            placeholder="Emma"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-emerald-950">Nom</span>
          <input
            type="text"
            name="lastName"
            required
            className="h-11 w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
            placeholder="Durand"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-emerald-950">Societe</span>
        <input
          type="text"
          name="company"
          required
          className="h-11 w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
          placeholder="InGen Europe"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-emerald-950">Email</span>
          <input
            type="email"
            name="email"
            required
            className="h-11 w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
            placeholder="partenariat@ingen.eu"
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-emerald-950">Telephone</span>
          <input
            type="tel"
            name="phone"
            className="h-11 w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
            placeholder="+33 6 12 34 56 78"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-emerald-950">
          Type de sponsoring
        </span>
        <select
          name="sponsorshipType"
          required
          defaultValue=""
          className="h-11 w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
        >
          <option value="" disabled>
            Selectionnez une option
          </option>
          <option value="zone-branding">Branding de zone</option>
          <option value="event-sponsoring">Evenement special</option>
          <option value="vip-experience">Experience VIP</option>
          <option value="innovation">Programme innovation</option>
        </select>
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-emerald-950">Votre projet</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-emerald-950/15 bg-emerald-50/30 px-3 py-2 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-3 focus:ring-emerald-200"
          placeholder="Parlez-nous de vos objectifs, de votre budget estimatif et de la periode souhaitee."
        />
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Envoyer la demande de partenariat
      </button>
    </form>
  );
}
