---
title: "Un deuxième papier sur les systèmes de réécriture, encore en chantier"
date: 2026-07-30
ref: journal-trs-completeness-draft
category: recherche-maths
tags: [réécriture de termes, IRIT, confluence, work in progress]
excerpt: "Mise à jour d'un papier plus poussé que le précédent sur les TRS : unification, paires critiques, complétion de Knuth-Bendix, modularité de la confluence, contre-exemple de Toyama, et indécidabilité de la terminaison, avec une rigueur renforcée sur les fondations (choix dépendant, bonne définition des règles). Presque abouti, plusieurs points restent volontairement admis."
permalink: /fr/recherche-maths/deuxieme-papier-trs-en-cours/
cover: covers/recherche-trs-completeness.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/rewrite-systems/trs-completeness-draft.pdf' | relative_url }}" class="pdf-download">Télécharge le papier au format PDF</a>
</div>

**Ce texte n'est pas encore tout à fait terminé.** Après mon étude guidée de l'article de Dershowitz, j'ai commencé un second papier sur les systèmes de réécriture de termes, plus poussé et plus formel. Je le partage tel quel, comme un journal de recherche plutôt qu'un résultat définitivement clos.

**Mise à jour du 28 juillet 2026 :** le papier a beaucoup avancé depuis le premier jet publié ici hier : l'unification, le théorème des paires critiques et la complétion de Knuth-Bendix sont maintenant rédigés en entier, et la preuve de modularité de la confluence est complète.

**Mise à jour du 30 juillet 2026 :** cette nouvelle passe consolide surtout les fondations plutôt que d'ajouter du contenu nouveau. J'ai précisé qu'une règle de réécriture doit vérifier $\mathrm{Var}(r) \subseteq \mathrm{Var}(l)$ pour qu'une étape de réécriture soit bien définie (sinon le résultat dépendrait arbitrairement des variables du membre droit absentes du membre gauche), j'ai explicité où le raisonnement s'appuie sur l'axiome du choix dépendant (DC) pour passer d'un ordre "sans suite infinie décroissante" à un ordre "avec élément minimal", et j'ai repris de zéro la preuve de terminaison de l'algorithme d'unification avec une mesure lexicographique à trois composantes, plus robuste que la précédente. J'ai aussi ajouté un théorème de Dershowitz (l'absence de chevauchement entre règles suffit à la confluence locale, sans aucune hypothèse de terminaison), et une notion de *run équitable* pour la complétion de Knuth-Bendix, avec un contre-exemple explicite montrant qu'une complétion qui réussit sans jamais traiter toutes les paires critiques peut produire un système non confluent.

## Où j'en suis

Le papier repose sur un cadre formel assez complet : signatures, termes, positions et contextes, substitutions, congruences et théories équationnelles, jusqu'à la définition standard d'un système de réécriture de termes et de ses relations dérivées ($\to^\ast, \to^+, \leftrightarrow^\ast$). À partir de là, je redémontre proprement les résultats centraux : le lemme de Newman (terminaison et confluence locale entraînent la confluence), puis l'algorithme d'unification (avec sa preuve de terminaison et de correction, c'est le prérequis technique pour construire les paires critiques), le théorème des paires critiques de Knuth-Bendix qui en découle, et enfin la procédure de complétion de Knuth-Bendix elle-même, qui restaure mécaniquement la confluence d'un système qui ne l'a pas. Tout cela aboutit à la caractérisation de la complétude (terminaison et confluence) qui rend le problème des mots décidable.

## Le morceau qui m'a pris le plus de temps : la modularité

La partie dont je suis le plus content pour l'instant concerne la **modularité** : si on prend deux systèmes de réécriture sur des signatures disjointes (aucun symbole en commun), et que chacun est confluent, est-ce que leur union l'est aussi ? La réponse est oui, et je le démontre, mais la preuve n'est pas immédiate : elle demande de suivre précisément comment un terme se décompose en un "squelette" (dans une des deux signatures) et des "alien" (sous-termes de l'autre signature), et de raisonner par récurrence sur un rang qui mesure l'imbrication de ces aliens, parce que l'union de deux systèmes confluents ne termine pas forcément, donc impossible d'invoquer directement le lemme de Newman.

Ce qui rend cette question intéressante, c'est que la **terminaison**, elle, n'est *pas* modulaire, et je reprends ici le contre-exemple classique de Toyama (1987) : deux systèmes qui terminent chacun séparément,

$$
\mathcal{R}_1 = \{\, f(x,y,x) \to f(x,y,y) \,\}, \qquad
\mathcal{R}_2 = \{\, g(x,y) \to x,\ g(x,y) \to y \,\}
$$

dont l'union boucle indéfiniment via un cycle explicite $t_0 \to t_1 \to t_2 \to t_0$. C'est précisément ce genre de "règles collapsantes" (dont le membre droit est une simple variable) qui empêche la terminaison de se transmettre, et c'est aussi pour ça que ma preuve de modularité de la confluence doit traiter ces règles collapsantes avec un soin particulier.

## Et pour finir (façon clin d'œil au premier papier)

Je termine par une section indépendante du reste : l'encodage d'une machine de Turing en système de réécriture de termes, pour montrer que la terminaison d'un TRS quelconque est indécidable : une version bien plus détaillée et construite explicitement de l'argument que j'esquissais déjà, plus informellement, dans mon premier papier sur Dershowitz.

## Ce qu'il reste à faire

Le papier est maintenant presque complet, mais plusieurs points restent admis volontairement plutôt que démontrés en entier : dans le contre-exemple de Toyama, je prouve que $\mathcal{R}_2$ termine, mais j'admets la terminaison de $\mathcal{R}_1$ sans le détail complet de l'argument (Toyama 1987), et je m'appuie de la même façon sur le résultat de Toyama-Klop-Barendregt pour la terminaison de l'union de deux TRS convergents et linéaires à gauche. En creusant la section sur les systèmes orthogonaux et la section sur l'indécidabilité, j'ai aussi identifié deux autres points techniques que je cite plutôt que je ne redémontre : la généralisation du lemme du "strip" à des chaînes de réductions arbitraires dans le théorème de Rosen, et surtout un raffinement de Huet et Lankford (1978) nécessaire pour que la réduction machine de Turing → TRS porte bien sur "est-ce que $M$ s'arrête sur $\langle M \rangle$" et non sur la question plus large et non pertinente de la terminaison depuis *toute* configuration. J'ai préféré l'honnêteté plutôt que l'apparence d'exhaustivité, plutôt que de comprimer des preuves techniques de plusieurs pages. Je republierai une version à jour ici si je finis par combler ces points.
