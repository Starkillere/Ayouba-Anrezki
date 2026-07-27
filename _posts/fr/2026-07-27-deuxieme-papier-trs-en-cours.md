---
title: "Un deuxième papier sur les systèmes de réécriture, encore en chantier"
date: 2026-07-27
ref: journal-trs-completeness-draft
category: journal
tags: [réécriture de termes, IRIT, journal, work in progress]
excerpt: "Premier jet d'un papier plus poussé que le précédent sur les TRS : modularité de la confluence, contre-exemple de Toyama, et indécidabilité de la terminaison via une réduction au problème de l'arrêt. Pas terminé — j'y travaille encore."
permalink: /fr/journal/deuxieme-papier-trs-en-cours/
cover: covers/journal-trs-en-cours.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/rewrite-systems/trs-completeness-draft.pdf' | relative_url }}">📄 Terms Rewrite Systems Equational Reasoning, Complete Property — premier jet (PDF, en anglais)</a>
</div>

**Ce texte n'est pas terminé.** Après mon étude guidée de l'article de Dershowitz, j'ai commencé un second papier sur les systèmes de réécriture de termes, plus poussé et plus formel — je le partage tel quel, comme un journal de recherche plutôt qu'un résultat fini.

## Où j'en suis

Le papier repose sur un cadre formel assez complet : signatures, termes, positions et contextes, substitutions, congruences et théories équationnelles, jusqu'à la définition standard d'un système de réécriture de termes et de ses relations dérivées ($\to^\ast, \to^+, \leftrightarrow^\ast$). À partir de là, je redémontre proprement les résultats centraux : le lemme de Newman (terminaison et confluence locale entraînent la confluence), le théorème des paires critiques de Knuth-Bendix, et la caractérisation de la complétude (terminaison et confluence) qui rend le problème des mots décidable.

## Le morceau qui m'a pris le plus de temps : la modularité

La partie dont je suis le plus content pour l'instant concerne la **modularité** : si on prend deux systèmes de réécriture sur des signatures disjointes (aucun symbole en commun), et que chacun est confluent, est-ce que leur union l'est aussi ? La réponse est oui, et je le démontre — mais la preuve n'est pas immédiate : elle demande de suivre précisément comment un terme se décompose en un "squelette" (dans une des deux signatures) et des "alien" (sous-termes de l'autre signature), et de raisonner par récurrence sur un rang qui mesure l'imbrication de ces aliens, parce que l'union de deux systèmes confluents ne termine pas forcément — donc impossible d'invoquer directement le lemme de Newman.

Ce qui rend cette question intéressante, c'est que la **terminaison**, elle, n'est *pas* modulaire — et je reprends ici le contre-exemple classique de Toyama (1987) : deux systèmes qui terminent chacun séparément,

$$
\mathcal{R}_1 = \{\, f(x,y,x) \to f(x,y,y) \,\}, \qquad
\mathcal{R}_2 = \{\, g(x,y) \to x,\ g(x,y) \to y \,\}
$$

dont l'union boucle indéfiniment via un cycle explicite $t_0 \to t_1 \to t_2 \to t_0$. C'est précisément ce genre de "règles collapsantes" (dont le membre droit est une simple variable) qui empêche la terminaison de se transmettre — et c'est aussi pour ça que ma preuve de modularité de la confluence doit traiter ces règles collapsantes avec un soin particulier.

## Et pour finir (façon clin d'œil au premier papier)

Je termine par une section indépendante du reste : l'encodage d'une machine de Turing en système de réécriture de termes, pour montrer que la terminaison d'un TRS quelconque est indécidable — une version bien plus détaillée et construite explicitement de l'argument que j'esquissais déjà, plus informellement, dans mon premier papier sur Dershowitz.

Il me reste des sections à consolider (les règles collapsantes AC, quelques preuves admises sans détail complet). Je republierai une version à jour ici quand ce sera plus abouti.
