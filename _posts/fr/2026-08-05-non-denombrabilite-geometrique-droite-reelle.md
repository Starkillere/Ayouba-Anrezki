---
title: "Une démonstration géométrique de la non-dénombrabilité de la droite réelle"
date: 2026-08-05
ref: recherche-non-denombrabilite-geometrique
category: recherche-maths
tags: [théorie des ensembles, géométrie, dénombrabilité, axiomes de Hilbert, mathématiques]
excerpt: "Redémontrer que R n'est pas dénombrable sans argument diagonal ni écriture décimale : une preuve purement géométrique, fondée sur l'axiome des segments emboîtés de Cantor et la trisection d'un segment par le théorème de Thalès."
permalink: /fr/recherche-maths/non-denombrabilite-geometrique-droite-reelle/
cover: covers/recherche-non-denombrabilite-geometrique.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/non-denombrabilite-geometrique/non-denombrabilite-geometrique.pdf' | relative_url }}" class="pdf-download">Télécharge le papier au format PDF</a>
</div>

L'argument diagonal de Cantor, la preuve classique que $\mathbb{R}$ n'est pas dénombrable, s'appuie sur l'écriture décimale des réels : on construit un réel qui échappe à toute énumération en modifiant, chiffre par chiffre, les termes d'une liste supposée exhaustive. C'est un argument d'une remarquable économie, mais il fait intervenir un objet essentiellement arithmétique, le développement décimal, qui n'appartient pas à proprement parler à la géométrie de la droite. Ce papier montre que le résultat s'obtient aussi par une voie entièrement géométrique, sans jamais quitter le registre des points, des segments et de leur inclusion.

## Le cadre : une droite au sens de Hilbert

Je me place dans le cadre axiomatique classique d'une droite ordonnée (axiomes d'incidence et d'ordre de Hilbert), munie d'un unique axiome supplémentaire : l'**axiome de continuité de Cantor**, qui affirme que toute suite décroissante de segments fermés non vides $I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots$ possède un point commun. Contrairement au théorème des segments emboîtés qu'on utilise en analyse, cet axiome n'exige aucune hypothèse sur la longueur des segments : seule l'inclusion compte, aucune notion métrique n'intervient. Une **bijection géométrique** entre $\mathbb{N}$ et une droite $D$ est alors définie de façon purement ensembliste (injective et surjective), sans coordonnées ni mesure ; dire que $D$ est dénombrable signifie exactement qu'une telle bijection existe.

## Le second outil : trisecter un segment à la règle

Le second ingrédient est la construction classique, connue depuis Euclide, de division d'un segment en trois parties par le théorème de Thalès. Pour tout segment non dégénéré $[A, B]$, elle produit deux points $C, D_0$ tels que $[A, B] = [A, C] \cup [C, D_0] \cup [D_0, B]$, les trois tiers ne se rencontrant qu'en leurs extrémités communes. Le fait qui porte toute la preuve est un principe des tiroirs élémentaire : puisque les tiers extrêmes sont d'intersection vide, un point ne peut appartenir aux trois à la fois, donc il en évite nécessairement au moins un. Aucune propriété numérique des trois tiers, ni égalité de longueur, ni rapport $1/3$, n'est utilisée dans cet argument : seule leur disposition consécutive sur la droite compte.

## Le théorème principal

Supposons par l'absurde qu'une droite $D$ admette une bijection géométrique $\varphi : \mathbb{N} \to D$, et notons $P_n := \varphi(n)$. On construit alors une suite de segments emboîtés $I_0 \supseteq I_1 \supseteq \cdots$ : à chaque étape, $I_{n+1}$ est l'un des trois tiers de $I_n$ obtenu par trisection, choisi de façon à ne pas contenir $P_n$, ce qui est toujours possible d'après le principe des tiroirs ci-dessus. L'axiome de continuité garantit l'existence d'un point $Q \in \bigcap_n I_n$. Par construction $Q \neq P_n$ pour tout $n$, donc $Q$ n'est égal à aucun terme de la liste $(P_n)_{n \in \mathbb{N}}$ ; mais $Q$ est un point de $D$, donc par surjectivité de $\varphi$ il devrait figurer dans cette liste. Contradiction : aucune droite ne peut être énumérée. En identifiant la droite géométrique complète à $\mathbb{R}$ via l'abscisse dans un repère $(O, U)$ (l'axiome de continuité de Cantor-Dedekind), on en déduit que $\mathbb{R}$ n'est pas dénombrable.

## En quel sens cette preuve est-elle purement géométrique

Ce qui me plaît dans cette approche, c'est qu'elle isole précisément où intervient la complétude de $\mathbb{R}$, sans la déguiser en argument numérique. Contrairement à l'argument diagonal, aucun point n'est jamais représenté par une suite de chiffres : la distinction entre $Q$ et chaque $P_n$ vient de l'exclusion d'une région géométrique, pas de la modification d'un chiffre. Contrairement aux démonstrations usuelles par segments emboîtés en analyse, l'axiome de continuité ici ne suppose pas que la longueur des segments tend vers 0 : c'est un fait brut sur l'inclusion. Et le cœur logique de la preuve n'est finalement qu'un principe des tiroirs à trois régions, où la trisection de Thalès ne sert qu'à *construire* trois segments consécutifs, jamais à *calculer* quoi que ce soit sur eux.
