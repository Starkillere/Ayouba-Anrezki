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
---

Contenu en Markdown. Maths inline : `$a^2+b^2=c^2$` ; en bloc : `$$...$$`.
```

Points importants :

- `ref` doit être **identique** entre la version FR et la version EN d'un même article : c'est ce qui permet au sélecteur de langue de retrouver la traduction.
- `category` doit être un des slugs canoniques listés dans `_data/categories.yml` (ex. `recherche-maths`, pas `research-math` — le slug affiché dans l'URL, lui, change selon la langue).
- `permalink` est à écrire à la main pour chaque post, avec le préfixe `/fr/` ou `/en/`.
- Maths : utiliser `$...$` pour l'inline et `$$...$$` pour les blocs — **pas** `\( ... \)`, que Kramdown corrompt dès qu'il y a des parenthèses imbriquées à l'intérieur (ex. `\pi(x)`) ; vérifié par test réel lors de la mise en place.
- Pour un schéma en diagramme, utiliser un bloc de code ```` ```mermaid ```` — un petit script (`assets/js/mermaid-rewrite.js`) se charge de le rendre au chargement de la page.
- Pour des notes de cours longues (ex. exportées depuis Typst), déposer le PDF dans `assets/pdf/notes/` et le lier depuis l'article.

## Formulaire de contact

`Contact.html` pointe vers Formspree. Il faut créer un formulaire sur [formspree.io](https://formspree.io) et remplacer l'`id` dans l'attribut `action` du `<form>` (actuellement un placeholder `xxxxxxxx`).
