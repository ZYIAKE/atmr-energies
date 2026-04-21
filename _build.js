#!/usr/bin/env node
// Générateur du site atmr-energies.fr
// Exécution : node _build.js
// Génère toutes les pages HTML depuis les templates + données ci-dessous.

const fs = require('fs');
const path = require('path');
const https = require('https');

// Fetch des avis Google au build time pour Review[] en JSON-LD
function fetchGoogleReviews() {
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsY2tzZnFic2JjbXZxdXBiaG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTk1NTksImV4cCI6MjA4ODI3NTU1OX0.Uv3yUk7s1ASmvwra0bYjZDLXTB8LRDNU9qeDfuuyk4I';
  return new Promise((resolve) => {
    https.get('https://slcksfqbsbcmvqupbhox.supabase.co/functions/v1/site-google-reviews?domain=atmr-energies.fr', {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve({ reviews: [], rating: 5, total: 0 }); } });
    }).on('error', () => resolve({ reviews: [], rating: 5, total: 0 }));
  });
}

// Décode le mojibake "é → é" qu'on reçoit de l'API
function fixMojibake(s) {
  if (!s) return '';
  try { return Buffer.from(s, 'latin1').toString('utf8'); } catch { return s; }
}

let GOOGLE_REVIEWS = { reviews: [], rating: 5, total: 0 };

// ────────────────────────── TRACKING ──────────────────────────
const GA4_MEASUREMENT_ID = 'G-BS0R3DBJKP';
const GSC_META_TOKEN = '13D9Q5zNdnFMZixX13CDXvmxb825UXNeLhn--BPaIaE';
const CLARITY_PROJECT_ID = ''; // à créer manuellement sur clarity.microsoft.com puis ajouter ici

// ────────────────────────── DONNÉES ENTREPRISE ──────────────────────────
const B = {
  name: 'ATMR ÉNERGIES',
  legal: 'Mathieu Remondet (EI)',
  siret: '10276095600015',
  siren: '102760956',
  tva: 'FR02102760956',
  codeNaf: '4322B',
  foundingYear: '2021',
  officialFoundingDate: '2026-04-01',
  founderPrimary: 'Mathieu Remondet',
  founderSecondary: 'Thomas',
  projectsDone: '50',
  street: '53 A Route de la Cure',
  city: 'Montussan',
  postal: '33450',
  region: 'Gironde',
  dept: '33',
  country: 'FR',
  geoLat: 44.8771,
  geoLng: -0.3999,
  phoneDisplay: '05 18 23 22 74',
  phoneTel: '0518232274',
  phoneE164: '+33518232274',
  email: 'contact@atmr-energies.fr',
  domain: 'atmr-energies.fr',
  url: 'https://atmr-energies.fr',
  hoursWeekdays: '08:00–19:00',
  hoursSaturday: '08:00–19:00',
  hoursSunday: 'Fermé',
  facebook: 'https://www.facebook.com/profile.php?id=61586632575733',
  instagram: 'https://www.instagram.com/atmr.energies/',
  zoneRadiusKm: 50,
  ratingValue: '5.0',
  reviewCount: '3',
};

const NAV_LINKS = [
  { href: '/prestations.html', label: 'Prestations' },
  { href: '/tarifs.html', label: 'Tarifs' },
  { href: '/realisations.html', label: 'Réalisations' },
  { href: '/zone-intervention.html', label: 'Zones' },
  { href: '/avis.html', label: 'Avis' },
  { href: '/a-propos.html', label: 'À propos' },
];

const SERVICES = [
  { slug: 'pompe-a-chaleur', label: 'Pompe à chaleur', short: 'PAC Air-Eau, Air-Air, Hybride', img: '/img/services/pac-default.webp', price: '8 000 € - 18 000 €' },
  { slug: 'climatisation', label: 'Climatisation', short: 'Monosplit, multisplit, gainable', img: '/img/services/clim-monosplit.webp', price: '1 500 € - 6 000 €' },
  { slug: 'vmc', label: 'VMC', short: 'Simple flux, double flux, hygro', img: '/img/services/pac-air-eau.webp', price: '800 € - 4 500 €' },
  { slug: 'chauffage', label: 'Chauffage', short: 'Chaudières, radiateurs, planchers', img: '/img/services/pac-hybride.webp', price: 'Sur devis' },
  { slug: 'entretien-depannage', label: 'Entretien & Dépannage', short: 'Maintenance annuelle, SAV 7j/7', img: '/img/services/pac-air-air.webp', price: 'À partir de 120 €' },
  { slug: 'bilan-energetique', label: 'Bilan énergétique', short: 'Audit technique gratuit de votre logement', img: '/img/services/clim-multisplit.webp', price: 'Audit gratuit' },
];

const CITIES = [
  // Montussan + hyper-proches (0-10 km)
  { slug: 'montussan', name: 'Montussan', cp: '33450', quartiers: ['Centre-bourg', 'Les Cardounats', 'Route de la Cure', 'Beauséjour'], distanceKm: 0, note: 'notre siège historique, nous connaissons chaque rue et chaque type de logement de la commune' },
  { slug: 'yvrac', name: 'Yvrac', cp: '33370', quartiers: ['Bourg', 'Le Courneau', 'Chemin de Perruche'], distanceKm: 3, note: 'commune viticole de l\'Entre-deux-Mers, mix de maisons pierre anciennes et pavillons années 70-2000' },
  { slug: 'beychac-et-caillau', name: 'Beychac-et-Caillau', cp: '33750', quartiers: ['Bourg', 'Beychac', 'Caillau', 'Capian'], distanceKm: 3, note: 'village limitrophe à Montussan, nous intervenons souvent chez les voisins directs de notre siège' },
  { slug: 'sainte-eulalie', name: 'Sainte-Eulalie', cp: '33560', quartiers: ['Bourg', 'Le Haillan', 'La Blanquette'], distanceKm: 5, note: 'commune en forte croissance, nombreuses constructions neuves nécessitant systèmes performants' },
  { slug: 'saint-loubes', name: 'Saint-Loubès', cp: '33450', quartiers: ['Centre', 'La Grave', 'Les Coustilles', 'Cantinolle'], distanceKm: 5, note: 'même code postal 33450 que Montussan, village voisin direct' },
  { slug: 'saint-sulpice-et-cameyrac', name: 'Saint-Sulpice-et-Cameyrac', cp: '33450', quartiers: ['Saint-Sulpice', 'Cameyrac', 'Le Courtaud'], distanceKm: 4, note: 'autre commune 33450, à 4 km de notre siège' },
  { slug: 'tresses', name: 'Tresses', cp: '33370', quartiers: ['Centre', 'Les Pins', 'Pont-Ducros', 'La Seguinie'], distanceKm: 7, note: 'commune périurbaine dynamique sur la route de Bordeaux, mix de villas et lotissements récents' },
  { slug: 'salleboeuf', name: 'Sallebœuf', cp: '33370', quartiers: ['Bourg', 'Les Graves', 'La Taste'], distanceKm: 6, note: 'village rural tranquille, forte demande de rénovation énergétique des maisons anciennes' },
  { slug: 'pompignac', name: 'Pompignac', cp: '33370', quartiers: ['Centre', 'Mouchetaillade', 'Chemin du Pas de la Cabane'], distanceKm: 8, note: 'commune résidentielle haut de gamme, nombreuses propriétés avec plancher chauffant et PAC' },
  { slug: 'ambares-et-lagrave', name: 'Ambarès-et-Lagrave', cp: '33440', quartiers: ['Centre', 'La Gorp', 'Sabardin', 'La Blanche'], distanceKm: 8, note: 'commune Bordeaux Métropole au nord, tissu mixte pavillons et échoppes' },
  { slug: 'carignan-de-bordeaux', name: 'Carignan-de-Bordeaux', cp: '33360', quartiers: ['Bourg', 'Beauval', 'La Source'], distanceKm: 8, note: 'commune résidentielle à l\'est de Bordeaux, nombreuses maisons contemporaines' },
  { slug: 'bassens', name: 'Bassens', cp: '33530', quartiers: ['Centre', 'Bâts', 'Meignan', 'Prévost'], distanceKm: 10, note: 'commune Bordeaux Métropole rive droite, parc immobilier mixte industriel et résidentiel' },
  { slug: 'artigues-pres-bordeaux', name: 'Artigues-près-Bordeaux', cp: '33370', quartiers: ['Centre', 'Feydeau', 'Gabachot', 'Jolibois'], distanceKm: 10, note: 'commune résidentielle de la rive droite, proche du parc de Mirassou' },
  { slug: 'lormont', name: 'Lormont', cp: '33310', quartiers: ['Carriet', 'Génicart', 'Centre-ville', 'Cypressat'], distanceKm: 12, note: 'commune Bordeaux Métropole rive droite avec belles vues sur la Garonne et le pont Chaban-Delmas' },
  { slug: 'izon', name: 'Izon', cp: '33870', quartiers: ['Bourg', 'Macot', 'Carignan', 'Lalande'], distanceKm: 12, note: 'village de l\'Entre-deux-Mers, proche Libourne, forte demande PAC en remplacement fioul' },
  { slug: 'cenon', name: 'Cenon', cp: '33150', quartiers: ['Le Loret', 'La Marègue', 'Palmer', 'La Bastide'], distanceKm: 13, note: 'commune dynamique de la rive droite, nombreuses copropriétés années 70 et rénovations récentes' },
  { slug: 'saint-andre-de-cubzac', name: 'Saint-André-de-Cubzac', cp: '33240', quartiers: ['Centre', 'Pont du Cubzaguais', 'La Garosse', 'Le Couteron'], distanceKm: 13, note: 'porte du Cubzaguais au nord de Bordeaux, mix maisons pierre anciennes et lotissements neufs' },
  { slug: 'fargues-saint-hilaire', name: 'Fargues-Saint-Hilaire', cp: '33370', quartiers: ['Bourg', 'Fargues', 'Saint-Hilaire', 'Les Landes'], distanceKm: 13, note: 'village rural en périphérie, propriétés familiales avec chauffage individuel à rénover' },
  { slug: 'cubzac-les-ponts', name: 'Cubzac-les-Ponts', cp: '33240', quartiers: ['Centre', 'Les Quatre Pavillons', 'Mariet'], distanceKm: 14, note: 'commune du Cubzaguais au bord de la Dordogne, architecture traditionnelle de pierre' },
  { slug: 'floirac', name: 'Floirac', cp: '33270', quartiers: ['Centre', 'Jardin Botanique', 'Dravemont', 'Souys'], distanceKm: 14, note: 'commune Bordeaux Métropole avec coteaux viticoles, tissu résidentiel varié' },
  { slug: 'vayres', name: 'Vayres', cp: '33870', quartiers: ['Bourg', 'Château de Vayres', 'Libarde'], distanceKm: 14, note: 'village du Libournais avec château médiéval, maisons en pierre calcaire' },
  { slug: 'bouliac', name: 'Bouliac', cp: '33270', quartiers: ['Bourg', 'Hauts de Bouliac', 'Château'], distanceKm: 15, note: 'commune résidentielle haut de gamme sur les coteaux, belles propriétés avec besoins spécifiques' },
  { slug: 'libourne', name: 'Libourne', cp: '33500', quartiers: ['Centre historique', 'Les Dagueys', 'Carré Cassin', 'Bel-Air'], distanceKm: 15, note: 'sous-préfecture de la Gironde, bastide médiévale, nombreux appartements anciens en rénovation' },
  { slug: 'pomerol', name: 'Pomerol', cp: '33500', quartiers: ['Bourg', 'Château Pétrus', 'La Commanderie'], distanceKm: 16, note: 'appellation viticole mondialement connue, châteaux et propriétés de caractère à équiper' },
  { slug: 'bordeaux', name: 'Bordeaux', cp: '33000', quartiers: ['Chartrons', 'Caudéran', 'Bastide', 'Saint-Michel', 'Bacalan', 'Saint-Augustin', 'Victoire'], distanceKm: 18, note: 'capitale régionale inscrite UNESCO, tissu dense d\'échoppes bordelaises et immeubles haussmanniens' },
  { slug: 'saint-emilion', name: 'Saint-Émilion', cp: '33330', quartiers: ['Centre UNESCO', 'Plateau', 'Saint-Hippolyte'], distanceKm: 20, note: 'village médiéval classé UNESCO, propriétés viticoles prestigieuses et chambres d\'hôtes' },
  { slug: 'le-bouscat', name: 'Le Bouscat', cp: '33110', quartiers: ['Centre', 'Les Écus', 'Sainte-Anne', 'Hippodrome'], distanceKm: 20, note: 'commune bourgeoise au nord de Bordeaux, nombreuses échoppes et maisons de maître' },
  { slug: 'begles', name: 'Bègles', cp: '33130', quartiers: ['Centre', 'Terres Neuves', 'Dorat', 'Carle'], distanceKm: 21, note: 'commune en pleine mutation au sud de Bordeaux, projets immobiliers modernes et rénovations' },
  { slug: 'blanquefort', name: 'Blanquefort', cp: '33290', quartiers: ['Centre', 'Caychac', 'Grattequina', 'Majolan'], distanceKm: 22, note: 'commune porte du Médoc, forte présence pavillonnaire et quelques châteaux viticoles' },
  { slug: 'talence', name: 'Talence', cp: '33400', quartiers: ['Centre', 'Forum', 'Peixotto', 'Thouars', 'Médoquine'], distanceKm: 22, note: 'ville universitaire au sud de Bordeaux, mix étudiant et résidentiel familial' },
  { slug: 'bruges', name: 'Bruges', cp: '33520', quartiers: ['Centre', 'Terrefort', 'La Béchade', 'Tasta'], distanceKm: 20, note: 'commune Bordeaux Métropole au nord-ouest, forte densité résidentielle récente' },
  { slug: 'eysines', name: 'Eysines', cp: '33320', quartiers: ['Centre', 'Migelane', 'Le Grand-Louis', 'Cantinolle'], distanceKm: 24, note: 'commune maraîchère historique devenue résidentielle, mix maisons de maraîchers et lotissements' },
  { slug: 'merignac', name: 'Mérignac', cp: '33700', quartiers: ['Capeyron', 'Arlac', 'Beutre', 'Bourranville', 'La Glacière'], distanceKm: 25, note: 'deuxième ville Bordeaux Métropole, aéroport et bassin d\'emploi, forte demande clim tertiaire' },
  { slug: 'villenave-d-ornon', name: 'Villenave-d\'Ornon', cp: '33140', quartiers: ['Centre', 'Pont-de-la-Maye', 'Chambéry', 'Sarcignan'], distanceKm: 27, note: 'commune du sud Bordeaux Métropole, grand parc pavillonnaire à rénover' },
  { slug: 'gradignan', name: 'Gradignan', cp: '33170', quartiers: ['Centre', 'Malartic', 'Beausoleil', 'Carbon-Blanc'], distanceKm: 28, note: 'commune résidentielle chic au sud de Bordeaux, belles propriétés avec parcs' },
  { slug: 'pessac', name: 'Pessac', cp: '33600', quartiers: ['Centre', 'Cap de Bos', 'Saige', 'Toctoucau', 'Magonty'], distanceKm: 30, note: 'grande commune étudiante et résidentielle, campus universitaire et parc immobilier varié' },
];

const FAQS = [
  { q: 'Combien coûte une pompe à chaleur air-eau en Gironde ?', a: 'Une PAC air-eau complète coûte entre 8 000 € et 18 000 € pose comprise, selon la puissance (6 à 16 kW) et la complexité du chantier (raccordement, plancher chauffant ou radiateurs). Nous vous remettons un devis détaillé gratuit après visite technique sur site, en toute transparence.' },
  { q: 'Comment se déroule une prise en charge avec ATMR ÉNERGIES ?', a: 'Nous démarrons toujours par un échange téléphonique pour cerner votre projet, puis nous planifions une visite technique gratuite à votre domicile. Sous 48h après la visite, vous recevez un devis détaillé poste par poste. Si vous acceptez, nous calons le chantier 3 à 6 semaines plus tard selon le matériel commandé et vous accompagnons jusqu\'à la mise en service.' },
  { q: 'Sous quel délai pouvez-vous intervenir ?', a: 'Pour un dépannage, nous intervenons en général sous 24 à 72 heures dans toute la Gironde. Pour une installation complète (PAC, climatisation, VMC), le délai moyen est de 3 à 6 semaines après signature du devis, le temps d\'approvisionner le matériel et de caler le planning.' },
  { q: 'Quelles marques installez-vous ?', a: 'Nous travaillons avec les grandes marques reconnues du secteur : Daikin, Mitsubishi Electric, Atlantic, Bosch, Hitachi, Toshiba, Panasonic, LG, De Dietrich, Fujitsu. Le choix dépend de votre budget, de la configuration de votre logement et des performances visées (SCOP, niveau sonore, garantie).' },
  { q: 'Quelle est votre zone d\'intervention ?', a: 'Nous intervenons dans toute la Gironde (33) dans un rayon de 50 km autour de Montussan : Bordeaux Métropole, Libourne, Saint-André-de-Cubzac, Cenon, Lormont, Mérignac, Pessac, Floirac, ainsi que toutes les communes de l\'Entre-deux-Mers et du Libournais.' },
  { q: 'L\'entretien annuel est-il obligatoire ?', a: 'Oui, depuis 2020, l\'entretien annuel des pompes à chaleur de plus de 4 kW est obligatoire (décret 2020-912). De même pour les chaudières gaz/fioul. Nous proposons des contrats d\'entretien à partir de 160 € / an avec déplacement inclus et un SAV prioritaire.' },
  { q: 'Quelle est votre expérience dans les énergies renouvelables ?', a: 'Mathieu Remondet, dirigeant d\'ATMR ÉNERGIES, est titulaire depuis 2021 du titre professionnel d\'installateur thermique et sanitaire, et justifie de cinq années d\'expérience terrain sur les pompes à chaleur, climatisations et VMC. Il a notamment occupé un poste de chef d\'équipe dans une entreprise spécialisée en PAC avant de créer ATMR ÉNERGIES.' },
  { q: 'Proposez-vous une garantie sur vos installations ?', a: 'Toutes nos installations bénéficient de la garantie décennale (obligatoire) ainsi que des garanties constructeur sur le matériel : jusqu\'à 10 ans sur le compresseur Daikin, 7 ans sur les PAC Mitsubishi Zubadan, 5 ans sur la main d\'œuvre ATMR ÉNERGIES incluse dans nos contrats d\'entretien.' },
  { q: 'Installez-vous des VMC double flux ?', a: 'Oui, nous installons tous types de VMC : simple flux hygroréglable (A ou B), VMC double flux avec échangeur thermique (jusqu\'à 90 % de récupération de chaleur), et VMC thermodynamique. Le choix dépend de l\'étanchéité du logement, de sa configuration et de votre budget (de 800 € à 4 500 €).' },
  { q: 'Acceptez-vous les paiements en plusieurs fois ?', a: 'Oui, nous proposons plusieurs modes de paiement : virement bancaire, chèque, carte bancaire jusqu\'à 5 000 €, et financement en 3, 4 ou 10 fois sans frais pour les chantiers supérieurs à 3 000 € via notre partenaire bancaire. Pour les gros projets, un acompte de 30 % est demandé à la commande, 40 % à mi-chantier, le solde de 30 % à la livraison.' },
];

const TESTIMONIALS = [
  { text: 'Installation impeccable d\'une PAC Daikin Altherma 3M. Mathieu et son équipe ont été très professionnels, propres, et ils ont pris le temps de bien expliquer le fonctionnement. On gagne 40% sur notre facture de chauffage !', name: 'Isabelle D.', location: 'Bordeaux', stars: 5 },
  { text: 'Dépannage de notre climatisation en pleine canicule. Réponse sous 24h et réparation impeccable. Prix très correct. Je recommande sans hésiter.', name: 'Sébastien M.', location: 'Mérignac', stars: 5 },
  { text: 'Très bon suivi pour notre installation VMC double flux. Thomas et Mathieu sont disponibles, à l\'écoute et leur conseil technique nous a permis de choisir l\'équipement le mieux adapté à notre maison.', name: 'Fabienne et Paul L.', location: 'Libourne', stars: 5 },
];

const BRANDS = ['daikin', 'mitsubishi_electric', 'atlantic', 'bosch', 'hitachi', 'toshiba', 'panasonic', 'lg', 'de_dietrich', 'fujitsu'];

// ────────────────────────── HELPERS ──────────────────────────

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const iconSvg = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="14" height="14"><polyline points="9 6 15 12 9 18"/></svg>',
  thermo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/></svg>',
  wind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  euro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M4 10h12M4 14h9M19 6.7A7.8 7.8 0 0 0 14 5a8 8 0 0 0 0 16 7.8 7.8 0 0 0 5-1.7"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 9 9.9V20zm2 0v2.9A10 10 0 0 0 22 13h-2a7 7 0 0 1-7 7z"/><path d="M12 2a10 10 0 0 0-9 9.9v.1h2A7 7 0 0 1 12 5a7 7 0 0 1 7 7h2A10 10 0 0 0 12 2z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
};

// ────────────────────────── TEMPLATES ──────────────────────────

function head(title, description, canonical, extraJsonLd = []) {
  const ogImage = `${B.url}/img/og-image.jpg`;
  const mapQuery = encodeURIComponent(`${B.street}, ${B.postal} ${B.city}`);
  const hasMapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const gr = GOOGLE_REVIEWS;
  const dynRating = gr.total > 0 ? gr.rating.toFixed(1) : B.ratingValue;
  const dynCount = gr.total > 0 ? String(gr.total) : B.reviewCount;
  const reviewsLd = (gr.reviews || []).slice(0, 5).map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: fixMojibake(r.reviewer_name || r.author || 'Client Google') },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.star_rating || r.rating || 5), bestRating: '5', worstRating: '1' },
    reviewBody: fixMojibake(r.comment || r.text || ''),
    datePublished: (r.review_create_time || '').slice(0, 10) || undefined,
  }));
  const base = [
    // LocalBusiness (sur toutes les pages)
    {
      '@context': 'https://schema.org',
      '@type': 'HVACBusiness',
      '@id': `${B.url}/#localbusiness`,
      name: B.name,
      image: `${B.url}/favicon.png`,
      logo: `${B.url}/favicon.png`,
      url: B.url + '/',
      telephone: B.phoneE164,
      email: B.email,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Cash, Credit Card, Check, Invoice, Bank Transfer',
      slogan: 'Chauffagiste expert en Gironde depuis ' + B.foundingYear,
      description: `Chauffagiste à ${B.city} et en Gironde : installation, entretien et dépannage de pompes à chaleur, climatisation, VMC et chauffage.`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: B.street,
        addressLocality: B.city,
        postalCode: B.postal,
        addressRegion: B.region,
        addressCountry: B.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: B.geoLat, longitude: B.geoLng },
      hasMap: hasMapUrl,
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '19:00' },
      ],
      founder: { '@type': 'Person', name: B.founderPrimary },
      foundingDate: B.foundingYear,
      taxID: B.tva,
      vatID: B.tva,
      identifier: { '@type': 'PropertyValue', name: 'SIRET', value: B.siret },
      areaServed: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: B.geoLat, longitude: B.geoLng }, geoRadius: (B.zoneRadiusKm * 1000).toString() },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: dynRating, bestRating: '5', worstRating: '1', reviewCount: dynCount },
      ...(reviewsLd.length ? { review: reviewsLd } : {}),
      sameAs: [B.facebook, B.instagram].filter(Boolean),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Prestations ATMR ÉNERGIES',
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.label, url: `${B.url}/${s.slug}.html` },
          position: i + 1,
        })),
      },
    },
  ];
  const schemas = [...base, ...extraJsonLd];
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<meta name="theme-color" content="#1e5c87">
${GSC_META_TOKEN ? `<meta name="google-site-verification" content="${GSC_META_TOKEN}">` : ''}
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"></noscript>
<link rel="stylesheet" href="/style.css">
<script>
window.__loadGA4 = function () {
  if (window.__ga4Loaded) return;
  window.__ga4Loaded = true;
  ${GA4_MEASUREMENT_ID ? `var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}';document.head.appendChild(s);s.onload=function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_MEASUREMENT_ID}',{anonymize_ip:true});};` : ''}
};
window.__loadClarity = function () {
  ${CLARITY_PROJECT_ID ? `if(window.clarity&&window.clarity.q)return;(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");` : ''}
};
</script>
${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n')}
</head>
<body>`;
}

function topbar() {
  return `<div class="top-bar"><div class="container"><div class="top-bar-inner">
<div>${B.name} — Chauffagiste à ${B.city} et en Gironde</div>
<div class="top-bar-right">
<a href="tel:${B.phoneTel}">Tél : ${B.phoneDisplay}</a>
<span>•</span>
<a href="/devis.html">Devis gratuit</a>
</div>
</div></div></div>`;
}

function nav(currentPath = '/') {
  return `<nav role="navigation" aria-label="Navigation principale">
<div class="container"><div class="nav-inner">
<a href="/" class="logo" aria-label="Accueil ATMR ÉNERGIES">
<img src="/img/logo-atmr.png" alt="Logo ATMR ÉNERGIES" class="logo-img" width="48" height="48" fetchpriority="high">
<div class="logo-text"><div class="logo-name">ATMR ÉNERGIES</div><div class="logo-sub">Chauffagiste · PAC · Clim · VMC</div></div>
</a>
<button class="hamburger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>
<ul class="nav-links" role="menubar">
${NAV_LINKS.map(l => `<li role="none"><a href="${l.href}" role="menuitem"${currentPath === l.href ? ' aria-current="page"' : ''}>${l.label}</a></li>`).join('\n')}
<li role="none"><a href="/devis.html" class="nav-cta" role="menuitem">Devis gratuit</a></li>
<li role="none"><a href="tel:${B.phoneTel}" class="nav-cta-phone" role="menuitem">${iconSvg.phone}&nbsp;${B.phoneDisplay}</a></li>
</ul>
</div></div>
</nav>`;
}

function breadcrumb(items) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: it.href ? (B.url + it.href) : undefined,
    })),
  };
  return `<nav aria-label="Fil d'Ariane" class="breadcrumb"><div class="container">
<ol class="breadcrumb-list">
${items.map(it => `<li>${it.href ? `<a href="${it.href}">${esc(it.label)}</a>` : esc(it.label)}</li>`).join('\n')}
</ol>
</div></nav>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function ctaBanner() {
  return `<section class="cta-banner"><div class="container">
<div class="cta-banner-grid">
<div>
<h2>Besoin d'un devis pour votre projet énergétique ?</h2>
<p>Installation PAC, climatisation, VMC ou rénovation énergétique : devis gratuit sous 48h en Gironde.</p>
</div>
<div class="cta-banner-actions">
<a href="tel:${B.phoneTel}" class="btn btn-primary btn-lg">${iconSvg.phone} ${B.phoneDisplay}</a>
<a href="/devis.html" class="btn btn-secondary btn-lg">Demander un devis</a>
</div>
</div>
</div></section>`;
}

function mapSection(opts = {}) {
  const placeLabel = opts.cityName ? `${opts.cityName}, Gironde` : `${B.street}, ${B.postal} ${B.city}`;
  const q = encodeURIComponent(opts.cityName ? `${opts.cityName}, ${opts.cityCp || ''}, Gironde, France` : `${B.street}, ${B.postal} ${B.city}`);
  const zoom = opts.cityName ? 12 : 14;
  const mapsKey = 'AIzaSyCBze4yC7jINgZ7ZovaFU8hPPjyanQ5vzw';
  return `<section class="map-section" aria-label="Notre localisation"><div class="container">
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${q}&zoom=${zoom}"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="${B.name} — ${placeLabel}"
  allowfullscreen></iframe>
<div class="map-info">
<div class="map-info-addr">${iconSvg.mapPin}<div><strong>${B.name}</strong><span>${B.street} · ${B.postal} ${B.city} · Gironde (${B.dept})</span></div></div>
<div style="display:flex;gap:.6rem;"><a href="https://www.google.com/maps/dir/?api=1&destination=${q}" target="_blank" rel="noopener" class="btn btn-secondary">Itinéraire</a><a href="tel:${B.phoneTel}" class="btn btn-primary">${iconSvg.phone} ${B.phoneDisplay}</a></div>
</div>
</div></section>`;
}

function footer(opts = {}) {
  const mapHtml = opts.skipMap ? '' : mapSection(opts.mapOverride || {});
  const gr = GOOGLE_REVIEWS;
  const ratingDisplay = gr.total > 0 ? gr.rating.toFixed(1) : B.ratingValue;
  const countDisplay = gr.total > 0 ? gr.total : B.reviewCount;
  const ratingFooter = `<div class="footer-rating" aria-label="Note Google"><div class="footer-rating-stars">${'★'.repeat(Math.round(parseFloat(ratingDisplay)))}${'☆'.repeat(5 - Math.round(parseFloat(ratingDisplay)))}</div><span><strong>${ratingDisplay}/5</strong> · ${countDisplay} avis Google</span></div>`;
  return `${mapHtml}<footer>
<div class="container">
${ratingFooter}
<div class="footer-grid">
<div class="footer-col">
<div class="footer-brand">
<img src="/img/logo-atmr.png" alt="Logo ATMR ÉNERGIES" width="56" height="56" style="border-radius:12px;background:#fff;padding:4px;">
<div class="footer-brand-name">${B.name}</div>
</div>
<p class="footer-about">Expert en chauffage, pompe à chaleur, climatisation et VMC à ${B.city} et en Gironde. Entrepreneur individuel depuis ${B.foundingYear}, garantie décennale, intervention dans tout le département 33.</p>
<div class="footer-socials">
<a href="${B.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${iconSvg.facebook}</a>
<a href="${B.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${iconSvg.instagram}</a>
</div>
</div>
<div class="footer-col">
<h3>Prestations</h3>
<ul>
${SERVICES.map(s => `<li><a href="/${s.slug}.html">${s.label}</a></li>`).join('\n')}
</ul>
</div>
<div class="footer-col">
<h3>Zones desservies</h3>
<ul>
${['bordeaux','merignac','pessac','libourne','saint-andre-de-cubzac','talence','cenon'].map(slug => { const c = CITIES.find(x => x.slug === slug); return c ? `<li><a href="/chauffagiste-${c.slug}.html">Chauffagiste ${c.name}</a></li>` : ''; }).join('\n')}
<li><a href="/zone-intervention.html">Voir toutes les zones</a></li>
</ul>
</div>
<div class="footer-col">
<h3>Contact</h3>
<ul>
<li><a href="tel:${B.phoneTel}">${B.phoneDisplay}</a></li>
<li><a href="mailto:${B.email}">${B.email}</a></li>
<li>${B.street}</li>
<li>${B.postal} ${B.city}</li>
<li><a href="/contact.html">Formulaire contact</a></li>
<li><a href="/devis.html">Demander un devis</a></li>
</ul>
</div>
</div>
<div class="footer-bottom">
<div>© ${new Date().getFullYear()} ${B.name} · SIRET ${B.siret} · TVA ${B.tva}</div>
<div>
<a href="/mentions-legales.html">Mentions légales</a>  ·
<a href="/politique-confidentialite.html">Confidentialité</a>  ·
<a href="/cgv.html">CGV</a>  ·
<a href="/plan-du-site.html">Plan du site</a>
</div>
</div>
</div>
</footer>
<a href="tel:${B.phoneTel}" class="sticky-phone" aria-label="Appeler ${B.name}">${iconSvg.phone}</a>
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

function contactForm(formName = 'contact', prestationValue = '') {
  return `<form class="contact-form" data-form="${formName}">
<div class="form-group">
<label for="${formName}-nom">Nom *</label>
<input type="text" id="${formName}-nom" name="nom" required autocomplete="name" placeholder="Votre nom">
</div>
<div class="form-group">
<label for="${formName}-telephone">Téléphone *</label>
<input type="tel" id="${formName}-telephone" name="telephone" required autocomplete="tel" placeholder="06 12 34 56 78">
</div>
<div class="form-group">
<label for="${formName}-email">Email</label>
<input type="email" id="${formName}-email" name="email" autocomplete="email" placeholder="nom@exemple.fr">
</div>
<div class="form-group">
<label for="${formName}-ville">Ville</label>
<input type="text" id="${formName}-ville" name="ville" autocomplete="address-level2" placeholder="Bordeaux, Libourne, Montussan...">
</div>
<div class="form-group">
<label for="${formName}-prestation">Prestation</label>
<select id="${formName}-prestation" name="prestation">
<option value="">Sélectionnez une prestation</option>
${SERVICES.map(s => `<option value="${s.slug}"${s.slug === prestationValue ? ' selected' : ''}>${s.label}</option>`).join('\n')}
<option value="autre">Autre</option>
</select>
</div>
<div class="form-group">
<label for="${formName}-message">Message</label>
<textarea id="${formName}-message" name="message" rows="4" placeholder="Décrivez votre projet (m², équipement actuel, contraintes...)"></textarea>
</div>
<div class="form-group" style="position:absolute;left:-9999px;opacity:0;" aria-hidden="true">
<label for="${formName}-website">Ne pas remplir</label>
<input type="text" id="${formName}-website" name="website" tabindex="-1" autocomplete="off">
</div>
<button type="submit" class="btn btn-primary btn-full">Envoyer ma demande</button>
</form>`;
}

function faqSection(faqs, className = '') {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return `<section class="faq ${className}"><div class="container">
<h2 class="section-title">Questions fréquentes</h2>
<p class="section-subtitle">Les réponses à vos interrogations sur nos prestations</p>
<div class="faq-list">
${faqs.map(f => `<div class="faq-item"><button class="faq-question" type="button">${esc(f.q)}</button><div class="faq-answer"><p>${esc(f.a)}</p></div></div>`).join('\n')}
</div>
</div></section>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function testimonialsSection() {
  return `<section class="testimonials"><div class="container">
<h2 class="section-title">Ils nous ont fait confiance</h2>
<p class="section-subtitle">Avis de nos clients en Gironde</p>
<div class="testimonials-grid">
${TESTIMONIALS.map(t => `<div class="testimonial-card">
<div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
<p class="testimonial-text">« ${esc(t.text)} »</p>
<div class="testimonial-author"><span class="testimonial-name">${esc(t.name)}</span><span class="testimonial-location">${esc(t.location)}</span></div>
</div>`).join('\n')}
</div>
</div></section>`;
}

function googleReviewsSection() {
  return `<section class="testimonials" id="google-reviews-section"><div class="container">
<h2 class="section-title">Avis Google de nos clients</h2>
<p class="section-subtitle">Avis 100% authentiques vérifiés par Google</p>
<div id="google-reviews">
<div class="greviews"><div class="greviews-header"><div class="greviews-brand"><div><div class="greviews-title">Chargement des avis Google...</div></div></div></div></div>
</div>
</div></section>
<script src="/js/reviews.js" defer></script>`;
}

function brandsSection() {
  return `<section class="brands"><div class="container">
<p class="brands-title">Marques de confiance que nous installons</p>
<div class="brands-grid">
${BRANDS.map(b => `<img src="/img/marques/logo-${b}.svg" alt="${b.replace('_', ' ')}" loading="lazy" width="120" height="38">`).join('\n')}
</div>
</div></section>`;
}

function featuresSection() {
  const features = [
    { icon: iconSvg.shield, title: 'Garantie décennale', desc: 'Toutes nos installations sont couvertes par notre garantie décennale obligatoire + garanties constructeur jusqu\'à 10 ans.' },
    { icon: iconSvg.euro, title: 'Devis transparent', desc: 'Chiffrage détaillé poste par poste (matériel, main d\'œuvre, déplacement, mise en service) : aucune surprise sur la facture finale.' },
    { icon: iconSvg.users, title: 'Équipe expérimentée', desc: 'Formés aux énergies renouvelables depuis 2021, nous intervenons en direct, sans sous-traitance.' },
    { icon: iconSvg.leaf, title: 'Transition énergétique', desc: 'Nos équipements réduisent jusqu\'à 70% votre consommation et votre empreinte carbone.' },
  ];
  return `<section class="features"><div class="container">
<h2 class="section-title">Pourquoi choisir ATMR ÉNERGIES ?</h2>
<p class="section-subtitle">Quatre engagements concrets pour votre confort</p>
<div class="features-grid">
${features.map(f => `<div class="feature-card"><div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('\n')}
</div>
</div></section>`;
}

function writeHtml(filename, html) {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`✓ ${path.basename(filename)}`);
}

// ────────────────────────── PAGES ──────────────────────────

function genHomepage() {
  const title = `Chauffagiste Bordeaux & Gironde | PAC, Clim, VMC — ATMR`;
  const desc = `Chauffagiste à Bordeaux et en Gironde : installation PAC, climatisation, VMC. Devis gratuit 48h, garantie décennale. ${B.phoneDisplay}`;
  const html = head(title, desc, B.url + '/', [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: B.name, url: B.url + '/', publisher: { '@type': 'Organization', name: B.name } },
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${B.url}/#organization`, name: B.name, url: B.url + '/', logo: `${B.url}/favicon.png`, contactPoint: { '@type': 'ContactPoint', telephone: B.phoneE164, contactType: 'customer service', availableLanguage: 'French' } },
  ])
  + topbar()
  + nav('/')
  + `<main>
<section class="hero"><div class="container"><div class="hero-grid">
<div class="hero-content">
<span class="badge">🔥 Chauffagiste en Gironde · Expert énergies renouvelables</span>
<h1>Chauffagiste à <strong>${B.city}</strong> et Bordeaux : PAC, climatisation et VMC sur-mesure</h1>
<p class="hero-desc">${B.name} installe, entretient et dépanne vos équipements thermiques dans toute la Gironde. Pompe à chaleur air-eau, climatisation réversible, VMC double flux : devis gratuit sous 48h, garantie décennale et pose par notre équipe en direct.</p>
<div class="hero-ctas">
<a href="tel:${B.phoneTel}" class="btn btn-primary btn-lg">${iconSvg.phone} Appeler maintenant</a>
<a href="/devis.html" class="btn btn-secondary btn-lg">Devis gratuit 48h</a>
</div>
<div class="hero-trust">
<div class="hero-trust-item">${iconSvg.check}<span>Garantie décennale</span></div>
<div class="hero-trust-item">${iconSvg.check}<span>Pose en direct</span></div>
<div class="hero-trust-item">${iconSvg.check}<span>Intervention Gironde (33)</span></div>
</div>
</div>
<div class="hero-form-card">
<h2 class="hero-form-title">Devis gratuit sous 48h</h2>
<p class="hero-form-subtitle">Décrivez votre projet, nous vous recontactons.</p>
${contactForm('hero')}
</div>
</div></div></section>

<section class="stats"><div class="container">
<div class="stats-grid">
<div class="stat-card"><span class="stat-number">+5 ans</span><span class="stat-label">d'expérience PAC & clim</span></div>
<div class="stat-card"><span class="stat-number">${B.projectsDone}+</span><span class="stat-label">chantiers réalisés</span></div>
<div class="stat-card"><span class="stat-number">${B.ratingValue}/5</span><span class="stat-label">sur Google</span></div>
<div class="stat-card"><span class="stat-number">${B.zoneRadiusKm} km</span><span class="stat-label">autour de ${B.city}</span></div>
</div>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Votre chauffagiste de confiance à ${B.city}, ${B.region}</h2>
<p>Implantée à ${B.city} dans la périphérie de Bordeaux, <strong>${B.name}</strong> est l'entreprise de référence pour vos travaux d'installation, d'entretien et de dépannage d'équipements thermiques en Gironde. Notre cœur de métier : les <strong>énergies renouvelables</strong> — pompes à chaleur air-eau et air-air, climatisation réversible, VMC double flux et chauffage économe.</p>
<p>Depuis ${B.foundingYear}, Mathieu Remondet et Thomas vous accompagnent dans votre projet de rénovation énergétique, de la visite technique au suivi post-installation. Diplômés en génie thermique et sanitaire, nous avons fait le choix des grandes marques du secteur (Daikin, Mitsubishi Electric, Atlantic, Bosch, Hitachi, Toshiba) pour vous garantir la performance et la durabilité de vos équipements. Toutes nos installations bénéficient de la <strong>garantie décennale</strong>, condition essentielle pour votre sérénité.</p>
<p>Notre zone d'intervention couvre <strong>Bordeaux Métropole, le Libournais et tout le nord de la Gironde</strong> : Mérignac, Pessac, Cenon, Lormont, Libourne, Saint-André-de-Cubzac, Blaye, Bourg-sur-Gironde. Pour chaque projet, nous prenons le temps d'une visite technique gratuite afin de dimensionner précisément votre équipement et de vous proposer un devis détaillé poste par poste. Résultat : jusqu'à <strong>70% d'économies d'énergie</strong> avec une pompe à chaleur bien dimensionnée par rapport à une chaudière ancienne.</p>
</div></section>

${featuresSection()}

<section class="services" id="prestations"><div class="container">
<h2 class="section-title">Nos prestations en Gironde</h2>
<p class="section-subtitle">Six expertises métier pour répondre à tous vos besoins en énergies</p>
<div class="services-grid">
${SERVICES.map(s => `<a href="/${s.slug}.html" class="service-card">
<img src="${s.img}" alt="${s.label} à ${B.city}" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>${s.label}</h3><span class="service-price">${s.price}</span></div>
<p>${s.short}. Devis gratuit, pose clé en main par notre équipe, garantie décennale.</p>
<span class="service-link">Découvrir ${iconSvg.arrow}</span>
</div>
</a>`).join('\n')}
</div>
</div></section>

${brandsSection()}

<section class="features" id="zones"><div class="container">
<h2 class="section-title">Nos zones d'intervention en Gironde</h2>
<p class="section-subtitle">${B.zoneRadiusKm} km autour de ${B.city} dans tout le département 33</p>
<div class="cities-grid">
${CITIES.slice(0, 15).map(c => `<a href="/chauffagiste-${c.slug}.html" class="city-link">${iconSvg.mapPin} Chauffagiste ${c.name}</a>`).join('\n')}
</div>
<div style="text-align:center;margin-top:2rem;"><a href="/zone-intervention.html" class="btn btn-secondary">Voir les ${CITIES.length} villes desservies en Gironde ${iconSvg.arrow}</a></div>
</div></section>

${googleReviewsSection()}

${faqSection(FAQS.slice(0, 5))}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'index.html'), html);
}

function genAPropos() {
  const title = `À propos d'ATMR ÉNERGIES — Chauffagiste à ${B.city} depuis ${B.foundingYear}`;
  const desc = `Découvrez l'histoire d'ATMR ÉNERGIES à ${B.city} : Mathieu Remondet et Thomas, cofondateurs passionnés par les énergies renouvelables. Expert chauffage, PAC, clim et VMC en Gironde.`;
  const html = head(title, desc, B.url + '/a-propos.html', [
    { '@context': 'https://schema.org', '@type': 'Person', name: B.founderPrimary, jobTitle: 'Cofondateur & Installateur thermique', worksFor: { '@type': 'Organization', name: B.name }, image: `${B.url}/img/equipe/mathieu.webp` },
  ])
  + topbar()
  + nav('/a-propos.html')
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'À propos' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>À propos d'${B.name}</h1>
<p class="page-header-lead">Votre chauffagiste de confiance à ${B.city}, expert en pompes à chaleur, climatisation et VMC depuis ${B.foundingYear}.</p>
</div></section>

<section class="seo-section"><div class="container two-col">
<div>
<h2>L'histoire d'${B.name}</h2>
<p>Fondée à ${B.city} par <strong>Mathieu Remondet</strong> et <strong>Thomas</strong>, ${B.name} est née d'une conviction partagée : la transition énergétique des logements passe par des installations de qualité, portées par des artisans passionnés et formés aux énergies renouvelables. Depuis ${B.foundingYear}, nous accompagnons les particuliers et les professionnels de la Gironde dans leurs projets de chauffage, climatisation et ventilation.</p>
<p>Notre approche repose sur trois piliers : <strong>conseil honnête</strong> (nous dimensionnons votre équipement sur mesure, jamais surdimensionné), <strong>pose soignée</strong> (nous intervenons en direct, sans sous-traitance) et <strong>suivi rigoureux</strong> (chaque installation est livrée avec un contrat d'entretien optionnel et un SAV réactif). Nous avons réalisé à ce jour plus de ${B.projectsDone} chantiers dans toute la Gironde, des petits dépannages aux installations complètes PAC + VMC + climatisation.</p>
<p>Implantés au <strong>${B.street}</strong>, ${B.postal} ${B.city}, nous rayonnons dans un périmètre de ${B.zoneRadiusKm} kilomètres autour de notre siège : toute la métropole bordelaise, le Libournais, l'Entre-deux-Mers, le Médoc et le Cubzaguais sont dans notre zone d'intervention habituelle.</p>
</div>
<img src="/img/equipe/equipe-atmr.webp" alt="Équipe ATMR ÉNERGIES à ${B.city}" width="600" height="400" loading="lazy">
</div></section>

<section class="seo-section" style="background:var(--bg)"><div class="container">
<h2 class="section-title">Les cofondateurs</h2>
<p class="section-subtitle">Deux parcours complémentaires au service de vos projets énergétiques</p>
<div class="two-col" style="margin-top:2.5rem;">
<div>
<img src="/img/equipe/mathieu.webp" alt="Mathieu Remondet, cofondateur ATMR ÉNERGIES" width="500" height="500" loading="lazy">
</div>
<div class="seo-content" style="margin:0;">
<h3 style="color:var(--primary-dark); font-size:1.5rem; margin-bottom:.5rem;">Mathieu Remondet</h3>
<p style="font-weight:600; color:var(--accent); margin-bottom:1rem;">Cofondateur & Installateur thermique</p>
<p>Issu du domaine du <strong>génie thermique et sanitaire</strong>, Mathieu a obtenu en ${B.foundingYear} son titre professionnel d'installateur thermique et sanitaire, suivi d'un parcours en alternance dans une entreprise spécialisée dans les énergies renouvelables. En 2022, il rejoint une nouvelle entreprise dans le secteur des pompes à chaleur où il évolue rapidement vers un poste de <strong>chef d'équipe</strong>, confirmant ses compétences techniques et managériales sur le terrain.</p>
<p>Fort de cette expérience terrain et de sa passion pour les énergies renouvelables, il s'associe avec Thomas pour créer ${B.name}, avec l'ambition de proposer des installations de qualité supérieure, dimensionnées justes et parfaitement posées.</p>
</div>
</div>
<div class="two-col" style="margin-top:3rem;">
<div class="seo-content" style="margin:0;">
<h3 style="color:var(--primary-dark); font-size:1.5rem; margin-bottom:.5rem;">Thomas</h3>
<p style="font-weight:600; color:var(--accent); margin-bottom:1rem;">Cofondateur & Développement commercial</p>
<p>Après cinq années d'expérience entrepreneuriale intense, Thomas a fait le choix stratégique de s'associer avec Mathieu afin de mettre en commun leurs compétences complémentaires et leur vision partagée, donnant ainsi naissance à <strong>${B.name}</strong>.</p>
<p>Il pilote <strong>la gestion, l'organisation et le développement commercial</strong> de l'entreprise, avec une exigence constante de qualité, d'excellence opérationnelle et de satisfaction client. C'est votre interlocuteur privilégié lors du premier contact, de la visite technique et du suivi administratif (devis, planning d'intervention).</p>
</div>
<div>
<img src="/img/equipe/thomas.webp" alt="Thomas, cofondateur ATMR ÉNERGIES" width="500" height="500" loading="lazy">
</div>
</div>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Nos engagements</h2>
<p><strong>Qualité et exigence :</strong> nous ne travaillons qu'avec du matériel reconnu du secteur (Daikin, Mitsubishi Electric, Atlantic, Bosch, Hitachi, Toshiba). Chaque installation est testée en fonctionnement et livrée avec un carnet d'entretien détaillé.</p>
<p><strong>Transparence financière :</strong> nos devis sont détaillés poste par poste (matériel, main d'œuvre, déplacement, mise en service). Aucune surprise sur la facture finale : le prix annoncé est le prix payé. Nous proposons également du financement en plusieurs fois sans frais pour les chantiers supérieurs à 3 000 €.</p>
<p><strong>Proximité et réactivité :</strong> basés à ${B.city}, nous sommes à votre disposition 6 jours sur 7, du lundi au samedi de ${B.hoursWeekdays}. Pour un dépannage, nous intervenons en général sous 24 à 72 heures. Pour une installation, nous calons le chantier sous 3 à 6 semaines selon le matériel commandé.</p>
<p><strong>Engagement écologique :</strong> en installant des pompes à chaleur et des systèmes de ventilation performants, nous contribuons à réduire l'empreinte carbone de vos logements. Une PAC air-eau bien dimensionnée permet en moyenne d'économiser <strong>70% d'énergie</strong> par rapport à une chaudière gaz.</p>
</div></section>

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'a-propos.html'), html);
}

function genPrestations() {
  const title = `Prestations ATMR ÉNERGIES | Chauffage, PAC, Clim, VMC à ${B.city}`;
  const desc = `Découvrez toutes les prestations ATMR ÉNERGIES en Gironde : installation pompe à chaleur, climatisation, VMC, chauffage, entretien et rénovation énergétique. Devis gratuit sous 48h.`;
  const html = head(title, desc, B.url + '/prestations.html')
  + topbar()
  + nav('/prestations.html')
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Prestations' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Nos prestations de chauffagiste en Gironde</h1>
<p class="page-header-lead">Pompe à chaleur, climatisation, VMC, chauffage, entretien et rénovation énergétique : découvrez l'intégralité de notre savoir-faire à ${B.city} et dans toute la Gironde.</p>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Une expertise complète sur les énergies du logement</h2>
<p>Chez ${B.name}, nous avons fait le choix de la spécialisation thermique : notre cœur de métier, ce sont les <strong>équipements de chauffage, de climatisation et de ventilation</strong>. Nous intervenons sur des logements individuels comme sur de petits immeubles collectifs, en neuf comme en rénovation. Chaque projet démarre par une visite technique gratuite sur site pour dimensionner l'équipement parfaitement adapté.</p>
<p>Nos six domaines d'expertise sont détaillés ci-dessous. Pour chacun, nous nous engageons sur trois éléments clés : un <strong>devis détaillé sous 48h</strong>, une <strong>pose par notre équipe en direct</strong> (sans sous-traitance), et une <strong>garantie décennale</strong> couvrant l'intégralité de nos installations.</p>
</div></section>

<section class="services"><div class="container">
<div class="services-grid">
${SERVICES.map(s => `<a href="/${s.slug}.html" class="service-card">
<img src="${s.img}" alt="${s.label} en Gironde" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>${s.label}</h3><span class="service-price">${s.price}</span></div>
<p>${s.short}. Pose clé en main par notre équipe, garantie décennale, SAV réactif.</p>
<span class="service-link">Découvrir la prestation ${iconSvg.arrow}</span>
</div>
</a>`).join('\n')}
</div>
</div></section>

${brandsSection()}

${faqSection(FAQS.slice(0, 5))}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'prestations.html'), html);
}

function genServicePage(service, data) {
  const title = data.title;
  const desc = data.description;
  const html = head(title, desc, `${B.url}/${service.slug}.html`, [
    { '@context': 'https://schema.org', '@type': 'Service', name: service.label, provider: { '@id': `${B.url}/#localbusiness` }, areaServed: { '@type': 'AdministrativeArea', name: `${B.region} (${B.dept})` }, description: desc, url: `${B.url}/${service.slug}.html` },
  ])
  + topbar()
  + nav(`/${service.slug}.html`)
  + breadcrumb([{ href: '/', label: 'Accueil' }, { href: '/prestations.html', label: 'Prestations' }, { label: service.label }])
  + `<main>
<section class="page-header"><div class="container">
<h1>${data.h1}</h1>
<p class="page-header-lead">${data.lead}</p>
<div class="hero-ctas" style="margin-top:1.5rem;">
<a href="tel:${B.phoneTel}" class="btn btn-primary btn-lg">${iconSvg.phone} ${B.phoneDisplay}</a>
<a href="/devis.html" class="btn btn-secondary btn-lg">Demander un devis</a>
</div>
</div></section>

<section class="seo-section"><div class="container seo-content">
${data.body}
</div></section>

<section class="services" style="background:var(--bg);"><div class="container">
<h2 class="section-title">Nos autres prestations</h2>
<p class="section-subtitle">Explorez l'ensemble de notre savoir-faire</p>
<div class="services-grid">
${SERVICES.filter(s => s.slug !== service.slug).slice(0, 3).map(s => `<a href="/${s.slug}.html" class="service-card">
<img src="${s.img}" alt="${s.label}" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>${s.label}</h3><span class="service-price">${s.price}</span></div>
<p>${s.short}.</p>
<span class="service-link">Découvrir ${iconSvg.arrow}</span>
</div>
</a>`).join('\n')}
</div>
</div></section>

${faqSection(data.faqs || FAQS.slice(0, 5))}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, `${service.slug}.html`), html);
}

function genVillePage(city) {
  const title = `Chauffagiste ${city.name} (${city.cp}) | PAC, Climatisation, VMC — ${B.name}`;
  const desc = `${B.name}, votre chauffagiste à ${city.name} (${city.cp}). Installation pompe à chaleur, climatisation réversible, VMC et dépannage. Intervention sous 48h. Tél : ${B.phoneDisplay}`;
  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: `${B.name} — Chauffagiste à ${city.name}`,
    url: `${B.url}/chauffagiste-${city.slug}.html`,
    telephone: B.phoneE164,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: B.street,
      addressLocality: B.city,
      postalCode: B.postal,
      addressRegion: B.region,
      addressCountry: B.country,
    },
    areaServed: { '@type': 'City', name: city.name, address: { '@type': 'PostalAddress', addressLocality: city.name, postalCode: city.cp, addressCountry: 'FR' } },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: B.ratingValue, reviewCount: B.reviewCount, bestRating: '5', worstRating: '1' },
  };
  const html = head(title, desc, `${B.url}/chauffagiste-${city.slug}.html`, [localSchema])
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { href: '/zone-intervention.html', label: 'Zones' }, { label: `Chauffagiste ${city.name}` }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Chauffagiste à ${city.name} (${city.cp}) : PAC, climatisation et VMC</h1>
<p class="page-header-lead">${B.name} intervient à ${city.name} et dans ses environs pour installer, entretenir et dépanner vos équipements de chauffage, climatisation et ventilation. Devis gratuit sous 48h, garantie décennale, pose par notre équipe en direct.</p>
<div class="hero-ctas" style="margin-top:1.5rem;">
<a href="tel:${B.phoneTel}" class="btn btn-primary btn-lg">${iconSvg.phone} ${B.phoneDisplay}</a>
<a href="/devis.html" class="btn btn-secondary btn-lg">Devis gratuit 48h</a>
</div>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Votre artisan chauffagiste à ${city.name}</h2>
<p>Située à ${city.distanceKm === 0 ? 'notre siège historique' : city.distanceKm + ' km de notre siège'} de ${B.city}, la commune de <strong>${city.name}</strong> (${city.cp}) fait partie de notre zone d'intervention prioritaire — ${city.note || 'commune que nous desservons régulièrement'}. Que vous soyez propriétaire d'une maison individuelle, d'un appartement en copropriété ou d'un local professionnel, ${B.name} met à votre service son expertise en <strong>énergies renouvelables</strong> : pompes à chaleur air-eau et air-air, climatisation réversible, VMC simple et double flux, chaudières à condensation, entretien et dépannage.</p>
<p>À ${city.name}, nous intervenons notamment dans les quartiers de <strong>${city.quartiers.slice(0, -1).join(', ')} et ${city.quartiers[city.quartiers.length - 1]}</strong>. Notre connaissance du bâti local (maisons anciennes en pierre, échoppes bordelaises, constructions récentes, copropriétés des années 70-80) nous permet de dimensionner précisément vos équipements selon la configuration de votre logement : surface habitable, isolation, orientation, nombre de radiateurs existants, type de production d'eau chaude.</p>
<p>Avec la hausse continue des tarifs de l'énergie et les obligations de rénovation énergétique (loi Climat et Résilience, interdiction progressive des chaudières fioul), de plus en plus de ménages de ${city.name} font le choix de remplacer leur ancien système par une <strong>pompe à chaleur air-eau</strong>. À la clé : jusqu'à <strong>70% d'économies</strong> sur la facture de chauffage par rapport à une chaudière fioul ou électrique ancienne. Nous vous accompagnons de la visite technique jusqu'à la mise en service de votre nouvel équipement.</p>
</div></section>

<section class="services"><div class="container">
<h2 class="section-title">Nos prestations à ${city.name}</h2>
<p class="section-subtitle">Tous les services d'un chauffagiste moderne, à votre porte</p>
<div class="services-grid">
${SERVICES.map(s => `<a href="/${s.slug}.html" class="service-card">
<img src="${s.img}" alt="${s.label} ${city.name}" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>${s.label} à ${city.name}</h3></div>
<p>${s.short}. Intervention à ${city.name} et ses environs. Devis gratuit, garantie décennale.</p>
<span class="service-link">Découvrir ${iconSvg.arrow}</span>
</div>
</a>`).join('\n')}
</div>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Pourquoi faire appel à ${B.name} à ${city.name} ?</h2>
<p>Basés à ${B.city}, nous garantissons une <strong>réactivité maximale</strong> sur ${city.name}. Pour une intervention de dépannage (fuite, panne de PAC, panne chaudière, climatisation qui ne refroidit plus), nous sommes en général chez vous sous <strong>24 à 72 heures</strong>. Pour une installation complète, nos équipes calent le chantier en 3 à 6 semaines selon le matériel commandé et la disponibilité de vos interlocuteurs (syndic, gestionnaire de copropriété, etc.).</p>
<p>Nous accompagnons régulièrement les habitants de ${city.name} sur des chantiers variés : remplacement de chaudière gaz en fin de vie par une PAC air-eau Daikin Altherma, installation de climatisation réversible Mitsubishi MSZ dans les chambres à l'étage, mise en conformité ventilation VMC hygroréglable, pose de radiateurs basse température sur circuit PAC existant, dépannage et re-mise en service après l'hiver. Nous nous adaptons à <strong>chaque type de logement</strong> : maisons individuelles, échoppes, appartements T2/T3/T4 en copropriété, locaux commerciaux.</p>
<h2>Communes voisines que nous desservons également</h2>
<p>Depuis ${B.city}, nous intervenons dans un rayon de ${B.zoneRadiusKm} km. Voici les communes les plus proches de ${city.name} que nous couvrons aussi : ${CITIES.filter(c => c.slug !== city.slug).map(c => ({ ...c, d: Math.abs(c.distanceKm - city.distanceKm) })).sort((a,b)=>a.d-b.d).slice(0, 10).map(c => `<a href="/chauffagiste-${c.slug}.html">${c.name}</a>`).join(', ')}. Consultez notre <a href="/zone-intervention.html">zone d'intervention complète</a> pour la liste des 30+ villes de Gironde que nous desservons.</p>
</div></section>

${testimonialsSection()}

${faqSection(FAQS.slice(0, 5))}

${ctaBanner()}
</main>`
  + footer({ mapOverride: { cityName: city.name, cityCp: city.cp } });
  writeHtml(path.join(__dirname, `chauffagiste-${city.slug}.html`), html);
}

// ────────────────────────── MAIN ──────────────────────────
// (La génération est orchestrée dans _build-run.js pour limiter la taille de ce fichier.)

module.exports = {
  B, NAV_LINKS, SERVICES, CITIES, FAQS, TESTIMONIALS, BRANDS,
  esc, iconSvg, head, topbar, nav, breadcrumb, ctaBanner, footer, mapSection,
  contactForm, faqSection, testimonialsSection, googleReviewsSection, brandsSection, featuresSection,
  writeHtml, fetchGoogleReviews,
  setGoogleReviews: (gr) => { GOOGLE_REVIEWS = gr || { reviews: [], rating: 5, total: 0 }; },
  genHomepage, genAPropos, genPrestations, genServicePage, genVillePage,
};

if (require.main === module) {
  console.log('⚙️  Génération du site ATMR ÉNERGIES...\n');
  genHomepage();
  genAPropos();
  genPrestations();
  CITIES.forEach(c => genVillePage(c));
  console.log('\n✅ Pages principales générées.');
}
