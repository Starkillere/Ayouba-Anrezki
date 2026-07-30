---
title: "Un papier sur les Transformers pour l'analyse d'image, tout début de rédaction"
date: 2026-07-30
ref: journal-transformers-vision-draft
category: journal
tags: [transformers, deep learning, intelligence artificielle, journal, work in progress]
excerpt: "Premier jet d'un papier sur le modèle des Transformers appliqué à l'analyse d'image : cadre statistique de l'apprentissage, principe ERM, descente de gradient, rétropropagation. L'attention et l'architecture Transformer elle-même restent à écrire."
permalink: /fr/journal/transformers-analyse-image-en-cours/
cover: covers/journal-transformers-vision.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/transformers-vision/transformers-analyse-image-draft.pdf' | relative_url }}">📄 Le modèle des Transformers pour l'analyse d'image, tout premier jet (PDF)</a>
</div>

**Ce texte n'est vraiment qu'à ses débuts.** Je me suis lancé dans un nouveau papier, sur les Transformers cette fois, avec le même objectif que pour mes textes sur les systèmes de réécriture : une présentation rigoureuse, où chaque objet mathématique est introduit par le besoin précis auquel il répond plutôt que posé sans justification.

## Où j'en suis

Pour l'instant je n'ai écrit que les préliminaires. Je pars du problème de la règle inconnue : il existe des tâches (trier une liste, calculer une dérivée symbolique) pour lesquelles on connaît un algorithme prouvé correct, et d'autres (reconnaître un chat sur une image) pour lesquelles personne n'a jamais écrit un tel algorithme, alors même que la tâche n'est pas mal posée. De là je construis le cadre statistique de l'apprentissage : un problème de prédiction $(\mathcal{X}, \mathcal{Y})$, pourquoi on modélise la relation entrée/sortie par une loi jointe $\mathcal{D}$ plutôt que par une fonction, l'espace des hypothèses $\mathcal{H}$, la fonction de perte, et le risque $R(h) = \mathbb{E}_{(X,Y) \sim \mathcal{D}}[\ell(h(X), Y)]$, qui n'est pas calculable puisque $\mathcal{D}$ est inconnue, d'où le risque empirique et le principe ERM.

La seconde moitié couvre l'optimisation : pourquoi minimiser $\hat{R}_S(h)$ passe par un problème d'optimisation en dimension finie sur les paramètres $\theta$, l'existence (ou non) d'un minimiseur, la descente de gradient et sa preuve de décroissance locale par développement de Taylor, pourquoi on utilise la version stochastique (SGD) plutôt que le gradient exact quand $n$ est grand, et enfin la rétropropagation, présentée comme ce qu'elle est réellement : pas un algorithme d'apprentissage à part entière, seulement une organisation efficace du calcul de la règle de la chaîne sur une composition profonde de fonctions.

## Ce qu'il reste à écrire

Tout le cœur du sujet reste à faire : le mécanisme d'attention, l'encodage positionnel, l'architecture Transformer complète, son adaptation à l'analyse d'image via le Vision Transformer, et une excursion vers les grands modèles de langage. Le sommaire actuel du PDF s'arrête à la rétropropagation, ce n'est donc pour l'instant qu'un chapitre de préliminaires. Je republierai une version à jour ici au fur et à mesure.
