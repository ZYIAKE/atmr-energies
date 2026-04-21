# atmr-energies.fr

Site web statique d'ATMR ÉNERGIES — chauffagiste, installateur de pompes à chaleur, climatisation et VMC à Montussan (Gironde 33).

## Infra
- Hébergement : Cloudflare Pages (projet `atmr-energies`)
- Repo : `ZYIAKE/atmr-energies` (connexion Git auto-deploy)
- CRM : atlinker.com (fiche `crm_clients`)
- Formulaires : API Supabase atlinker (`site-form-submit`)

## Génération du site
Toutes les pages HTML sont générées depuis `_build.js` et `_build-run.js`. Pour régénérer après modification :
```
node _build-run.js
```

## Ajout de réalisations
Modifier `realisations.html` ou passer par la fonction `publish-realisation` d'atlinker (insertion au marqueur `<!-- REALISATIONS_INSERT_HERE -->`).
