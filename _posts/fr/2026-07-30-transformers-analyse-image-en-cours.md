---
title: "Un papier sur les Transformers pour l'analyse d'image, tout début de rédaction"
date: 2026-08-09
ref: journal-transformers-vision-draft
category: journal
tags: [transformers, deep learning, intelligence artificielle, journal, work in progress]
excerpt: "Mise à jour d'un papier sur le modèle des Transformers appliqué à l'analyse d'image : cadre statistique de l'apprentissage, descente de gradient, rétropropagation, réseaux feedforward et théorème d'approximation universelle (Cybenko). L'attention et l'architecture Transformer elle-même restent à écrire."
permalink: /fr/journal/transformers-analyse-image-en-cours/
cover: covers/journal-transformers-vision.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/transformers-vision/transformers-analyse-image-draft.pdf' | relative_url }}">📄 Le modèle des Transformers pour l'analyse d'image, version mise à jour (PDF)</a>
</div>

**Ce texte n'est vraiment qu'à ses débuts.** Je me suis lancé dans un nouveau papier, sur les Transformers cette fois, avec le même objectif que pour mes textes sur les systèmes de réécriture : une présentation rigoureuse, où chaque objet mathématique est introduit par le besoin précis auquel il répond plutôt que posé sans justification.

## Où j'en suis

Pour l'instant je n'ai écrit que les préliminaires. Je pars du problème de la règle inconnue : il existe des tâches (trier une liste, calculer une dérivée symbolique) pour lesquelles on connaît un algorithme prouvé correct, et d'autres (reconnaître un chat sur une image) pour lesquelles personne n'a jamais écrit un tel algorithme, alors même que la tâche n'est pas mal posée. De là je construis le cadre statistique de l'apprentissage : un problème de prédiction $(\mathcal{X}, \mathcal{Y})$, pourquoi on modélise la relation entrée/sortie par une loi jointe $\mathcal{D}$ plutôt que par une fonction, l'espace des hypothèses $\mathcal{H}$, la fonction de perte, et le risque $R(h) = \mathbb{E}_{(X,Y) \sim \mathcal{D}}[\ell(h(X), Y)]$, qui n'est pas calculable puisque $\mathcal{D}$ est inconnue, d'où le risque empirique et le principe ERM.

La seconde moitié couvre l'optimisation : pourquoi minimiser $\hat{R}_S(h)$ passe par un problème d'optimisation en dimension finie sur les paramètres $\theta$, l'existence (ou non) d'un minimiseur, la descente de gradient et sa preuve de décroissance locale par développement de Taylor, pourquoi on utilise la version stochastique (SGD) plutôt que le gradient exact quand $n$ est grand, et enfin la rétropropagation, présentée comme ce qu'elle est réellement : pas un algorithme d'apprentissage à part entière, seulement une organisation efficace du calcul de la règle de la chaîne sur une composition profonde de fonctions.

**Mise à jour du 9 août 2026 :** j'ai ajouté une section entière sur les réseaux de neurones feedforward. Elle part d'une remarque simple mais décisive : une composition de fonctions affines reste affine, donc empiler des couches purement linéaires n'apporte jamais plus de pouvoir expressif qu'une seule couche. C'est cette unique observation qui impose une fonction d'activation non linéaire entre les couches. Je définis ensuite proprement le perceptron multicouche, puis je démontre en entier le théorème d'approximation universelle de Cybenko (1989) : toute fonction sigmoïdale continue permet d'approcher n'importe quelle fonction continue sur $[0,1]^n$ d'aussi près qu'on veut, avec une seule couche cachée de largeur suffisante. La preuve passe par la notion de fonction *discriminante*, un lemme de densité via le théorème de Hahn-Banach et la représentation de Riesz, puis un argument en quatre étapes (passage à la limite le long d'une droite affine, élimination d'un paramètre, unicité d'une mesure via un $\pi$-système, injectivité de la transformée de Fourier) pour montrer que toute sigmoïdale continue est discriminante. J'admets honnêtement les quatre outils d'analyse fonctionnelle externes sur lesquels s'appuie cette preuve plutôt que de les redémontrer, ce qui sortirait complètement du sujet du papier.

## Ce qu'il reste à écrire

Le cœur du sujet reste à faire : le mécanisme d'attention, l'encodage positionnel, l'architecture Transformer complète, son adaptation à l'analyse d'image via le Vision Transformer, et une excursion vers les grands modèles de langage. Le sommaire actuel du PDF s'arrête au théorème d'approximation universelle, ce n'est donc encore qu'un chapitre de préliminaires, plus complet mais toujours pas au cœur du sujet annoncé. Je republierai une version à jour ici au fur et à mesure.
