#!/usr/bin/env node
// Orchestrateur complet : génère toutes les pages du site.
// Exécution : node _build-run.js

const b = require('./_build.js');
const fs = require('fs');
const path = require('path');

const { B, SERVICES, CITIES, FAQS, iconSvg, head, topbar, nav, breadcrumb, ctaBanner, footer, contactForm, faqSection, testimonialsSection, brandsSection, writeHtml, esc } = b;

// ============================== PAGES SERVICES ==============================

const SERVICE_PAGES = {
  'pompe-a-chaleur': {
    title: `Pompe à chaleur à ${B.city} et Bordeaux | Installation PAC Air-Eau & Air-Air — ${B.name}`,
    description: `Installation de pompe à chaleur en Gironde par ${B.name}. PAC air-eau, air-air, hybride : devis gratuit sous 48h, garantie décennale, pose en direct. Tél : ${B.phoneDisplay}`,
    h1: `Installation de pompe à chaleur à ${B.city} et en Gironde`,
    lead: `PAC air-eau, air-air ou hybride : ATMR ÉNERGIES dimensionne et installe la pompe à chaleur parfaitement adaptée à votre logement, en direct, sans sous-traitance et avec garantie décennale.`,
    body: `
<h2>Pompe à chaleur en Gironde : jusqu'à 70% d'économies d'énergie</h2>
<p>La <strong>pompe à chaleur</strong> (PAC) est aujourd'hui le moyen le plus efficace de chauffer un logement en France. Elle capte l'énergie présente dans l'air extérieur (ou dans l'eau, le sol, selon le type) pour la restituer à l'intérieur sous forme de chaleur. Son principe : avec 1 kWh d'électricité consommé, une PAC moderne produit entre 3 et 5 kWh de chaleur — ce rendement, appelé <strong>COP (Coefficient de Performance)</strong>, est 3 à 5 fois supérieur à celui d'un chauffage électrique classique.</p>
<p>Pour une maison de 100 m² correctement isolée en Gironde, le passage d'une chaudière gaz ou fioul à une <strong>PAC air-eau</strong> permet en général de réduire la facture de chauffage de 40% à 70%, selon la qualité de l'isolation et le tarif de l'énergie remplacée. Sur 15 ans, l'économie peut atteindre <strong>15 000 à 25 000 euros</strong>, en plus du gain écologique (division par 4 à 5 des émissions de CO₂).</p>

<h2>Les trois grandes familles de pompes à chaleur</h2>
<h3>PAC air-eau : la solution la plus répandue</h3>
<p>La <strong>pompe à chaleur air-eau</strong> prélève les calories dans l'air extérieur et les transmet au circuit de chauffage central de votre maison (radiateurs, plancher chauffant, ballon d'eau chaude sanitaire). C'est la solution idéale pour <strong>remplacer une chaudière existante</strong> tout en gardant ses émetteurs, ou pour équiper une construction neuve avec plancher chauffant.</p>
<p>Nous installons principalement les modèles suivants : Daikin Altherma 3 M (4 à 16 kW), Mitsubishi Ecodan Zubadan (5 à 14 kW, fonctionne jusqu'à -28°C), Atlantic Alféa Extensa A.I. (6 à 16 kW), Hitachi Yutaki S80 (pour températures élevées jusqu'à 80°C), Bosch Compress 7400i AW et De Dietrich Alézio S V220. Chaque modèle a ses spécificités : nous dimensionnons le SCOP (performance saisonnière), la puissance frigorifique, le niveau sonore à distance et la compatibilité avec votre circuit existant.</p>

<h3>PAC air-air : confort réversible été / hiver</h3>
<p>La <strong>pompe à chaleur air-air</strong> (également appelée climatisation réversible) souffle directement de l'air chaud ou froid dans les pièces via des unités intérieures murales, cassettes ou gainables. Elle offre un double usage été / hiver, un confort rapide, mais ne produit pas d'eau chaude sanitaire. Idéale en complément d'un chauffe-eau thermodynamique.</p>
<p>Configurations possibles : <strong>monosplit</strong> (1 unité intérieure, idéale pour une pièce principale), <strong>multisplit</strong> (2 à 5 unités intérieures sur 1 groupe extérieur, pour plusieurs pièces), <strong>gainable</strong> (diffusion discrète par gaines dans les faux-plafonds). Marques : Daikin Perfera, Mitsubishi MSZ LN, Toshiba Shorai Edge, LG Artcool, Fujitsu Nocria, Panasonic Etherea.</p>

<h3>PAC hybride : le meilleur des deux mondes</h3>
<p>La <strong>PAC hybride</strong> combine une pompe à chaleur air-eau avec une chaudière à condensation (gaz ou fioul). Le système bascule automatiquement sur la source la plus économique selon la température extérieure et le prix du kWh. Parfaite pour les maisons où la PAC seule ne suffirait pas en période de froid intense, ou pour garder une chaudière gaz récente tout en ajoutant une PAC pour la majeure partie de l'année.</p>

<h2>Combien coûte une pompe à chaleur en Gironde ?</h2>
<p>Une installation complète de <strong>PAC air-eau</strong> coûte typiquement entre <strong>8 000 € et 18 000 € TTC pose comprise</strong>, selon la puissance (6 à 16 kW), le modèle, le type d'émetteurs (plancher chauffant, radiateurs basse température, radiateurs classiques) et la complexité du chantier (raccordement électrique, passage de conduits, dépose de l'ancienne chaudière). Pour une <strong>PAC air-air</strong>, comptez entre 1 500 € (monosplit simple) et 6 000 € (multisplit 3 à 5 pièces).</p>
<p>Pour les chantiers supérieurs à 3 000 €, nous proposons un <strong>financement en 3, 4 ou 10 fois sans frais</strong> via notre partenaire bancaire. L'acompte de 30% est demandé à la commande, 40% à mi-chantier et le solde de 30% à la livraison.</p>

<h2>Notre méthode en 4 étapes</h2>
<p><strong>1. Visite technique gratuite sur site :</strong> nous prenons les cotes de votre logement, étudions l'isolation, la configuration du circuit de chauffage existant et les contraintes d'installation (emplacement extérieur, bruit pour le voisinage, évacuation des condensats).</p>
<p><strong>2. Étude thermique et devis détaillé sous 48h :</strong> nous dimensionnons précisément la puissance nécessaire (via un calcul de déperditions), comparons 2 à 3 modèles de marques différentes, et vous remettons un devis détaillé poste par poste sans surprise.</p>
<p><strong>3. Installation par nos équipes en direct :</strong> 1 à 3 jours de chantier selon la complexité. Nous effectuons la dépose de l'ancien équipement, la pose de la nouvelle PAC, les raccordements hydrauliques et électriques, l'équilibrage du circuit et la mise en service complète.</p>
<p><strong>4. Formation à l'usage + SAV :</strong> nous prenons le temps de vous expliquer le fonctionnement (réglages, modes, entretien courant) et vous remettons le carnet d'entretien. Contrats de maintenance annuelle disponibles à partir de 160 €.</p>

<h2>Zones d'intervention pour l'installation de pompes à chaleur</h2>
<p>Nous installons des pompes à chaleur dans toute la <strong>Gironde</strong> dans un rayon de ${B.zoneRadiusKm} km autour de ${B.city} : Bordeaux Métropole, Mérignac, Pessac, Libourne, Saint-André-de-Cubzac, Cenon, Lormont, Blaye, Bourg-sur-Gironde, l'Entre-deux-Mers, le Médoc, le Cubzaguais et le Libournais.</p>
`,
    faqs: [FAQS[0], FAQS[1], FAQS[2], FAQS[3], FAQS[5], FAQS[6], FAQS[7]],
  },
  'climatisation': {
    title: `Climatisation à ${B.city} et Bordeaux | Installation Clim Réversible — ${B.name}`,
    description: `Installation de climatisation réversible en Gironde : monosplit, multisplit, gainable. Devis gratuit, pose clé en main, marques Daikin, Mitsubishi, Toshiba. Tél : ${B.phoneDisplay}`,
    h1: `Climatisation réversible à ${B.city} et en Gironde`,
    lead: `Mono-split, multi-split ou gainable : ATMR ÉNERGIES installe votre climatisation réversible (chaud + froid) en Gironde. Confort en été, économies en hiver, silence garanti.`,
    body: `
<h2>Climatisation réversible : confort été + hiver en un seul équipement</h2>
<p>Une <strong>climatisation réversible</strong> est bien plus qu'un simple rafraîchisseur d'été : c'est une <strong>pompe à chaleur air-air</strong> qui fonctionne dans les deux sens. En été, elle extrait la chaleur intérieure pour la rejeter dehors (climatisation classique). En hiver, elle inverse le cycle et prélève les calories de l'air extérieur pour les restituer à l'intérieur — un système de chauffage ultra-efficace, avec un COP de 3,5 à 5 (1 kWh consommé = 3,5 à 5 kWh de chaleur produite).</p>
<p>À Bordeaux et dans toute la Gironde, où les étés deviennent de plus en plus chauds (40°C en été 2022, 38°C en 2023) et les hivers relativement doux, la climatisation réversible est la solution idéale : elle couvre <strong>80 à 90% des besoins thermiques annuels</strong> sans nécessiter de circuit d'eau chaude, ce qui simplifie et accélère l'installation par rapport à une PAC air-eau.</p>

<h2>Les trois configurations que nous installons</h2>
<h3>Climatisation monosplit : une pièce, un équipement</h3>
<p>Le <strong>monosplit</strong> se compose d'une unité extérieure (le compresseur) reliée à <strong>une seule unité intérieure</strong>. C'est la solution la plus économique pour climatiser ou chauffer une pièce principale (salon de 25 à 50 m², chambre parentale, bureau). Budget : <strong>1 500 € à 3 500 €</strong> pose comprise selon la puissance (2,5 à 5 kW) et la marque.</p>
<p>Modèles privilégiés : Daikin Perfera FTXM (référence silencieuse à 19 dB), Mitsubishi MSZ LN Diamond, Toshiba Shorai Edge, LG Artcool Galerie (design), Fujitsu Nocria X, Panasonic Etherea. Tous disposent d'un filtre anti-bactérien, d'une fonction Wi-Fi et d'un mode nuit.</p>

<h3>Climatisation multisplit : plusieurs pièces, un seul groupe extérieur</h3>
<p>Le <strong>multisplit</strong> relie <strong>2 à 5 unités intérieures</strong> à un seul groupe extérieur, ce qui réduit l'encombrement sur la façade (important en copropriété ou en lotissement avec règles strictes). Chaque unité intérieure peut être programmée individuellement : chauffer le salon et refroidir les chambres, par exemple. Budget : <strong>3 500 € à 7 500 €</strong> pour un multisplit 2 à 4 unités.</p>
<p>Particulièrement adapté aux <strong>maisons de 100 à 150 m²</strong> avec 3 à 4 pièces principales à climatiser, ou aux grands appartements familiaux. Nous dimensionnons précisément la puissance du groupe extérieur pour qu'elle couvre la somme des puissances des unités intérieures, avec une marge de sécurité de 15%.</p>

<h3>Climatisation gainable : invisible et homogène</h3>
<p>La <strong>climatisation gainable</strong> est la solution haut de gamme : une <strong>unité intérieure dissimulée dans un faux-plafond</strong> diffuse l'air via un réseau de gaines et des bouches de soufflage discrètes dans chaque pièce. Aucune unité apparente dans les pièces de vie, confort thermique homogène, silence absolu. Budget : <strong>6 000 € à 12 000 €</strong> selon la surface et la complexité du réseau aéraulique.</p>
<p>Idéale dans les <strong>constructions neuves</strong> ou en <strong>rénovation lourde</strong> (combles, extensions avec faux-plafonds). Nous réalisons l'étude aéraulique (débits d'air, pertes de charge, positionnement des bouches) pour garantir un fonctionnement optimal et silencieux (<25 dB dans les pièces).</p>

<h2>Modalités financières et TVA</h2>
<p>La climatisation réversible pour un logement de plus de 2 ans bénéficie de la <strong>TVA à 10%</strong> sur le matériel et la main d'œuvre, au lieu du taux normal de 20%. Pour les chantiers supérieurs à 3 000 €, nous proposons également du <strong>financement en 3, 4 ou 10 fois sans frais</strong> via notre partenaire bancaire.</p>

<h2>Installation clé en main par ATMR ÉNERGIES</h2>
<p>Nous réalisons l'intégralité du chantier en direct, sans sous-traitance : visite technique, étude thermique, commande du matériel (marques partenaires Daikin, Mitsubishi, Toshiba, LG, Panasonic), dépose de l'ancien système si nécessaire, pose des unités intérieures et extérieures, liaisons frigorifiques cuivre brasées et isolées, mise sous vide et charge du circuit, mise en service et <strong>attestation d'aptitude à la manipulation des fluides frigorigènes (F-Gas)</strong>. Tout est prêt en 1 à 3 jours selon le projet.</p>
<p>Nos installations sont garanties décennales, avec des <strong>garanties constructeur jusqu'à 5 ans sur le compresseur</strong>. Nous proposons un contrat d'entretien annuel à partir de 120 € (nettoyage des filtres, vérification du circuit frigorifique, contrôle de l'étanchéité, équilibrage).</p>

<h2>Nos zones d'intervention pour la climatisation</h2>
<p>Nous installons des climatisations à <strong>${B.city}, Bordeaux, Mérignac, Pessac, Libourne, Saint-André-de-Cubzac, Cenon, Lormont</strong> et dans toute la Gironde dans un rayon de ${B.zoneRadiusKm} km autour de ${B.city}.</p>
`,
    faqs: FAQS.slice(0, 6),
  },
  'vmc': {
    title: `VMC à ${B.city} et Bordeaux | Installation VMC simple flux, double flux — ${B.name}`,
    description: `Installation de VMC hygroréglable, double flux ou thermodynamique en Gironde par ${B.name}. Qualité d'air, économies d'énergie, pose clé en main. Tél : ${B.phoneDisplay}`,
    h1: `Installation de VMC à ${B.city} et en Gironde`,
    lead: `VMC simple flux hygroréglable, VMC double flux avec récupération de chaleur ou VMC thermodynamique : ATMR ÉNERGIES garantit un air sain dans votre logement tout en maîtrisant votre consommation d'énergie.`,
    body: `
<h2>Pourquoi la VMC est indispensable dans un logement moderne</h2>
<p>La <strong>VMC (Ventilation Mécanique Contrôlée)</strong> est obligatoire dans toutes les constructions neuves depuis 1982 et fortement recommandée en rénovation. Son rôle : extraire en permanence l'air vicié (humidité, polluants, CO₂) des pièces humides (cuisine, salle de bain, WC, buanderie) et introduire de l'air neuf dans les pièces de vie (salon, chambres, bureau).</p>
<p>Sans VMC performante, un logement moderne (bien isolé, fenêtres PVC étanches) accumule <strong>humidité et polluants</strong> : moisissures sur les murs, condensation sur les vitres, air intérieur 2 à 5 fois plus pollué que l'air extérieur, risques de maladies respiratoires, dégradation du bâti. Une VMC correctement dimensionnée et entretenue résout tous ces problèmes.</p>

<h2>Les trois types de VMC que nous installons</h2>
<h3>VMC simple flux hygroréglable : la solution de base</h3>
<p>La <strong>VMC simple flux hygroréglable type B</strong> extrait l'air vicié via des bouches dans les pièces humides, tandis que l'air neuf entre par des entrées d'air dans les menuiseries des pièces de vie. Les bouches d'extraction modulent automatiquement leur débit selon l'humidité détectée : plus efficace et moins énergivore qu'une VMC autoréglable classique.</p>
<p>Budget installation : <strong>800 € à 2 000 €</strong> selon la surface du logement et la configuration des gaines. C'est la solution la plus économique, adaptée aux <strong>petits et moyens logements</strong> (T2 à T4) et aux rénovations où l'on ne peut pas passer un réseau d'insufflation.</p>

<h3>VMC double flux avec récupération de chaleur</h3>
<p>La <strong>VMC double flux</strong> est le haut de gamme actuel : deux réseaux de gaines (extraction + insufflation) se croisent dans un <strong>échangeur thermique</strong> qui récupère jusqu'à <strong>90% de la chaleur de l'air extrait</strong> pour la restituer à l'air neuf insufflé. Résultat : vous renouvelez votre air sans perdre la chaleur de votre chauffage, ce qui génère des <strong>économies de 10 à 20%</strong> sur la facture énergétique.</p>
<p>Budget : <strong>3 000 € à 4 500 €</strong> pose comprise. Idéale pour les <strong>logements bien isolés</strong> (étiquette DPE A ou B), les constructions neuves et les rénovations énergétiques globales. Modèles recommandés : Atlantic Duolix Max, Aldes DEE Fly Cube, Renson Healthbox, Zehnder ComfoAir Q.</p>

<h3>VMC thermodynamique : VMC + chauffe-eau intégré</h3>
<p>La <strong>VMC thermodynamique</strong> combine la ventilation double flux avec un <strong>chauffe-eau thermodynamique</strong> intégré qui récupère les calories de l'air extrait pour chauffer l'eau sanitaire. Un seul équipement pour deux usages, très efficace pour les logements compacts où l'espace est limité.</p>

<h2>Maintenance obligatoire d'une VMC</h2>
<p>L'entretien annuel d'une VMC est fortement recommandé pour maintenir son rendement et garantir la qualité de l'air. Nous proposons un <strong>contrat d'entretien à partir de 130 € / an</strong> comprenant : nettoyage des bouches d'extraction, dépoussiérage du caisson et du moteur, remplacement des filtres (pour les VMC double flux), contrôle du débit d'air et de l'étanchéité du réseau. Sans cet entretien, le rendement chute rapidement (filtres encrassés = débit réduit = humidité qui repart).</p>

<h2>Notre savoir-faire en ventilation</h2>
<p>Nous concevons intégralement le réseau aéraulique (<strong>dimensionnement des gaines, calcul des pertes de charge, positionnement des bouches</strong>) pour garantir un fonctionnement optimal sur le long terme. Nous utilisons des gaines semi-rigides isolées (meilleure acoustique, moins de pertes de chaleur) et réalisons systématiquement un <strong>équilibrage aéraulique à la mise en service</strong>.</p>
<p>Nous installons des VMC dans toute la Gironde : Bordeaux, Mérignac, Pessac, Libourne, Saint-André-de-Cubzac et toutes les communes dans un rayon de ${B.zoneRadiusKm} km autour de ${B.city}.</p>
`,
    faqs: [FAQS[8], FAQS[2], FAQS[3], FAQS[5], FAQS[4]],
  },
  'chauffage': {
    title: `Chauffagiste à ${B.city} | Installation chaudière, radiateurs, plancher chauffant — ${B.name}`,
    description: `Installation et remplacement de chaudière gaz, chaudière à condensation, radiateurs et planchers chauffants en Gironde. Devis gratuit, garantie décennale. ${B.phoneDisplay}`,
    h1: `Chauffage à ${B.city} et en Gironde : chaudières, radiateurs, planchers chauffants`,
    lead: `Installation, remplacement et dépannage de systèmes de chauffage : chaudière à condensation, radiateurs basse température, plancher chauffant hydraulique. ATMR ÉNERGIES vous accompagne de bout en bout.`,
    body: `
<h2>Un chauffage adapté à chaque logement</h2>
<p>Chez ${B.name}, nous installons et remplaçons tous les <strong>systèmes de chauffage hydraulique</strong> : chaudières à condensation (gaz, bois, granulés), radiateurs basse température, planchers chauffants hydrauliques, ballons d'eau chaude, chauffe-eau thermodynamiques. Le choix du système dépend de plusieurs facteurs : surface du logement, niveau d'isolation, énergie disponible, budget initial et souhaits de confort.</p>
<p>Depuis ${B.foundingYear}, nous avons installé plus de ${B.projectsDone} systèmes de chauffage dans toute la Gironde. Notre expertise couvre aussi bien le <strong>remplacement d'une chaudière gaz vieillissante</strong> par un modèle à condensation moderne (économies de 15 à 30%), la <strong>reprise complète d'un circuit radiateurs</strong> avec équilibrage hydraulique, ou l'<strong>installation d'un plancher chauffant</strong> en rénovation ou en construction neuve.</p>

<h2>Chaudières à condensation : 25 à 30% d'économies</h2>
<p>La <strong>chaudière à condensation</strong> récupère la chaleur latente des fumées de combustion (d'où son nom : les vapeurs d'eau se condensent et libèrent de l'énergie), ce qui améliore son rendement jusqu'à <strong>108 à 110%</strong> (contre 85% pour une chaudière standard). Un gain énergétique de 25 à 30% par rapport à une ancienne chaudière gaz, soit <strong>300 € à 600 € d'économies par an</strong> pour une maison moyenne.</p>
<p>Nous installons les grandes marques du secteur : <strong>De Dietrich Evodens, Frisquet Prestige Condensation, Saunier Duval Thema Condens, Viessmann Vitodens 200-W, Atlantic Naia Duo, Bosch Condens 7000 W, ELM Leblanc Megalis Condens</strong>. Budget : 3 500 € à 7 500 € pose comprise selon la puissance (16 à 35 kW) et la marque.</p>

<h2>Radiateurs basse température pour PAC et chaudières à condensation</h2>
<p>Les <strong>radiateurs basse température</strong> fonctionnent avec une eau chaude autour de 45-55°C (contre 70-80°C pour les radiateurs classiques). Ils sont <strong>indispensables</strong> pour profiter pleinement du rendement d'une chaudière à condensation ou d'une PAC air-eau. Leur surface d'échange plus importante compense la température plus faible, pour un confort équivalent.</p>
<p>Nous installons des radiateurs en fonte (rayonnement doux, forte inertie), des radiateurs en acier (montée en température rapide, design moderne) ou des radiateurs à eau chaude avec sèche-serviettes pour les salles de bain. Marques de confiance : Acova, Finimetal, Delonghi Hydraulik, Atlantic, Cayenne.</p>

<h2>Plancher chauffant hydraulique : le confort ultime</h2>
<p>Le <strong>plancher chauffant hydraulique</strong> diffuse la chaleur de manière homogène sur toute la surface au sol, à basse température (30 à 35°C). Il libère les murs (pas de radiateurs visibles), offre une sensation de confort maximale et est particulièrement adapté aux <strong>PAC air-eau</strong> dont il optimise le rendement.</p>
<p>Budget : <strong>50 à 90 € TTC / m²</strong> pose + chape incluse, pour une durée de chantier de 4 à 7 jours (chape + séchage + mise en service progressive). Incontournable dans les constructions neuves et en rénovation lourde avec reprise de sol.</p>

<h2>Entretien annuel obligatoire</h2>
<p>Depuis 2009, l'<strong>entretien annuel</strong> est obligatoire pour toutes les chaudières de 4 à 400 kW (décret n° 2009-649). Il doit être réalisé par un professionnel qualifié et donne lieu à une attestation d'entretien que votre assureur peut réclamer en cas de sinistre.</p>
<p>Nous proposons des <strong>contrats d'entretien à partir de 160 € / an</strong> pour votre chaudière (gaz, fioul, bois), avec : contrôle de la combustion, nettoyage du brûleur, vérification des organes de sécurité, réglage de la puissance, purge du circuit, rapport détaillé et attestation d'entretien. Contrat prioritaire SAV (intervention sous 24 à 48h en hiver) en option.</p>

<h2>Nos interventions en Gironde</h2>
<p>Nous installons et dépannons des systèmes de chauffage dans toute la Gironde : Bordeaux, Mérignac, Pessac, Libourne, Saint-André-de-Cubzac, Cenon, Lormont, ${B.city} et toutes les communes dans un rayon de ${B.zoneRadiusKm} km.</p>
`,
    faqs: FAQS.slice(1, 7),
  },
  'entretien-depannage': {
    title: `Entretien & Dépannage chauffage, PAC, clim en Gironde — ${B.name}`,
    description: `Entretien annuel chaudière, PAC et climatisation + dépannage express 7j/7 en Gironde. Contrats à partir de 120 €. Intervention sous 24-72h. Tél : ${B.phoneDisplay}`,
    h1: `Entretien et dépannage de vos équipements thermiques en Gironde`,
    lead: `Contrat d'entretien annuel ou dépannage en urgence : ATMR ÉNERGIES prend soin de votre chaudière, PAC, climatisation et VMC dans toute la Gironde, avec une réactivité maximale.`,
    body: `
<h2>Entretien annuel : obligatoire et rentable</h2>
<p>L'<strong>entretien annuel</strong> de vos équipements thermiques est non seulement obligatoire pour les chaudières (décret 2009-649) et les pompes à chaleur de plus de 4 kW (décret 2020-912), mais surtout <strong>rentable sur le long terme</strong>. Un équipement entretenu consomme 5 à 10% de moins, tombe 3 fois moins souvent en panne et a une durée de vie prolongée de 25 à 40%.</p>
<p>Nos contrats couvrent l'ensemble de vos équipements : <strong>chaudière gaz, fioul, à condensation, à granulés, pompe à chaleur air-eau, air-air, climatisation monosplit ou multisplit, VMC simple et double flux</strong>. À chaque visite annuelle, nos techniciens réalisent un contrôle complet, un nettoyage en profondeur et vous remettent une attestation d'entretien conforme à la réglementation.</p>

<h3>Contenu d'une visite d'entretien chaudière</h3>
<ul>
<li>Contrôle de la combustion (analyseur de fumées, réglage du brûleur)</li>
<li>Nettoyage du corps de chauffe, du brûleur et des électrodes d'allumage</li>
<li>Vérification de l'étanchéité du circuit hydraulique et de l'évacuation des fumées</li>
<li>Contrôle des organes de sécurité (vase d'expansion, soupape, thermostats)</li>
<li>Mesure du tirage et de la pression du circuit</li>
<li>Purge des radiateurs si nécessaire</li>
<li>Rapport détaillé et attestation d'entretien légale</li>
</ul>

<h3>Contenu d'une visite d'entretien PAC</h3>
<ul>
<li>Nettoyage des unités intérieures et extérieures</li>
<li>Contrôle de l'étanchéité du circuit frigorifique (obligatoire si charge > 2 kg de fluide)</li>
<li>Vérification des pressions haute et basse du circuit</li>
<li>Nettoyage des filtres et des condenseurs</li>
<li>Contrôle des paramètres de fonctionnement et du COP réel</li>
<li>Dépoussiérage et resserrage des connexions électriques</li>
<li>Attestation d'entretien conforme F-Gas</li>
</ul>

<h2>Dépannage en urgence 7j/7 en Gironde</h2>
<p>Une panne de chauffage en hiver ou de climatisation en pleine canicule, c'est une urgence. Nous intervenons en général <strong>sous 24 à 72 heures</strong> dans toute la Gironde pour tous les problèmes : <strong>chaudière qui ne démarre plus, fuite d'eau, pression en chute, PAC qui affiche un code erreur, climatisation qui ne refroidit plus, bruit anormal, odeur inhabituelle, défaut de ventilation VMC</strong>.</p>
<p>Nos techniciens sont équipés de tout le matériel nécessaire (analyseurs, pinces à sertir, bouteilles de fluide frigorigène, pièces détachées courantes) pour résoudre la majorité des pannes en une seule intervention. Pour les pièces spécifiques qui doivent être commandées, nous vous tenons informés du délai et vous proposons des solutions transitoires (radiateur d'appoint électrique gratuit pendant la période de panne chauffage).</p>

<h2>Nos tarifs transparents</h2>
<p><strong>Contrat d'entretien chaudière</strong> : à partir de <strong>160 € / an</strong> (visite annuelle + attestation + priorité SAV).<br>
<strong>Contrat d'entretien PAC air-eau</strong> : à partir de <strong>180 € / an</strong>.<br>
<strong>Contrat d'entretien climatisation</strong> : à partir de <strong>120 € / an</strong> par unité intérieure.<br>
<strong>Contrat d'entretien VMC</strong> : à partir de <strong>130 € / an</strong>.<br>
<strong>Dépannage ponctuel (sans contrat)</strong> : déplacement + diagnostic à partir de 95 € TTC. Main d'œuvre 65 € / heure. Pièces au prix public constructeur.</p>
<p>Nos contrats incluent tous une <strong>intervention prioritaire en cas de panne</strong> (sous 24 à 48h en période d'hiver), une <strong>remise de 15%</strong> sur les éventuelles pièces détachées à remplacer, et une <strong>garantie de bon fonctionnement</strong> post-visite de 90 jours.</p>

<h2>Garanties et assurances</h2>
<p>Nous sommes couverts par une <strong>assurance responsabilité civile professionnelle</strong> et par la <strong>garantie décennale</strong> obligatoire. Nos techniciens sont formés annuellement aux évolutions réglementaires (F-Gas, normes de sécurité gaz, nouveaux fluides frigorigènes R32 et R290).</p>

<h2>Nos zones d'intervention</h2>
<p>Dépannage et entretien dans tout le département 33 : ${B.city}, Bordeaux, Mérignac, Pessac, Libourne, Saint-André-de-Cubzac, Cenon, Lormont et toutes les communes dans un rayon de ${B.zoneRadiusKm} km.</p>
`,
    faqs: [FAQS[5], FAQS[2], FAQS[9], FAQS[6], FAQS[7]],
  },
  'bilan-energetique': {
    title: `Bilan énergétique gratuit à ${B.city} et Bordeaux — ${B.name}`,
    description: `Bilan énergétique et conseil technique gratuit en Gironde : diagnostic de votre équipement actuel, dimensionnement PAC / clim / VMC. Tél : ${B.phoneDisplay}`,
    h1: `Bilan énergétique à ${B.city} et en Gironde`,
    lead: `Avant d'investir dans une pompe à chaleur ou un nouvel équipement, nous réalisons un bilan technique gratuit de votre logement pour dimensionner la solution la plus pertinente.`,
    body: `
<h2>Un diagnostic technique préalable offert à chaque projet</h2>
<p>Avant tout chiffrage, ATMR ÉNERGIES réalise systématiquement une <strong>visite technique gratuite</strong> de votre logement. L'objectif : comprendre précisément votre situation existante (chauffage actuel, type d'émetteurs, isolation visible, contraintes d'installation) pour vous proposer l'équipement le mieux adapté, ni sur-dimensionné ni sous-dimensionné.</p>
<p>Cette étape est <strong>indispensable pour garantir la performance</strong> de votre future installation. Une pompe à chaleur mal dimensionnée consomme 20 à 30% de plus que prévu et s'use prématurément. Un bilan sérieux en amont évite ce piège et vous permet d'investir sereinement.</p>

<h2>Ce que nous analysons lors de la visite</h2>
<ul>
<li><strong>Enveloppe du bâti</strong> : type de murs (pierre, parpaing, brique), année de construction, isolation visible (combles, murs, sol), qualité des menuiseries (simple/double vitrage, étanchéité à l'air)</li>
<li><strong>Système de chauffage existant</strong> : type de générateur (chaudière fioul, gaz, électrique, PAC), âge, rendement, type d'émetteurs (radiateurs fonte, acier, plancher chauffant)</li>
<li><strong>Production d'eau chaude sanitaire</strong> : ballon électrique, chauffe-eau thermodynamique, production mixte intégrée à la chaudière</li>
<li><strong>Ventilation</strong> : absence de VMC, VMC simple flux autoréglable ou hygroréglable, VMC double flux, grilles d'aération</li>
<li><strong>Contraintes d'installation</strong> : emplacement du groupe extérieur (façade, jardin, toiture), distance aux chambres voisines pour le niveau sonore, évacuation des condensats, alimentation électrique disponible</li>
<li><strong>Vos habitudes et attentes</strong> : plages horaires d'occupation, niveau de confort recherché, budget, priorités (économies, silence, esthétique)</li>
</ul>

<h2>Calcul des déperditions thermiques</h2>
<p>À partir des données collectées lors de la visite, nous réalisons un <strong>calcul des déperditions thermiques</strong> de votre logement. Ce calcul (norme RE 2020 simplifiée) permet de déterminer la puissance de chauffage réellement nécessaire, en kilowatts, pour maintenir votre logement à 19-20°C en continu pendant les périodes les plus froides de l'année.</p>
<p>Ce dimensionnement rigoureux est <strong>la base d'un bon choix d'équipement</strong> : plus votre bâti est isolé, plus la puissance nécessaire est faible, plus le SCOP (performance saisonnière) de la pompe à chaleur sera élevé, donc plus vous économiserez sur votre facture.</p>

<h2>Étude comparative des solutions possibles</h2>
<p>Une fois la puissance connue, nous vous présentons <strong>2 à 3 scénarios</strong> de solutions techniques avec leurs avantages, inconvénients et tarifs indicatifs. Exemples :</p>
<ul>
<li><strong>Scénario A</strong> : PAC air-eau Daikin Altherma 3M sur radiateurs existants</li>
<li><strong>Scénario B</strong> : PAC air-air multisplit Mitsubishi + chauffe-eau thermodynamique</li>
<li><strong>Scénario C</strong> : Système hybride PAC + chaudière gaz condensation De Dietrich</li>
</ul>
<p>Pour chaque scénario, nous précisons le <strong>gain énergétique prévisionnel</strong>, le retour sur investissement en années, et les contraintes d'installation. Nos devis sont détaillés poste par poste, sans ligne forfaitaire opaque.</p>

<h2>Notre engagement : conseil indépendant</h2>
<p>Nous ne vendons pas "une marque" — nous travaillons avec <strong>10 grandes marques</strong> différentes (Daikin, Mitsubishi, Atlantic, Bosch, Hitachi, Toshiba, Panasonic, LG, De Dietrich, Fujitsu) et choisissons celle qui correspond <strong>le mieux à votre projet</strong>, pas celle qui nous arrange commercialement. Notre intérêt à long terme : des clients satisfaits qui nous recommandent et renouvellent leurs contrats d'entretien.</p>

<h2>Prêt à faire le bilan de votre logement ?</h2>
<p>Nous réalisons des bilans techniques dans toute la Gironde : Bordeaux Métropole, Libourne, Cubzaguais, Entre-deux-Mers. Le bilan est <strong>entièrement gratuit et sans engagement</strong>. Contactez-nous pour planifier un créneau.</p>
`,
    faqs: [FAQS[0], FAQS[1], FAQS[2], FAQS[3], FAQS[6], FAQS[9]],
  },
};

// ============================== CONTACT / DEVIS / MERCI ==============================

function genContactPage() {
  const title = `Contact ATMR ÉNERGIES | Chauffagiste à ${B.city} et Gironde`;
  const desc = `Contactez ${B.name} : ${B.phoneDisplay}, ${B.email}. Siège à ${B.city} (${B.postal}). Intervention Bordeaux Métropole et Gironde. Devis gratuit sous 48h.`;
  const html = head(title, desc, B.url + '/contact.html')
  + topbar()
  + nav('/contact.html')
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Contact' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Contactez ${B.name}</h1>
<p class="page-header-lead">Votre chauffagiste en Gironde à votre service du lundi au samedi. Devis gratuit sous 48h, réponse à toutes vos questions.</p>
</div></section>

<section class="seo-section"><div class="container">
<div class="contact-grid">
<div class="contact-info">
<div class="contact-block">
<div class="contact-block-icon">${iconSvg.phone}</div>
<div class="contact-block-content"><h3>Téléphone</h3><p><a href="tel:${B.phoneTel}">${B.phoneDisplay}</a></p><p style="font-size:.85rem;color:var(--text-soft);">Du lundi au samedi : ${B.hoursWeekdays}</p></div>
</div>
<div class="contact-block">
<div class="contact-block-icon">${iconSvg.mail}</div>
<div class="contact-block-content"><h3>Email</h3><p><a href="mailto:${B.email}">${B.email}</a></p><p style="font-size:.85rem;color:var(--text-soft);">Réponse sous 24h ouvrées</p></div>
</div>
<div class="contact-block">
<div class="contact-block-icon">${iconSvg.mapPin}</div>
<div class="contact-block-content"><h3>Adresse</h3><p>${B.street}<br>${B.postal} ${B.city}</p><p style="font-size:.85rem;color:var(--text-soft);">Intervention dans toute la Gironde (${B.dept})</p></div>
</div>
<div class="contact-block">
<div class="contact-block-icon">${iconSvg.clock}</div>
<div class="contact-block-content"><h3>Horaires</h3><p>Lundi au vendredi : ${B.hoursWeekdays}<br>Samedi : ${B.hoursSaturday}<br>Dimanche : ${B.hoursSunday}</p></div>
</div>
</div>
<div>
<h2 style="margin-bottom:1.2rem;">Envoyez-nous un message</h2>
<p style="color:var(--text-mid); margin-bottom:1.2rem;">Nous vous recontactons sous 24h ouvrées pour discuter de votre projet et planifier une visite technique gratuite.</p>
${contactForm('contact')}
</div>
</div>
</div></section>

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'contact.html'), html);
}

function genDevisPage() {
  const title = `Devis gratuit PAC, Clim, VMC en Gironde | ${B.name}`;
  const desc = `Demandez votre devis gratuit sous 48h à ATMR ÉNERGIES : pompe à chaleur, climatisation, VMC, chauffage. Visite technique gratuite en Gironde. Garantie décennale.`;
  const html = head(title, desc, B.url + '/devis.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Devis gratuit' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Devis gratuit sous 48h pour votre projet énergétique</h1>
<p class="page-header-lead">Remplissez le formulaire ci-dessous : nous vous recontactons dans la journée pour planifier une visite technique gratuite et vous remettre un devis détaillé.</p>
</div></section>

<section class="seo-section"><div class="container" style="max-width:900px;">
<div style="background:var(--primary-light); border-left:4px solid var(--primary); padding:1.2rem; border-radius:8px; margin-bottom:2rem;">
<strong>Inclus dans votre devis ${B.name}</strong>
<ul style="margin-top:.5rem; padding-left:1.2rem; color:var(--text-mid);">
<li>Visite technique gratuite à domicile pour dimensionnement précis</li>
<li>Étude thermique et choix du matériel adapté (Daikin, Mitsubishi, Atlantic, Bosch...)</li>
<li>Comparatif de 2 à 3 scénarios techniques (marques, puissances, émetteurs)</li>
<li>Calcul des déperditions thermiques pour un dimensionnement précis</li>
<li>Chiffrage détaillé poste par poste (matériel, main d'œuvre, mise en service)</li>
</ul>
</div>
<div class="contact-form" style="padding:2rem;">
${contactForm('devis')}
</div>
</div></section>

${faqSection(FAQS.slice(0, 5))}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'devis.html'), html);
}

function genMerciPage() {
  const html = head('Merci pour votre demande — ATMR ÉNERGIES', 'Votre demande a bien été reçue. Nous vous recontactons sous 24h ouvrées.', B.url + '/merci.html')
  + topbar()
  + nav()
  + `<main>
<section class="error-page"><div class="container" style="text-align:center;">
<div style="font-size:4rem;margin-bottom:1rem;">✅</div>
<h1>Merci pour votre demande !</h1>
<p>Votre message est bien arrivé chez ATMR ÉNERGIES. Un membre de notre équipe vous recontactera sous <strong>24 heures ouvrées</strong> pour discuter de votre projet et planifier une visite technique si nécessaire.</p>
<p>Pour toute urgence, vous pouvez nous joindre directement au <a href="tel:${B.phoneTel}" style="color:var(--primary);font-weight:700;">${B.phoneDisplay}</a>.</p>
<div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
<a href="/" class="btn btn-primary">Retour à l'accueil</a>
<a href="/prestations.html" class="btn btn-secondary">Voir nos prestations</a>
</div>
</div></section>
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'merci.html'), html);
}

// ============================== FAQ / AVIS / ZONE / REALISATIONS ==============================

function genFaqPage() {
  const title = `FAQ — Questions fréquentes chauffagiste | ${B.name}`;
  const desc = `Toutes les réponses aux questions fréquentes sur nos prestations : pompe à chaleur, climatisation, VMC, tarifs, délais, garanties, zone d'intervention en Gironde.`;
  const html = head(title, desc, B.url + '/faq.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'FAQ' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Foire aux questions</h1>
<p class="page-header-lead">Les réponses à toutes vos questions sur nos prestations de chauffagiste en Gironde : tarifs, délais, aides, garanties, zone d'intervention.</p>
</div></section>

${faqSection(FAQS)}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'faq.html'), html);
}

function genAvisPage() {
  const title = `Avis clients ATMR ÉNERGIES | Chauffagiste en Gironde`;
  const desc = `Avis Google 100% authentiques et vérifiés sur ${B.name}. Note moyenne 5/5. Découvrez ce que nos clients pensent de nos installations PAC, climatisation et VMC.`;
  const html = head(title, desc, B.url + '/avis.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Avis clients' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Avis de nos clients en Gironde</h1>
<p class="page-header-lead">Avis Google 100% authentiques. Note moyenne <strong>5/5</strong>. Nous sommes fiers des retours de nos clients et les partageons ici en toute transparence.</p>
</div></section>

${b.googleReviewsSection()}

<section class="seo-section"><div class="container seo-content">
<h2>Notre engagement qualité</h2>
<p>Chaque chantier est suivi par un <strong>bilan de satisfaction</strong> à la mise en service puis à 3 mois. Cela nous permet d'identifier d'éventuels points d'amélioration et de maintenir un niveau de qualité constant. Nous encourageons tous nos clients à <strong>laisser un avis honnête</strong> sur Google après réalisation des travaux — c'est notre meilleur levier de progrès et la meilleure garantie pour les futurs clients.</p>
<p>Si vous avez fait appel à nos services et souhaitez partager votre expérience, vous pouvez nous laisser un avis sur notre fiche Google Business Profile. Votre retour, positif ou négatif, est précieux.</p>
</div></section>

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'avis.html'), html);
}

function genZoneInterventionPage() {
  const title = `Zone d'intervention ATMR ÉNERGIES en Gironde | Chauffagiste Bordeaux`;
  const desc = `ATMR ÉNERGIES intervient dans toute la Gironde (33) : Bordeaux, Mérignac, Pessac, Libourne, Saint-André-de-Cubzac, Cenon, Lormont. Rayon de ${B.zoneRadiusKm} km autour de ${B.city}.`;
  const html = head(title, desc, B.url + '/zone-intervention.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: `Zone d'intervention` }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Notre zone d'intervention en Gironde</h1>
<p class="page-header-lead">ATMR ÉNERGIES intervient dans toute la Gironde dans un rayon de ${B.zoneRadiusKm} km autour de notre siège de ${B.city} (${B.postal}). Retrouvez ci-dessous les principales villes que nous desservons quotidiennement.</p>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Notre zone d'intervention principale : Bordeaux Métropole et nord de la Gironde</h2>
<p>Depuis notre siège de ${B.city}, à 18 km de Bordeaux, nous desservons en priorité <strong>Bordeaux Métropole</strong> (28 communes) et le <strong>nord de la Gironde</strong> (Libournais, Cubzaguais, Blayais). Notre rayon d'action habituel couvre environ ${B.zoneRadiusKm} km, mais nous pouvons intervenir plus loin (Arcachon, Médoc, Bazadais) pour des projets importants ou des clients professionnels sous conditions de planning.</p>
</div></section>

<section class="services"><div class="container">
<h2 class="section-title">Villes desservies en Gironde</h2>
<p class="section-subtitle">Cliquez sur une ville pour consulter notre page dédiée</p>
<div class="cities-grid">
${b.CITIES.map(c => `<a href="/chauffagiste-${c.slug}.html" class="city-link">${iconSvg.mapPin} Chauffagiste ${c.name} (${c.cp})</a>`).join('\n')}
</div>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Communes également desservies dans un rayon de ${B.zoneRadiusKm} km</h2>
<p>En plus des villes principales, nous intervenons régulièrement dans les communes suivantes : <strong>Floirac, Bègles, Talence, Gradignan, Villenave-d'Ornon, Eysines, Bruges, Le Bouscat, Ambarès-et-Lagrave, Ambès, Bassens, Blaye, Bourg-sur-Gironde, Créon, Cadillac, Langon, Podensac, Arès</strong>. Si votre commune n'apparaît pas dans cette liste, contactez-nous — nous pouvons nous déplacer selon le projet et la charge de travail.</p>
<h2>Intervention rapide partout en Gironde</h2>
<p>Pour un <strong>dépannage urgent</strong> (chaudière en panne, fuite, climatisation qui ne fonctionne plus), nous intervenons en général <strong>sous 24 à 72 heures</strong> dans toute notre zone. Pour un <strong>projet d'installation</strong>, nous calons la visite technique dans les 2 à 5 jours suivant votre demande, puis le devis est remis sous 48h après visite. Le chantier proprement dit démarre généralement 3 à 6 semaines plus tard, selon la disponibilité du matériel commandé.</p>
<h2>Frais de déplacement</h2>
<p>Dans notre zone principale (${B.zoneRadiusKm} km autour de ${B.city}), les <strong>frais de déplacement sont inclus</strong> dans nos devis pour toute installation. Pour les dépannages sans contrat d'entretien, un forfait déplacement de 45 € à 85 € TTC s'applique selon la distance. Avec un contrat d'entretien, le déplacement est gratuit.</p>
</div></section>

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'zone-intervention.html'), html);
}

function genRealisationsPage() {
  const title = `Réalisations ATMR ÉNERGIES | Chantiers PAC, Clim, VMC en Gironde`;
  const desc = `Découvrez nos dernières réalisations de chauffagiste en Gironde : installations PAC, climatisations, VMC. Chantiers à Bordeaux, Libourne, Mérignac, ${B.city}.`;
  const html = head(title, desc, B.url + '/realisations.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Réalisations' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Nos dernières réalisations en Gironde</h1>
<p class="page-header-lead">Découvrez nos chantiers récents d'installation de pompes à chaleur, de climatisation et de VMC dans toute la Gironde. Plus de ${B.projectsDone} projets réalisés depuis ${B.foundingYear}.</p>
</div></section>

<section class="seo-section"><div class="container seo-content">
<h2>Nos domaines de réalisation</h2>
<p>Depuis ${B.foundingYear}, ATMR ÉNERGIES a accompagné plus de ${B.projectsDone} particuliers et professionnels de Gironde dans leurs projets de chauffage, climatisation et ventilation. Du remplacement d'une chaudière fioul par une PAC air-eau à l'installation complète d'une climatisation multisplit dans une maison neuve, en passant par la pose d'une VMC double flux lors d'une rénovation énergétique : nos équipes ont l'expérience de tous les types de chantiers.</p>
<p>Nos clients sont essentiellement des <strong>propriétaires occupants</strong> (maisons individuelles, appartements en copropriété), des <strong>propriétaires bailleurs</strong> qui anticipent les obligations de la loi Climat, et des <strong>petits professionnels</strong> (commerces, cabinets, locaux tertiaires jusqu'à 200 m²).</p>
</div></section>

<section class="services"><div class="container">
<h2 class="section-title">Exemples de chantiers récents</h2>
<p class="section-subtitle">Un aperçu de nos installations réalisées en Gironde</p>
<!-- REALISATIONS_INSERT_HERE -->
<div class="services-grid">
<article class="service-card">
<img src="/img/services/pac-air-eau.webp" alt="Installation PAC air-eau Daikin Altherma à Bordeaux" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>PAC air-eau Daikin 11 kW</h3><span class="service-price">Bordeaux</span></div>
<p>Remplacement d'une chaudière fioul par une PAC Daikin Altherma 3 M sur radiateurs basse température. Chantier réalisé en 3 jours. Gain prévisionnel de 60 à 70% sur la facture de chauffage.</p>
</div>
</article>
<article class="service-card">
<img src="/img/services/clim-multisplit.webp" alt="Climatisation multisplit Mitsubishi à Mérignac" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>Multisplit Mitsubishi 4 pièces</h3><span class="service-price">Mérignac</span></div>
<p>Installation d'une climatisation réversible multisplit Mitsubishi MSZ-LN 12 kW desservant 4 pièces (salon, 3 chambres). Chantier réalisé en 2 jours, niveau sonore 19 dB.</p>
</div>
</article>
<article class="service-card">
<img src="/img/services/pac-air-air.webp" alt="VMC double flux Atlantic à Libourne" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>VMC double flux Atlantic</h3><span class="service-price">Libourne</span></div>
<p>Pose d'une VMC double flux Atlantic Duolix Max dans une maison rénovée de 130 m². Récupération de 85% de la chaleur, passage du DPE de E à C.</p>
</div>
</article>
<article class="service-card">
<img src="/img/services/pac-hybride.webp" alt="PAC hybride De Dietrich à Pessac" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>PAC hybride De Dietrich</h3><span class="service-price">Pessac</span></div>
<p>Installation d'un système hybride PAC + chaudière gaz condensation De Dietrich Alézio Hybrid. Bascule automatique sur l'énergie la plus économique selon la température.</p>
</div>
</article>
<article class="service-card">
<img src="/img/services/clim-gainable.webp" alt="Climatisation gainable Daikin à Saint-André-de-Cubzac" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>Clim gainable Daikin</h3><span class="service-price">Saint-André-de-Cubzac</span></div>
<p>Climatisation réversible gainable invisible dans une construction neuve de 150 m². Aucune unité apparente, 5 bouches de soufflage intégrées au faux-plafond.</p>
</div>
</article>
<article class="service-card">
<img src="/img/services/clim-monosplit.webp" alt="PAC air-air Toshiba à Montussan" width="400" height="200" loading="lazy" class="service-card-img">
<div class="service-card-body">
<div class="service-card-header"><h3>Monosplit Toshiba Shorai Edge</h3><span class="service-price">Montussan</span></div>
<p>Installation d'un monosplit Toshiba Shorai Edge 3,5 kW dans un salon de 40 m². Chantier réalisé en 6 heures. Budget 1 850 € TTC pose comprise.</p>
</div>
</article>
</div>
</div></section>

${testimonialsSection()}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'realisations.html'), html);
}

// ============================== TARIFS ==============================

function genTarifsPage() {
  const title = `Tarifs chauffagiste à ${B.city} et Bordeaux — ${B.name}`;
  const desc = `Fourchettes de prix pour l'installation de PAC, climatisation, VMC et chauffage en Gironde. Devis gratuit détaillé sous 48h.`;
  const pricing = [
    { label: 'Pompe à chaleur air-eau', range: '8 000 € – 18 000 €', detail: 'Installation complète, matériel + pose + mise en service, selon puissance (6 à 16 kW) et type d\'émetteurs (radiateurs, plancher chauffant).' },
    { label: 'Pompe à chaleur air-air (monosplit)', range: '1 500 € – 3 500 €', detail: 'Un groupe extérieur + une unité intérieure, posé et mis en service. Compatible avec les grandes marques (Daikin, Mitsubishi, Toshiba).' },
    { label: 'Climatisation multisplit', range: '3 500 € – 7 500 €', detail: 'Un groupe extérieur + 2 à 5 unités intérieures pour plusieurs pièces. Idéal pour maisons 100-150 m².' },
    { label: 'Climatisation gainable', range: '6 000 € – 12 000 €', detail: 'Solution haut de gamme invisible, diffusion par bouches dans les faux-plafonds. Études aéraulique incluse.' },
    { label: 'VMC simple flux hygroréglable', range: '800 € – 2 000 €', detail: 'Extraction modulée selon humidité. Adapté aux rénovations et petits logements (T2 à T4).' },
    { label: 'VMC double flux avec récupération de chaleur', range: '3 000 € – 4 500 €', detail: 'Récupère jusqu\'à 90% de la chaleur sortante. Économies énergétiques de 10 à 20%.' },
    { label: 'Chaudière à condensation gaz', range: '3 500 € – 7 500 €', detail: 'Remplacement chaudière standard par modèle à condensation (rendement 108-110%). Gain 25 à 30% sur facture.' },
    { label: 'Plancher chauffant hydraulique', range: '50 € – 90 € / m²', detail: 'Pose + chape incluse. Durée chantier 4 à 7 jours. Compatible PAC pour rendement optimal.' },
    { label: 'Radiateurs basse température (unité)', range: '250 € – 900 €', detail: 'Indispensables pour profiter du rendement d\'une chaudière à condensation ou d\'une PAC air-eau. Marques Acova, Finimetal, Atlantic.' },
    { label: 'Entretien annuel chaudière', range: '160 € / an', detail: 'Contrat visite annuelle + attestation + priorité SAV + 15% remise sur pièces détachées.' },
    { label: 'Entretien annuel PAC air-eau', range: '180 € / an', detail: 'Contrôle F-Gas, nettoyage unités, pressions circuit, attestation. Obligatoire sur PAC >4 kW (décret 2020-912).' },
    { label: 'Entretien annuel climatisation', range: '120 € / an (par unité intérieure)', detail: 'Nettoyage filtres, contrôle circuit frigorifique, équilibrage.' },
    { label: 'Entretien annuel VMC', range: '130 € / an', detail: 'Nettoyage bouches + caisson + filtres (pour VMC double flux), contrôle débit.' },
    { label: 'Dépannage ponctuel (sans contrat)', range: '95 € déplacement + 65 €/h', detail: 'Diagnostic + main d\'œuvre. Pièces au prix public constructeur. Contrats d\'entretien : déplacement gratuit.' },
  ];
  const html = head(title, desc, B.url + '/tarifs.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Tarifs' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Nos tarifs indicatifs en Gironde</h1>
<p class="page-header-lead">Fourchettes de prix pour nos principales prestations. Chaque projet est unique : nous vous remettons un devis détaillé poste par poste après visite technique gratuite à domicile.</p>
</div></section>

<section class="seo-section"><div class="container" style="max-width:980px;">
<div style="background:var(--primary-light); border-left:4px solid var(--primary); padding:1.2rem; border-radius:8px; margin-bottom:2rem;">
<strong>💡 Pour un chiffrage précis, demandez votre devis gratuit</strong>
<p style="margin-top:.5rem; color:var(--text-mid); font-size:.93rem;">Les prix ci-dessous sont des fourchettes indicatives basées sur nos chantiers récents en Gironde. Le prix final dépend de la configuration de votre logement, de la marque et de la puissance choisies, et de la complexité de pose. Contactez-nous pour une <a href="/devis.html">étude gratuite détaillée</a>.</p>
</div>
<div class="tarifs-grid">
${pricing.map(p => `<article class="tarif-card">
<div class="tarif-head"><h3>${p.label}</h3><div class="tarif-range">${p.range}</div></div>
<p>${p.detail}</p>
</article>`).join('\n')}
</div>
</div></section>

<section class="seo-section" style="background:var(--bg);"><div class="container seo-content">
<h2>Modalités de paiement et financement</h2>
<p>Nous acceptons les paiements par <strong>virement bancaire</strong>, <strong>chèque</strong> et <strong>carte bancaire jusqu'à 5 000 €</strong>. Pour les chantiers supérieurs à 3 000 €, nous proposons un <strong>financement en 3, 4 ou 10 fois sans frais</strong> via notre partenaire bancaire (sous réserve d'acceptation du dossier).</p>
<p>Pour les gros projets (PAC + VMC + chauffage complet) : un acompte de 30% est demandé à la commande, 40% à mi-chantier, et le solde de 30% à la livraison.</p>
<h2>TVA applicable</h2>
<p>Les travaux réalisés chez des particuliers dans des logements de plus de 2 ans bénéficient de la <strong>TVA à 10%</strong> (article 279-0 bis du CGI). Dans les logements neufs ou pour des travaux non éligibles, la TVA normale de 20% s'applique. Le taux applicable est toujours précisé sur le devis.</p>
<h2>Garanties incluses</h2>
<p>Toutes nos installations sont livrées avec :</p>
<ul>
<li><strong>Garantie décennale</strong> obligatoire (articles 1792 et suivants du Code civil)</li>
<li><strong>Garantie biennale</strong> sur les éléments d'équipement dissociables</li>
<li><strong>Garantie constructeur</strong> : 2 à 10 ans selon marques (ex : 10 ans compresseur Daikin, 7 ans Mitsubishi Zubadan)</li>
<li><strong>Garantie de parfait achèvement</strong> pendant 1 an</li>
</ul>
</div></section>

${faqSection(FAQS.slice(0, 5))}

${ctaBanner()}
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'tarifs.html'), html);
}

// ============================== LEGAL ==============================

function genMentionsLegales() {
  const title = `Mentions légales — ${B.name}`;
  const desc = `Mentions légales du site ${B.domain} : éditeur ${B.legal}, SIRET ${B.siret}, siège ${B.city} (${B.postal}), hébergement Cloudflare Pages.`;
  const html = head(title, desc, B.url + '/mentions-legales.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Mentions légales' }])
  + `<main>
<section class="page-header"><div class="container"><h1>Mentions légales</h1></div></section>
<section class="seo-section"><div class="container prose">
<h2>Éditeur du site</h2>
<p><strong>${B.name}</strong><br>
Entrepreneur individuel : Mathieu REMONDET<br>
Siège social : ${B.street}, ${B.postal} ${B.city}, France<br>
Téléphone : <a href="tel:${B.phoneTel}">${B.phoneDisplay}</a><br>
Email : <a href="mailto:${B.email}">${B.email}</a></p>
<p><strong>SIREN :</strong> ${B.siren}<br>
<strong>SIRET :</strong> ${B.siret}<br>
<strong>TVA intracommunautaire :</strong> ${B.tva}<br>
<strong>Code NAF :</strong> ${B.codeNaf} (Travaux d'installation d'équipements thermiques)<br>
<strong>Forme juridique :</strong> Entrepreneur individuel<br>
<strong>Inscription au RNE :</strong> inscrit<br>
<strong>Date de création :</strong> ${B.officialFoundingDate}</p>

<h2>Directeur de la publication</h2>
<p>Monsieur Mathieu Remondet, en qualité de dirigeant de l'entreprise individuelle ${B.name}.</p>

<h2>Hébergeur</h2>
<p><strong>Cloudflare, Inc.</strong><br>
101 Townsend St, San Francisco, CA 94107, USA<br>
Téléphone : +1 (650) 319-8930<br>
Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener">www.cloudflare.com</a></p>
<p>Les pages du site sont distribuées via <strong>Cloudflare Pages</strong>, plateforme d'hébergement de sites statiques. Les données de formulaires sont traitées par <strong>Supabase Inc.</strong> (900 Alabama St, San Francisco, CA 94110) au titre de l'API de réception des demandes.</p>

<h2>Propriété intellectuelle</h2>
<p>L'ensemble du contenu du site <strong>${B.domain}</strong> (textes, graphismes, logos, icônes, photographies, logos marques partenaires) est la propriété exclusive de ${B.name} ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction totale ou partielle de ce site sans autorisation expresse préalable de l'éditeur est interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
<p>Les marques et logos figurant sur le site (Daikin, Mitsubishi Electric, Atlantic, Bosch, etc.) sont la propriété de leurs détenteurs respectifs et sont utilisés avec leur autorisation dans le cadre de notre activité de revendeur et d'installateur.</p>

<h2>Données personnelles</h2>
<p>Les informations recueillies via les formulaires du site (nom, téléphone, email, message, ville, prestation demandée) font l'objet d'un traitement informatique destiné à répondre à votre demande de devis ou de contact. Le responsable du traitement est ${B.name}.</p>
<p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition aux données qui vous concernent. Pour exercer ces droits, vous pouvez nous contacter par email à <a href="mailto:${B.email}">${B.email}</a> ou par courrier à notre siège.</p>
<p>Pour plus d'informations, consultez notre <a href="/politique-confidentialite.html">politique de confidentialité</a>.</p>

<h2>Cookies</h2>
<p>Ce site utilise des cookies à des fins de mesure d'audience (Google Analytics 4, Microsoft Clarity). Ces cookies ne sont déposés qu'après votre consentement explicite via la bannière de consentement qui apparaît lors de votre première visite. Vous pouvez à tout moment modifier vos préférences en vidant les données de votre navigateur pour ce site.</p>

<h2>Assurance professionnelle</h2>
<p>${B.name} est couvert par une assurance de responsabilité civile professionnelle et une assurance <strong>garantie décennale</strong> conformément à l'article L.241-1 du Code des assurances, pour l'ensemble de ses prestations d'installation, d'entretien et de dépannage d'équipements thermiques.</p>

<h2>Litiges & médiation</h2>
<p>En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents pour connaître du litige. Conformément à l'article L.612-1 du Code de la consommation, vous avez la possibilité de recourir gratuitement à un médiateur de la consommation : <strong>CNPM - Médiation de la consommation</strong>, 27 avenue de la Libération, 42400 Saint-Chamond — <a href="https://www.cnpm-mediation-consommation.eu" target="_blank" rel="noopener">cnpm-mediation-consommation.eu</a>.</p>

<h2>Contact mentions légales</h2>
<p>Pour toute question relative aux présentes mentions légales : <a href="mailto:${B.email}">${B.email}</a>.</p>
</div></section>
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'mentions-legales.html'), html);
}

function genPolitiqueConfidentialite() {
  const title = `Politique de confidentialité — ${B.name}`;
  const desc = `Politique de confidentialité et traitement des données personnelles du site ${B.domain}. Droits RGPD, cookies, finalités, conservation des données.`;
  const html = head(title, desc, B.url + '/politique-confidentialite.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Politique de confidentialité' }])
  + `<main>
<section class="page-header"><div class="container"><h1>Politique de confidentialité</h1></div></section>
<section class="seo-section"><div class="container prose">
<p>La présente politique de confidentialité décrit la manière dont ${B.name} (ci-après « nous ») collecte, utilise et protège les informations personnelles que vous nous communiquez via le site <strong>${B.domain}</strong>.</p>

<h2>1. Responsable du traitement</h2>
<p>Le responsable du traitement des données personnelles est ${B.name}, entrepreneur individuel représenté par Mathieu Remondet, dont le siège est situé ${B.street}, ${B.postal} ${B.city}. Contact : <a href="mailto:${B.email}">${B.email}</a> — <a href="tel:${B.phoneTel}">${B.phoneDisplay}</a>.</p>

<h2>2. Données collectées</h2>
<p>Nous collectons uniquement les données que vous nous transmettez volontairement via les formulaires du site :</p>
<ul>
<li><strong>Nom et prénom</strong> (obligatoire) : pour vous identifier dans notre suivi</li>
<li><strong>Numéro de téléphone</strong> (obligatoire) : pour vous rappeler et planifier une visite technique</li>
<li><strong>Email</strong> (facultatif) : pour vous adresser devis et documents</li>
<li><strong>Ville</strong> (facultatif) : pour évaluer la faisabilité de l'intervention dans notre zone</li>
<li><strong>Prestation souhaitée</strong> (facultatif) : pour orienter votre demande</li>
<li><strong>Message libre</strong> (facultatif) : pour nous communiquer les détails de votre projet</li>
</ul>
<p>Nous collectons également, pour des fins de mesure d'audience (si vous y consentez via la bannière cookies) : <strong>adresse IP anonymisée, type de navigateur, pages visitées, durée de visite</strong>.</p>

<h2>3. Finalités du traitement</h2>
<p>Vos données sont utilisées uniquement pour :</p>
<ul>
<li>Vous recontacter suite à votre demande de devis ou de contact</li>
<li>Établir un devis et organiser une visite technique</li>
<li>Réaliser les prestations que vous nous commanderez</li>
<li>Respecter nos obligations légales (facturation, garantie décennale)</li>
<li>Mesurer l'audience du site et améliorer son fonctionnement (avec votre consentement)</li>
</ul>
<p>Nous <strong>ne vendons jamais</strong> vos données à des tiers et nous ne les utilisons pas à des fins de prospection commerciale sans votre accord explicite.</p>

<h2>4. Base légale</h2>
<p>Le traitement de vos données repose sur votre <strong>consentement</strong> (envoi du formulaire) et, pour la phase d'exécution du contrat une fois signé, sur la <strong>nécessité contractuelle</strong>.</p>

<h2>5. Destinataires des données</h2>
<p>Vos données sont traitées uniquement par ${B.name} et nos sous-traitants techniques :</p>
<ul>
<li><strong>Supabase Inc.</strong> (États-Unis) : hébergement de la base de données clients et des messages formulaires (certifié SOC 2, chiffrement au repos)</li>
<li><strong>Cloudflare Pages</strong> : hébergement du site et protection anti-DDoS</li>
<li><strong>Twilio France</strong> : envoi de SMS et d'appels téléphoniques via notre numéro de tracking ${B.phoneDisplay}</li>
<li><strong>Google Analytics 4</strong> (avec consentement) : mesure d'audience anonymisée</li>
</ul>
<p>Les transferts de données vers les États-Unis sont encadrés par les clauses contractuelles types de la Commission européenne et le cadre de protection des données UE-USA (Data Privacy Framework).</p>

<h2>6. Durée de conservation</h2>
<ul>
<li><strong>Demandes sans suite</strong> (aucun devis signé) : 3 ans à compter du dernier contact</li>
<li><strong>Clients ayant contracté une prestation</strong> : 10 ans (durée de la garantie décennale + obligations comptables)</li>
<li><strong>Données analytiques</strong> (Google Analytics) : 14 mois</li>
</ul>

<h2>7. Vos droits</h2>
<p>Conformément au RGPD et à la loi Informatique et Libertés, vous bénéficiez des droits suivants sur vos données :</p>
<ul>
<li>Droit d'<strong>accès</strong> à vos données</li>
<li>Droit de <strong>rectification</strong> en cas d'erreur</li>
<li>Droit à l'<strong>effacement</strong> (« droit à l'oubli »)</li>
<li>Droit à la <strong>limitation</strong> du traitement</li>
<li>Droit à la <strong>portabilité</strong> (récupération dans un format structuré)</li>
<li>Droit d'<strong>opposition</strong> au traitement</li>
<li>Droit de retirer votre <strong>consentement</strong> à tout moment</li>
</ul>
<p>Pour exercer vos droits, contactez-nous à <a href="mailto:${B.email}">${B.email}</a> en précisant votre demande. Nous vous répondrons dans un délai maximum d'un mois.</p>

<h2>8. Réclamation auprès de la CNIL</h2>
<p>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : 3 place de Fontenoy, 75007 Paris — <a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>.</p>

<h2>9. Cookies</h2>
<p>Notre site utilise uniquement des cookies de mesure d'audience (Google Analytics 4, Microsoft Clarity), déposés <strong>uniquement après votre consentement</strong> via la bannière cookies. Aucun cookie publicitaire tiers n'est déposé. Vous pouvez retirer votre consentement à tout moment en vidant les données de votre navigateur pour notre site.</p>

<h2>10. Sécurité des données</h2>
<p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : <strong>chiffrement HTTPS/TLS 1.3</strong> sur l'ensemble du site, <strong>authentification forte</strong> sur l'accès à la base clients, <strong>sauvegarde quotidienne</strong>, <strong>accès limité</strong> au strict personnel autorisé.</p>

<h2>11. Évolution de la politique</h2>
<p>Cette politique peut être mise à jour à tout moment pour tenir compte des évolutions légales ou de nos pratiques. La date de dernière mise à jour est indiquée en bas de cette page.</p>

<p style="color:var(--text-soft);font-size:.88rem;margin-top:2rem;"><em>Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</em></p>
</div></section>
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'politique-confidentialite.html'), html);
}

function genCGV() {
  const title = `Conditions générales de vente — ${B.name}`;
  const desc = `CGV ${B.name} : modalités de devis, commande, paiement, garanties, rétractation pour nos prestations de chauffagiste en Gironde.`;
  const html = head(title, desc, B.url + '/cgv.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'CGV' }])
  + `<main>
<section class="page-header"><div class="container"><h1>Conditions générales de vente</h1></div></section>
<section class="seo-section"><div class="container prose">
<p>Les présentes conditions générales de vente (CGV) régissent l'ensemble des prestations réalisées par <strong>${B.name}</strong>, entrepreneur individuel représenté par Mathieu Remondet, SIRET ${B.siret}, sise ${B.street}, ${B.postal} ${B.city}, au profit de toute personne physique ou morale (ci-après « le Client »).</p>

<h2>Article 1 - Objet</h2>
<p>Les présentes CGV s'appliquent à toutes les prestations de <strong>chauffagiste, installation, entretien et dépannage d'équipements thermiques</strong> (pompes à chaleur, climatisations, VMC, chaudières, chauffe-eau) proposées par ${B.name}. Toute commande implique l'acceptation sans réserve des présentes CGV par le Client.</p>

<h2>Article 2 - Devis et commande</h2>
<p>Tout devis émis par ${B.name} est <strong>gratuit</strong> et valable <strong>30 jours</strong> à compter de sa date d'émission. La commande est ferme et définitive à compter de l'acceptation écrite du devis par le Client (signature, email de confirmation ou bon pour accord) et du versement de l'acompte stipulé.</p>
<p>Les devis sont établis sur la base des informations fournies par le Client et de la visite technique réalisée. En cas d'élément imprévu découvert lors du chantier (canalisation cachée, structure dégradée, nécessité de travaux complémentaires), un avenant sera proposé avant toute modification du chantier.</p>

<h2>Article 3 - Prix et modalités de paiement</h2>
<p>Les prix sont exprimés en euros TTC, la TVA applicable étant mentionnée sur le devis (5,5 %, 10 % ou 20 % selon la nature et l'éligibilité des travaux aux taux réduits). Les prix indiqués comprennent le matériel, la main d'œuvre, la mise en service et, selon le cas, le déplacement.</p>
<p><strong>Modalités de paiement :</strong> acompte de 30 % à la commande, 40 % à mi-chantier, solde de 30 % à la livraison. Paiements acceptés : virement bancaire, chèque, carte bancaire (jusqu'à 5 000 €), financement en 3, 4 ou 10 fois sans frais via notre partenaire bancaire pour les chantiers supérieurs à 3 000 €.</p>
<p><strong>Retard de paiement :</strong> tout retard de paiement entraîne l'application de pénalités de retard au taux d'intérêt légal majoré de 10 points, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 € (article D.441-5 du Code de commerce).</p>

<h2>Article 4 - Délais d'exécution</h2>
<p>Les délais indiqués sur le devis sont des estimations. ${B.name} s'engage à mettre en œuvre les moyens nécessaires pour respecter ces délais. En cas de retard non imputable au Client (retard de livraison fournisseur, intempéries, cas de force majeure), la responsabilité de ${B.name} ne saurait être engagée.</p>

<h2>Article 5 - Garanties</h2>
<p>Toutes nos installations bénéficient de :</p>
<ul>
<li><strong>Garantie décennale</strong> obligatoire pour les ouvrages entrant dans le champ de l'article 1792 du Code civil (installation ayant un impact sur la solidité du bâti)</li>
<li><strong>Garantie biennale</strong> (articles 1792-3 du Code civil) sur les éléments d'équipement dissociables</li>
<li><strong>Garantie de parfait achèvement</strong> pendant 1 an (article 1792-6 du Code civil)</li>
<li><strong>Garantie constructeur</strong> sur le matériel : de 2 à 10 ans selon les marques et modèles, détaillée sur le devis</li>
</ul>

<h2>Article 6 - Droit de rétractation</h2>
<p>Pour les contrats conclus <strong>hors établissement</strong> (domicile du client), le Client dispose d'un délai de rétractation de <strong>14 jours</strong> à compter de la signature, sans avoir à justifier de motif ni à payer de pénalité. Le formulaire de rétractation est remis avec le devis.</p>
<p>À la demande expresse du Client, l'exécution des prestations peut commencer avant l'expiration du délai de rétractation (mention spécifique à signer sur le devis). Dans ce cas, en cas de rétractation, le Client s'acquitte des prestations déjà réalisées au prorata.</p>

<h2>Article 7 - Aides financières</h2>
<p>Les travaux réalisés par ${B.name} peuvent bénéficier de la TVA à 10% dans les logements de plus de 2 ans conformément à l'article 279-0 bis du Code général des impôts. Le Client est seul responsable des démarches administratives liées à d'éventuelles aides financières auxquelles il pourrait prétendre.</p>

<h2>Article 8 - Responsabilité</h2>
<p>${B.name} est couvert par une assurance de responsabilité civile professionnelle et une garantie décennale. Sa responsabilité ne saurait être engagée en cas de dommage causé par un défaut d'entretien ou une mauvaise utilisation des équipements installés, ni en cas de dommage indirect ou immatériel consécutif à un sinistre.</p>

<h2>Article 9 - Force majeure</h2>
<p>${B.name} ne saurait être tenu responsable du retard ou de l'inexécution d'une prestation en raison d'un cas de force majeure (conflits sociaux, intempéries exceptionnelles, pandémie, rupture d'approvisionnement non imputable à ${B.name}, etc.).</p>

<h2>Article 10 - Litiges</h2>
<p>Les présentes CGV sont régies par le droit français. En cas de litige, une solution amiable sera recherchée. À défaut, le Client peut saisir gratuitement le médiateur de la consommation CNPM (voir <a href="/mentions-legales.html">mentions légales</a>). Les tribunaux français seront seuls compétents.</p>

<p style="color:var(--text-soft);font-size:.88rem;margin-top:2rem;"><em>Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</em></p>
</div></section>
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'cgv.html'), html);
}

function genPlanDuSite() {
  const title = `Plan du site — ${B.name}`;
  const desc = `Plan du site ${B.domain} : toutes les pages du site ATMR ÉNERGIES organisées par catégories.`;
  const html = head(title, desc, B.url + '/plan-du-site.html')
  + topbar()
  + nav()
  + breadcrumb([{ href: '/', label: 'Accueil' }, { label: 'Plan du site' }])
  + `<main>
<section class="page-header"><div class="container">
<h1>Plan du site</h1>
<p class="page-header-lead">Retrouvez toutes les pages de notre site organisées par thématique.</p>
</div></section>
<section class="seo-section"><div class="container prose">
<h2>Pages principales</h2>
<ul>
<li><a href="/">Accueil</a></li>
<li><a href="/a-propos.html">À propos d'ATMR ÉNERGIES</a></li>
<li><a href="/prestations.html">Toutes nos prestations</a></li>
<li><a href="/realisations.html">Nos réalisations</a></li>
<li><a href="/zone-intervention.html">Zone d'intervention</a></li>
<li><a href="/avis.html">Avis clients</a></li>
<li><a href="/faq.html">Foire aux questions</a></li>
<li><a href="/contact.html">Contact</a></li>
<li><a href="/devis.html">Devis gratuit</a></li>
<li><a href="/tarifs.html">Tarifs indicatifs</a></li>
</ul>

<h2>Prestations</h2>
<ul>
${SERVICES.map(s => `<li><a href="/${s.slug}.html">${s.label}</a></li>`).join('\n')}
</ul>

<h2>Villes desservies en Gironde</h2>
<ul>
${CITIES.map(c => `<li><a href="/chauffagiste-${c.slug}.html">Chauffagiste ${c.name} (${c.cp})</a></li>`).join('\n')}
</ul>

<h2>Informations légales</h2>
<ul>
<li><a href="/mentions-legales.html">Mentions légales</a></li>
<li><a href="/politique-confidentialite.html">Politique de confidentialité</a></li>
<li><a href="/cgv.html">Conditions générales de vente</a></li>
</ul>
</div></section>
</main>`
  + footer();
  writeHtml(path.join(__dirname, 'plan-du-site.html'), html);
}

function gen404() {
  const html = head('Page introuvable (404) — ATMR ÉNERGIES', 'Cette page n\'existe pas ou a été déplacée. Retournez à l\'accueil ou utilisez le menu principal.', B.url + '/404.html')
  + topbar()
  + nav()
  + `<main>
<section class="error-page"><div class="container">
<div class="error-code">404</div>
<h1>Oups, cette page n'existe pas</h1>
<p>La page que vous cherchez a peut-être été déplacée ou n'existe plus. Retournez à l'accueil ou consultez directement nos principales pages.</p>
<div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
<a href="/" class="btn btn-primary">Retour à l'accueil</a>
<a href="/prestations.html" class="btn btn-secondary">Voir nos prestations</a>
<a href="tel:${B.phoneTel}" class="btn btn-dark">${iconSvg.phone} ${B.phoneDisplay}</a>
</div>
<div style="margin-top:2rem;">
<p style="font-size:.9rem;color:var(--text-soft);">Ou explorez nos pages populaires :</p>
<div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-top:.8rem;">
<a href="/pompe-a-chaleur.html" class="city-link" style="background:#fff;">Pompe à chaleur</a>
<a href="/climatisation.html" class="city-link" style="background:#fff;">Climatisation</a>
<a href="/vmc.html" class="city-link" style="background:#fff;">VMC</a>
<a href="/zone-intervention.html" class="city-link" style="background:#fff;">Zone d'intervention</a>
</div>
</div>
</div></section>
</main>`
  + footer();
  writeHtml(path.join(__dirname, '404.html'), html);
}

// ============================== TECHNICAL FILES ==============================

function genSitemap() {
  const urls = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/a-propos.html', priority: 0.8 },
    { loc: '/prestations.html', priority: 0.9, changefreq: 'weekly' },
    { loc: '/realisations.html', priority: 0.8, changefreq: 'weekly' },
    { loc: '/zone-intervention.html', priority: 0.8 },
    { loc: '/avis.html', priority: 0.7 },
    { loc: '/faq.html', priority: 0.7 },
    { loc: '/contact.html', priority: 0.8 },
    { loc: '/devis.html', priority: 0.9 },
    { loc: '/tarifs.html', priority: 0.8, changefreq: 'monthly' },
    ...SERVICES.map(s => ({ loc: `/${s.slug}.html`, priority: 0.9, changefreq: 'monthly' })),
    ...CITIES.map(c => ({ loc: `/chauffagiste-${c.slug}.html`, priority: 0.85, changefreq: 'monthly' })),
    { loc: '/mentions-legales.html', priority: 0.3 },
    { loc: '/politique-confidentialite.html', priority: 0.3 },
    { loc: '/cgv.html', priority: 0.3 },
    { loc: '/plan-du-site.html', priority: 0.4 },
  ];
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${B.url}${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq || 'monthly'}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
  console.log('✓ sitemap.xml');
}

function genRobots() {
  const txt = `User-agent: *
Allow: /
Disallow: /_build.js
Disallow: /_build-run.js
Disallow: /merci.html

Sitemap: ${B.url}/sitemap.xml
`;
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), txt, 'utf8');
  console.log('✓ robots.txt');
}

function genHeaders() {
  const headers = `/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://slcksfqbsbcmvqupbhox.supabase.co https://www.google-analytics.com https://*.clarity.ms; frame-src https://www.google.com https://maps.google.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable

/favicon*
  Cache-Control: public, max-age=604800

/*.html
  Cache-Control: public, max-age=3600, must-revalidate

/sitemap.xml
  Cache-Control: public, max-age=86400

/robots.txt
  Cache-Control: public, max-age=86400
`;
  fs.writeFileSync(path.join(__dirname, '_headers'), headers, 'utf8');
  console.log('✓ _headers');
}

function genRedirects() {
  const redirects = `# Redirections du site ATMR ÉNERGIES (anciennes URLs bolt)
/home    /    301
/index    /    301

# Anciennes URLs React du site bolt
/pompe-chaleur    /pompe-a-chaleur.html    301
/pac    /pompe-a-chaleur.html    301
/pac-air-air    /climatisation.html    301
/pac-air-eau    /pompe-a-chaleur.html    301
/clim    /climatisation.html    301
/climatisation-reversible    /climatisation.html    301
/vmc-simple-flux    /vmc.html    301
/vmc-double-flux    /vmc.html    301
/chauffage-eau-chaude    /chauffage.html    301
/depannage    /entretien-depannage.html    301
/entretien    /entretien-depannage.html    301
/renovation-energie    /bilan-energetique.html    301
/renovation-energetique    /bilan-energetique.html    301
/renovation-energetique.html    /bilan-energetique.html    301

# Anciennes pages ville
/bordeaux    /chauffagiste-bordeaux.html    301
/merignac    /chauffagiste-merignac.html    301
/libourne    /chauffagiste-libourne.html    301

# 404
/*    /404.html    404
`;
  fs.writeFileSync(path.join(__dirname, '_redirects'), redirects, 'utf8');
  console.log('✓ _redirects');
}

function genManifest() {
  const manifest = {
    name: B.name,
    short_name: 'ATMR',
    description: `Chauffagiste à ${B.city} et en Gironde — ${B.name}`,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e5c87',
    icons: [
      { src: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  fs.writeFileSync(path.join(__dirname, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✓ manifest.webmanifest');
}

function genReadme() {
  const md = `# atmr-energies.fr

Site web statique d'ATMR ÉNERGIES — chauffagiste, installateur de pompes à chaleur, climatisation et VMC à Montussan (Gironde 33).

## Infra
- Hébergement : Cloudflare Pages (projet \`atmr-energies\`)
- Repo : \`ZYIAKE/atmr-energies\` (connexion Git auto-deploy)
- CRM : atlinker.com (fiche \`crm_clients\`)
- Formulaires : API Supabase atlinker (\`site-form-submit\`)

## Génération du site
Toutes les pages HTML sont générées depuis \`_build.js\` et \`_build-run.js\`. Pour régénérer après modification :
\`\`\`
node _build-run.js
\`\`\`

## Ajout de réalisations
Modifier \`realisations.html\` ou passer par la fonction \`publish-realisation\` d'atlinker (insertion au marqueur \`<!-- REALISATIONS_INSERT_HERE -->\`).
`;
  fs.writeFileSync(path.join(__dirname, 'README.md'), md, 'utf8');
  console.log('✓ README.md');
}

function genGitignore() {
  const gi = `node_modules/
.DS_Store
Thumbs.db
*.log
.env
.env.local
_push.js
_setup-analytics.js
.claude/
`;
  fs.writeFileSync(path.join(__dirname, '.gitignore'), gi, 'utf8');
  console.log('✓ .gitignore');
}

// ============================== RUN ==============================

(async () => {
console.log('🏗️  Génération complète du site ATMR ÉNERGIES...\n');

// Fetch Google reviews au build-time pour les injecter en JSON-LD
try {
  const gr = await b.fetchGoogleReviews();
  b.setGoogleReviews(gr);
  console.log(`📣 Avis Google fetchés : ${gr.total || 0} avis, note ${gr.rating || '-'}/5\n`);
} catch (e) {
  console.warn('⚠️  Fetch avis Google échoué, fallback sur valeurs par défaut');
}

b.genHomepage();
b.genAPropos();
b.genPrestations();
SERVICES.forEach(s => {
  const data = SERVICE_PAGES[s.slug];
  if (data) b.genServicePage(s, data);
});
CITIES.forEach(c => b.genVillePage(c));
genContactPage();
genDevisPage();
genMerciPage();
genFaqPage();
genAvisPage();
genZoneInterventionPage();
genRealisationsPage();
genTarifsPage();
genMentionsLegales();
genPolitiqueConfidentialite();
genCGV();
genPlanDuSite();
gen404();
genSitemap();
genRobots();
genHeaders();
genRedirects();
genManifest();
genReadme();
genGitignore();

console.log('\n✅ Site ATMR ÉNERGIES généré avec succès.');
console.log(`   Pages : ${3 + SERVICES.length + CITIES.length + 8 + 4} pages + sitemap + robots + _headers + _redirects`);
})();
