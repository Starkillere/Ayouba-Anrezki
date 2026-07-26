# Décisions actées (2026-07-25)

Décisions confirmées avec Ayouba, suite à `01-analyse-et-questions.md`. Ce fichier fait foi pour l'implémentation.

## Architecture technique — Jekyll

- Moteur : **Jekyll**, natif à GitHub Pages (build automatique sans GitHub Actions à configurer).
- Format des articles : **Markdown** avec front-matter (titre, date, catégorie, tags), rendu en pages HTML par Jekyll.
- Notes de cours / documents longs : **PDF**, hébergés comme assets statiques et liés depuis les pages Markdown correspondantes (pas de conversion Typst → HTML pour l'instant).
- Rendu LaTeX dans les articles Markdown : à prévoir via **KaTeX** (léger, rapide) pour les formules inline dans les billets.

## Contact

- **Formulaire de contact via service tiers** (Formspree ou EmailJS — à trancher au moment de l'implémentation selon leurs quotas gratuits respectifs), appelé en JS pur depuis une page statique. Pas de simple `mailto:`.

## Contenu au lancement

- **Structure d'abord** : on met en place l'arborescence Jekyll (catégories, layouts, nav, page d'accueil listant les articles) avec 1-2 articles d'exemple par catégorie, pas une migration massive immédiate. Le contenu s'enrichit ensuite au fil de l'eau.

## Identité visuelle

- **Refonte complète.** On ne repart pas de la charte actuelle (bannière sombre/rouge, cf. `css/style.css`). Nouveau moodboard à définir, en s'inspirant du style épuré/académique de https://jingmatrix.github.io/en/ tout en gardant une identité propre à Ayouba (maths + créations + sciences).

## Langue

- **FR + EN dès le lancement.** L'architecture Jekyll doit prévoir la structure bilingue dès le départ (collections/front-matter par langue, sélecteur de langue, routes `/en/`), pas en ajout a posteriori.

## Dessins et schémas

- **Diagrammes en code (Mermaid / TikZ)**, versionnables comme du texte. Mermaid.js s'intègre facilement en JS pur côté client dans les pages Jekyll (pas de backend nécessaire). Pour des schémas plus mathématiques/précis, TikZ peut être exporté en image (SVG/PNG) au moment de la rédaction et inclus comme asset — à voir au cas par cas selon l'article.

## Ce que ça change pour l'existant du repo

- `index.html`, `Contact.html`, `cv.html`, `css/style.css`, `css/adaptation_ecrant.css` : seront remplacés par la structure Jekyll (layouts `_layouts/`, includes `_includes/`, collections/posts en Markdown, `assets/` réorganisé). On ne patche pas l'existant.
- Les assets actuels (`assets/img/profile.png`, `assets/content/Anrezki_Ayouba_CV.pdf`) sont réutilisables tels quels si on garde photo/CV.

## Contact — email

- Adresse définitive : **anrezki.ayouba@proton.me** (remplace `anrezkia531@gmail.com` utilisé dans `cv.html`/`Contact.html`).

## Liens sociaux

- **LinkedIn/Discord retirés** pour l'instant (les `#` actuels ne mènent nulle part). Pourront être rajoutés plus tard avec de vraies URLs.

## CV et page Contact

- **Restent séparés** du blog : design indépendant, pas intégrés aux layouts Jekyll du blog (pas de nav/header/footer partagés).

## Points encore ouverts avant de coder

- Harmonisation des infos biographiques (CV actuel vs brief : Mayotte/Nantes, dates de stage IRIT non mentionnées dans le CV, etc.) — mineur puisque le CV reste indépendant, mais à garder cohérent.
- Formspree vs EmailJS pour le formulaire de contact (à trancher selon quotas gratuits au moment de l'implémentation, sauf préférence d'Ayouba).
