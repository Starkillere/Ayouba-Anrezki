---
title: "Un nouveau papier avec Saber Hamdaoui : existe-t-il une forme explicite pour le n-ième nombre premier ?"
date: 2026-08-21
ref: journal-nombres-premiers-explicites-draft
category: journal
tags: [nombres premiers, théorie des nombres, arithmétique, journal, work in progress]
excerpt: "Premières pages d'un papier écrit avec Saber Hamdaoui sur l'existence d'une forme explicite pour le n-ième nombre premier. On y distingue trois notions indépendantes de « forme explicite », on démontre que p_n n'est pas une fonction rationnelle de n, et on ouvre une question intermédiaire encore non résolue, autour de la formule de Willans."
permalink: /fr/journal/formes-explicites-nombre-premier-en-cours/
cover: covers/journal-nombres-premiers-explicites.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/formes-explicites-nombre-premier/formes-explicites-nombre-premier-draft.pdf' | relative_url }}" class="pdf-download">Télécharge le papier au format PDF</a>
</div>

**Encore un texte à ses débuts, cette fois écrit à deux.** Avec Saber Hamdaoui, on s'est lancés dans un papier sur une question qui semble presque naïve au premier abord : pour les nombres pairs, la suite $a_n = 2n$ donne accès directement au $n$-ième terme, sans passer par $a_1, \ldots, a_{n-1}$. Existe-t-il une construction analogue pour les nombres premiers ?

## Ce que la question cache

La question, telle quelle, n'est pas encore mathématiquement précise. On commence par écarter un malentendu possible : $p_n$ est parfaitement calculable, et même primitive récursive, donc il ne s'agit à aucun moment d'une question de calculabilité au sens de la théorie de la récursivité. La vraie question porte sur l'appartenance de $p_n$ à des classes de fonctions ou d'expressions strictement plus restreintes que l'ensemble des fonctions calculables.

On distingue trois formalisations indépendantes de « forme explicite » : les expressions closes élémentaires (compositions finies d'opérations arithmétiques et de fonctions usuelles), la définissabilité dans l'arithmétique bornée au sens des formules $\Delta_0$, et le calcul en temps polynomial en la taille binaire de $n$. Le papier ne tranche pour l'instant que le premier axe.

## Ce qui est déjà établi

Après avoir posé les définitions de base (nombre premier, classe de fonctions, fonction calculable au sens de Turing), on démontre proprement que $n \mapsto p_n$ est calculable, en exhibant l'algorithme naïf de recherche et en prouvant sa terminaison et sa correction par un invariant de boucle ($c = \pi(k)$ à chaque étape).

Le résultat central de cette première partie est le théorème de non-arithméticité : il n'existe aucune fonction rationnelle $f \in \mathbb{Q}(X)$ telle que $f(n) = p_n$ pour tout $n \geq 1$. La preuve part du comportement asymptotique $p_n \sim n \ln(n)$ (théorème des nombres premiers, admis ici) et d'une analyse de croissance comparée sur le degré de $f$, qui aboutit à une contradiction dans les deux cas possibles.

## Ce qui reste ouvert, et où le texte s'arrête

Ce théorème règle le cas des fonctions rationnelles, mais laisse entière la question pour la classe plus large des fonctions élémentaires (au sens de Liouville et Ritt) : rien n'exclut a priori qu'une fonction faisant intervenir $\exp$, $\ln$ ou des fonctions trigonométriques échappe à l'argument de croissance polynomiale utilisé.

C'est là qu'intervient la formule de Willans (1964), qui donne une expression finie de $p_n$ combinant la partie entière et la fonction $\cos$ via le théorème de Wilson. Le problème est qu'elle mélange deux relaxations à la fois par rapport au cas arithmétique : l'ajout de la partie entière d'une part, l'ajout des fonctions transcendantes d'autre part, sans indiquer laquelle porte réellement le résultat. On introduit donc une classe intermédiaire, qui autorise la partie entière seule sans aucune fonction transcendante, et on énonce la proposition selon laquelle $p_n$ n'est pas non plus calculable dans cette classe.

C'est précisément là que le texte s'interrompt : la démonstration de cette dernière proposition n'est encore qu'une esquisse, une tentative d'induction sur le comportement asymptotique des fonctions de cette classe que Saber a commencé à rédiger et qui reste pour l'instant incomplète. On la termine avant la prochaine mise à jour.
