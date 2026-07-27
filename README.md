# blog-p

Blog personnel d'Ayouba Anrezki — Jekyll, bilingue FR/EN, hébergé sur GitHub Pages (build natif, pas de backend).

Contexte du projet, décisions d'architecture et questions/réponses avec Ayouba : voir [`planning/`](planning/).

## Lancer en local

```sh
gem install bundler
bundle install
bundle exec jekyll serve
```

Puis ouvrir `http://localhost:4000/fr/` (ou `/en/`).

## Ajouter un article

Créer un fichier Markdown dans `_posts/fr/` **et** son équivalent dans `_posts/en/`, nommés `AAAA-MM-JJ-titre.md`. Front-matter à reprendre :

```yaml
---
title: "Titre de l'article"
date: 2026-07-26
ref: un-identifiant-partage-entre-la-version-fr-et-en
category: recherche-maths   # slug canonique, identique en FR/EN — voir _data/categories.yml
tags: [tag-un, tag-deux]
excerpt: "Résumé affiché dans les listes d'articles."
permalink: /fr/recherche-maths/titre-de-larticle/
cover: covers/titre-de-larticle.svg   # image de couverture, voir convention plus bas
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/.../mon-document.pdf' | relative_url }}">📄 Nom du document (PDF)</a>
</div>

Contenu en Markdown. Maths inline : `$a^2+b^2=c^2$` ; en bloc : `$$...$$`.
```

Points importants :

- `ref` doit être **identique** entre la version FR et la version EN d'un même article : c'est ce qui permet au sélecteur de langue de retrouver la traduction.
- `category` doit être un des slugs canoniques listés dans `_data/categories.yml` (ex. `recherche-maths`, pas `research-math` — le slug affiché dans l'URL, lui, change selon la langue).
- `permalink` est à écrire à la main pour chaque post, avec le préfixe `/fr/` ou `/en/`.
- `date` doit être la date réelle du contenu (rédaction, fin du projet…), **pas** la date à laquelle l'article est mis en ligne — l'ordre d'affichage sur la home page est chronologique (plus récent en premier), il doit rester cohérent.
- Les articles de catégorie `cours` **n'apparaissent pas sur la home page** par défaut (seulement sur `/fr/cours/`) — ce sont des notes, pas des actualités. Pour qu'un article de cette catégorie apparaisse quand même sur la home page, ajouter `featured: true` en front-matter (voir le filtre dans `_layouts/home.html`).
- Maths : utiliser `$...$` pour l'inline et `$$...$$` pour les blocs — **pas** `\( ... \)`, que Kramdown corrompt dès qu'il y a des parenthèses imbriquées à l'intérieur (ex. `\pi(x)`) ; vérifié par test réel lors de la mise en place.
- Pour un schéma en diagramme, utiliser un bloc de code ```` ```mermaid ```` — un petit script (`assets/js/mermaid-rewrite.js`) se charge de le rendre au chargement de la page.
- Pour des notes de cours longues (ex. exportées depuis Typst) ou des documents à joindre à un article, déposer le PDF dans `assets/pdf/notes/<slug-article>/` et le lier depuis l'article.

### Convention systématique : couverture + documents

Pour **chaque article**, deux éléments sont désormais standards, pas optionnels :

1. **Une image de couverture** (`cover:` en front-matter, fichier SVG dans `assets/img/covers/<slug>.svg`) — une illustration originale sur le thème de l'article (dégradés, effet glow, motifs en ligne fine liés au sujet), dans le même esprit visuel que le site d'inspiration (jingmatrix.github.io), mais produite en SVG pur (pas de génération d'image IA disponible dans cet environnement). Elle est affichée automatiquement en haut de l'article par `_layouts/post.html`, **et** en vignette dans les listes d'articles (accueil, page catégorie) par `_includes/post-card.html`, si le champ `cover` est renseigné.
2. **Si l'article référence des documents téléchargeables** (PDF, notes, etc.), les lier via un bloc `<div class="doc-card">...</div>` placé **juste après le front-matter, avant le premier paragraphe** — pas en bas de page.

## Projets GitHub sur la home page

La home page (`_layouts/home.html`) affiche les 6 dépôts GitHub les plus étoilés d'Ayouba, via `assets/js/github-repos.js`. Ce script appelle l'API publique de GitHub (`api.github.com/users/Starkillere/repos`) **côté client**, au chargement de la page — aucun backend, aucune étape de build : la liste reflète directement l'état actuel de GitHub à chaque visite. Résultat mis en cache dans `localStorage` pendant 1h pour rester sous la limite de 60 requêtes/heure/IP de l'API non authentifiée. En cas d'échec (API indisponible, quota dépassé), un message de repli s'affiche avec un lien direct vers le profil GitHub.

## Formulaire de contact

`Contact.html` pointe vers Formspree. Il faut créer un formulaire sur [formspree.io](https://formspree.io) et remplacer l'`id` dans l'attribut `action` du `<form>` (actuellement un placeholder `xxxxxxxx`).
