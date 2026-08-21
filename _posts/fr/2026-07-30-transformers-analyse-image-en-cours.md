---
title: "Un papier sur les Transformers pour l'analyse d'image, tout début de rédaction"
date: 2026-08-10
ref: journal-transformers-vision-draft
category: journal
tags: [transformers, deep learning, intelligence artificielle, journal, work in progress]
excerpt: "Mise à jour d'un papier sur le modèle des Transformers appliqué à l'analyse d'image : le mécanisme d'attention, la multi-head attention, l'encodage positionnel et l'architecture complète d'un bloc encodeur sont maintenant rédigés. Reste l'adaptation à l'image (Vision Transformer) et l'excursion vers les grands modèles de langage."
permalink: /fr/journal/transformers-analyse-image-en-cours/
cover: covers/journal-transformers-vision.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/transformers-vision/transformers-analyse-image-draft.pdf' | relative_url }}" class="pdf-download">Télécharge le papier au format PDF</a>
</div>

**Ce texte n'est vraiment qu'à ses débuts.** Je me suis lancé dans un nouveau papier, sur les Transformers cette fois, avec le même objectif que pour mes textes sur les systèmes de réécriture : une présentation rigoureuse, où chaque objet mathématique est introduit par le besoin précis auquel il répond plutôt que posé sans justification.

## Où j'en suis

Pour l'instant je n'ai écrit que les préliminaires. Je pars du problème de la règle inconnue : il existe des tâches (trier une liste, calculer une dérivée symbolique) pour lesquelles on connaît un algorithme prouvé correct, et d'autres (reconnaître un chat sur une image) pour lesquelles personne n'a jamais écrit un tel algorithme, alors même que la tâche n'est pas mal posée. De là je construis le cadre statistique de l'apprentissage : un problème de prédiction $(\mathcal{X}, \mathcal{Y})$, pourquoi on modélise la relation entrée/sortie par une loi jointe $\mathcal{D}$ plutôt que par une fonction, l'espace des hypothèses $\mathcal{H}$, la fonction de perte, et le risque $R(h) = \mathbb{E}_{(X,Y) \sim \mathcal{D}}[\ell(h(X), Y)]$, qui n'est pas calculable puisque $\mathcal{D}$ est inconnue, d'où le risque empirique et le principe ERM.

La seconde moitié couvre l'optimisation : pourquoi minimiser $\hat{R}_S(h)$ passe par un problème d'optimisation en dimension finie sur les paramètres $\theta$, l'existence (ou non) d'un minimiseur, la descente de gradient et sa preuve de décroissance locale par développement de Taylor, pourquoi on utilise la version stochastique (SGD) plutôt que le gradient exact quand $n$ est grand, et enfin la rétropropagation, présentée comme ce qu'elle est réellement : pas un algorithme d'apprentissage à part entière, seulement une organisation efficace du calcul de la règle de la chaîne sur une composition profonde de fonctions.

**Mise à jour du 9 août 2026 :** j'ai ajouté une section entière sur les réseaux de neurones feedforward. Elle part d'une remarque simple mais décisive : une composition de fonctions affines reste affine, donc empiler des couches purement linéaires n'apporte jamais plus de pouvoir expressif qu'une seule couche. C'est cette unique observation qui impose une fonction d'activation non linéaire entre les couches. Je définis ensuite proprement le perceptron multicouche, puis je démontre en entier le théorème d'approximation universelle de Cybenko (1989) : toute fonction sigmoïdale continue permet d'approcher n'importe quelle fonction continue sur $[0,1]^n$ d'aussi près qu'on veut, avec une seule couche cachée de largeur suffisante. La preuve passe par la notion de fonction *discriminante*, un lemme de densité via le théorème de Hahn-Banach et la représentation de Riesz, puis un argument en quatre étapes (passage à la limite le long d'une droite affine, élimination d'un paramètre, unicité d'une mesure via un $\pi$-système, injectivité de la transformée de Fourier) pour montrer que toute sigmoïdale continue est discriminante. J'admets honnêtement les quatre outils d'analyse fonctionnelle externes sur lesquels s'appuie cette preuve plutôt que de les redémontrer, ce qui sortirait complètement du sujet du papier.

**Mise à jour du 10 août 2026 :** grosse avancée cette fois, le cœur du sujet est écrit. J'ai d'abord posé ce qu'il fallait pour y arriver : les plongements (embeddings) qui transforment un objet discret en vecteur, une définition inductive des mots et des phrases, puis les RNN comme première tentative de traiter des séquences de longueur variable en partageant les mêmes poids à chaque pas de temps. J'y démontre pourquoi les RNN ne suffisent pas : le gradient s'atténue ou explose exponentiellement avec la longueur de la séquence (preuve complète dans le cas linéaire, le cas général admis par le même mécanisme), et le calcul y est intrinsèquement séquentiel, donc impossible à paralléliser.

Ce sont précisément ces deux limites que le mécanisme d'attention contourne, et c'est la partie que je viens de terminer. Je pars des projections requête/clé/valeur $Q, K, V$, je définis $\text{Attention}(Q,K,V) = \text{softmax}(QK^\top/\sqrt{d_k})V$, avec un exemple numérique complet sur un mini-vocabulaire jouet, et je démontre pourquoi la mise à l'échelle par $\sqrt{d_k}$ est nécessaire. Le lemme du barycentre montre que la sortie de l'attention est toujours une combinaison convexe des valeurs, ce qui motive directement la multi-head attention. Je prouve ensuite un théorème d'équivariance par permutation : sans information de position, l'attention traite le contexte comme un ensemble, jamais comme une suite, ce qui justifie l'encodage positionnel sinusoïdal (avec la preuve que la position relative correspond toujours à une simple rotation fixe). Le tout se referme sur l'architecture complète d'un bloc encodeur : connexions résiduelles, normalisation, réseau feedforward position-wise.

## Ce qu'il reste à écrire

Reste l'adaptation de tout cela à l'analyse d'image via le Vision Transformer, et une excursion vers les grands modèles de langage annoncée dans le résumé. Le sommaire actuel s'arrête à l'architecture Transformer complète (encodeur), le sujet du titre n'est donc pas encore atteint. Je republierai une version à jour ici au fur et à mesure.
